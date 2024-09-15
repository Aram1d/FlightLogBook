import gql from "graphql-tag";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { hash, compare } from "bcrypt";
import { Pilots } from "../db/db.js";
import { live } from "../gqlLive.js";
import { Resolvers } from "../gqlTypes.js";
import {
  authMsg,
  castNonNullable,
  emailRegex,
  omitNil,
  signIn
} from "../serverHelpers.js";
import { castId } from "../db/helpers.js";

export const typeDefs = gql`
  type Email @entity {
    address: String! @column
    verified: Boolean! @column
  }

  type Credential
    @entity(additionalFields: [{ path: "token", type: "string" }]) {
    id: ID! @id
    ipv4: String! @column
    userAgent: String! @column
    lastUsed: String! @column(overrideType: "Date")
    isThisConnection: Boolean!
  }

  type Password
    @entity(additionalFields: [{ path: "bcrypt", type: "string" }]) {
    createdAt: String! @column(overrideType: "Date")
  }

  type Pilot @entity {
    id: ID! @id
    username: String! @column
    firstName: String! @column
    lastName: String! @column
    credentials: [Credential!]! @embedded
    passwords: [Password!]! @embedded
    email: Email! @embedded
  }

  input AddPilotInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  input UpdatePilotInput {
    username: String
    firstName: String
    lastName: String
    email: String
  }

  type PilotsPage {
    total: Int!
    items: [Pilot!]!
  }

  type Query {
    currentPilot: Pilot
    pilot(id: ID!): Pilot!
    pilots(pager: PagerInput): PilotsPage!
  }

  type Mutation {
    signUp(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      pwdHash: String!
      pwdHash2: String!
    ): String!

    signIn(login: String!, pwdHash: String!): String!
    signOut: Boolean!

    addPilot(pilot: AddPilotInput!): Pilot!
    updatePilot(id: ID!, pilot: UpdatePilotInput!): Pilot!
  }
`;

export const resolvers: Resolvers = {
  Pilot: {
    id: ({ _id }) => _id.toHexString()
  },

  Query: {
    currentPilot: (parent, args, { requester }) =>
      requester?._id ? Pilots.findById(requester?._id) : null,
    pilot: (parent, { id }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      return Pilots.findById(id).then(pilot => {
        if (!pilot) throw new UserInputError("Pilote introuvable");
        return pilot;
      });
    },

    pilots: async (parent, { pager }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      return Pilots.findList({}, pager);
    }
  },
  Mutation: {
    addPilot: async (parent, { pilot }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      const { email, ...restPilot } = pilot;
      const newPilot = await Pilots.create({
        ...restPilot,
        email: { address: email, verified: false },
        credentials: [],
        passwords: []
      });

      live.invalidate([`Pilot:${newPilot._id.toHexString()}`, `Query.pilots`]);
      return newPilot;
    },

    updatePilot: async (parent, { id, pilot }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      const { email, ...restPilot } = pilot;

      const shouldUpdateEmail =
        email === (await Pilots.findById(id))?.email.address;

      const updated = await Pilots.findOneAndUpdate(
        { _id: castId(id) },
        {
          $set: omitNil({
            ...restPilot,
            ...(shouldUpdateEmail && {
              email: { address: email, verified: false }
            })
          })
        }
      );
      if (!updated.value) throw new UserInputError("Pilot not found");
      live.invalidate([`Pilot:${id}`]);
      return updated.value;
    },

    signUp: async (parent, args, { requester, clientInfo }) => {
      if (requester) throw new AuthenticationError(authMsg.guestReq);

      const { username, firstName, lastName, email, pwdHash, pwdHash2 } = args;

      if (pwdHash !== pwdHash2)
        throw new UserInputError("Les mots de passe ne correspondent pas");

      const _id = new ObjectId();
      const token = jwt.sign(
        { user: _id.toHexString() },
        process.env.TOKEN_SECRET
      );
      const { ipv4, userAgent } = clientInfo;

      const pilot = await Pilots.insertOne({
        _id,
        username: username,
        firstName,
        lastName,
        email: { address: email, verified: false },
        credentials: [
          { _id: new ObjectId(), token, ipv4, userAgent, lastUsed: new Date() }
        ],
        passwords: [{ bcrypt: await hash(pwdHash, 10), createdAt: new Date() }]
      });

      if (!pilot)
        throw new UserInputError("Erreur lors de la création du compte");
      return token;
    },
    signIn: async (parent, { login, pwdHash }, { requester, clientInfo }) => {
      if (requester) throw new AuthenticationError(authMsg.guestReq);

      const userQuerySelector = emailRegex.test(login)
        ? { primaryEmail: login }
        : { username: login.toLowerCase() };

      return Pilots.findOne(userQuerySelector).then(async pilot => {
        if (!pilot)
          throw new UserInputError("Utilisateur ou mot de passe invalide");

        if (!pilot.passwords[0]?.bcrypt)
          throw new UserInputError(
            "Aucun mot de passe défini pour cet Utilisateur"
          );

        const valid = await compare(pwdHash, pilot.passwords[0].bcrypt);
        if (!valid)
          throw new UserInputError("Utilisateur ou mot de passe invalide");

        return await signIn(pilot, clientInfo);
      });
    },

    signOut: async (parent, args, { requester, token, clientInfo }) => {
      if (!requester || !token) throw new AuthenticationError(authMsg.userReq);

      return Pilots.findOneAndUpdate(
        { _id: requester._id },
        { $pull: { credentials: { token: token } } }
      ).then(user => {
        live.invalidate(`Query.currentUser(uuid:${clientInfo.clientUUID})`);
        return !!user;
      });
    }
  }
};
