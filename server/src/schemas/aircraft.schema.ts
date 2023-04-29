import gql from "graphql-tag";
import { Resolvers } from "../gqlTypes";
import { Aircrafts } from "../db/db";

export const typeDefs = gql`
  type Aircraft @entity {
    id: ID! @id
    brand: String! @column
    model: String! @column
    isMultiEngine: Boolean! @column
    isIFR: Boolean! @column
  }

  type Query {
    aircraft(id: ID!): Aircraft!
    aircrafts: [Aircraft!]!
  }
`;

export const resolvers: Resolvers = {
  Aircraft: {
    id: (parent) => parent._id.toHexString(),
  },
  Query: {
    aircraft: async (parent, { id }, ctx) => {
      return Aircrafts.findById(id);
    },

    aircrafts: async (parent, args, ctx) => {
      return Aircrafts.findAll({});
    },
  },
};
