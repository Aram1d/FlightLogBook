import gql from "graphql-tag";
import { Aircrafts } from "../db/db.js";
import { live } from "../gqlLive.js";
import { Resolvers } from "../gqlTypes";
import { castId } from "../db/helpers.js";
import {
  authenticationError,
  authMsg,
  omitNil,
  userInputError
} from "../serverHelpers.js";

export const typeDefs = gql`
  enum AircraftCapabilities {
    isIFR
    isMultiEngine
  }

  type Aircraft @entity {
    id: ID! @id
    brand: String! @column
    model: String! @column
    registration: String! @column
    capabilities: [AircraftCapabilities!]! @column
  }

  type AircraftsPage {
    total: Int!
    items: [Aircraft!]!
  }

  input AddAircraftInput {
    brand: String!
    model: String!
    registration: String!
    capabilities: [AircraftCapabilities!]!
  }

  input UpdateAircraftInput {
    brand: String
    model: String
    registration: String
    capabilities: [AircraftCapabilities!]
  }

  extend type Query {
    aircraft(id: ID!): Aircraft!
    aircrafts(pager: PagerInput): AircraftsPage!
  }

  extend type Mutation {
    addAircraft(aircraft: AddAircraftInput!): Aircraft!
    updateAircraft(id: ID!, aircraft: UpdateAircraftInput!): Aircraft!
  }
`;

export const resolvers: Resolvers = {
  Aircraft: {
    id: parent =>
      parent.registration
        ? parent._id.toHexString()
        : `${parent.brand}__${parent.model}`
  },
  Query: {
    aircraft: async (_, { id }) => {
      const aircraft = await Aircrafts.findById(id);
      if (!aircraft) throw new Error("Aircraft not found");
      return aircraft;
    },

    aircrafts: async (_, { pager }) => {
      return Aircrafts.findList({}, pager);
    }
  },

  Mutation: {
    addAircraft: async (_, { aircraft }, { requester }) => {
      if (!requester) throw authenticationError(authMsg.userReq);
      const acft = await Aircrafts.create(aircraft);
      live.invalidate(["Query.aircrafts"]);
      return acft;
    },
    updateAircraft: async (_, { id, aircraft }, { requester }) => {
      if (!requester) throw authenticationError(authMsg.userReq);

      const updatedAircraft = await Aircrafts.findOneAndUpdate(
        { _id: castId(id) },
        { $set: omitNil(aircraft) }
      );
      if (!updatedAircraft) throw userInputError(`Wrong aircraft id: ${id}`);
      live.invalidate([`Aircraft:${id}`]);
      return updatedAircraft;
    }
  }
};
