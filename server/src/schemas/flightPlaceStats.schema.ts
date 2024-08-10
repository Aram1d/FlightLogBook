import gql from "graphql-tag";
import { PlaceTupleStat, Resolvers } from "../gqlTypes.js";
import { Flights } from "../db/db.js";
import { mkOwnFlightMatchStage } from "./utils/statsUtils.js";

export const typeDefs = gql`
  type PlaceTupleStat {
    departure: String!
    arrival: String!
    times: Int!
  }

  extend type Query {
    flightPlaceStats: [PlaceTupleStat!]!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    flightPlaceStats: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<PlaceTupleStat>([
        mkOwnFlightMatchStage(requester),
        {
          $group: {
            _id: { $concat: ["$departure.place", "__", "$arrival.place"] },
            departure: { $first: "$departure.place" },
            arrival: { $first: "$arrival.place" },
            times: { $count: {} },
          },
        },
      ]).toArray();
    },
  },
};
