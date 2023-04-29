import gql from "graphql-tag";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { hash, compare } from "bcrypt";
import { Pilots } from "../db/db.js";
import { live } from "../gqlLive.js";
import { Resolvers } from "../gqlTypes.js";
import { authMsg, emailRegex, signIn } from "../gqlHelpers.js";

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

  type Query {
    me: Pilot
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
  }
`;

export const resolvers: Resolvers = {
  Query: {
    me: () => Pilots.findAll({}).then((r) => r[0]),
  },
  Mutation: {
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
          { _id: new ObjectId(), token, ipv4, userAgent, lastUsed: new Date() },
        ],
        passwords: [{ bcrypt: await hash(pwdHash, 10), createdAt: new Date() }],
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

      return Pilots.findOne(userQuerySelector).then(async (pilot) => {
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
      ).then((user) => {
        live.invalidate(`Query.currentUser(uuid:${clientInfo.clientUUID})`);
        return !!user;
      });
    },
  },
};
