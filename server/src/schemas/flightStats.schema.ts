import gql from "graphql-tag";
import { FlightStats, Resolvers } from "../gqlTypes.js";
import { Flights } from "../db/db.js";

export const typeDefs = gql`
  type FlightStats {
    totalDC: Int!
    totalPIC: Int!
    totalCOPI: Int!
    totalInstructor: Int!
    totalFlightTime: Int!
    flightAmount: Int!
  }

  extend type Query {
    flightStats: FlightStats!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    flightStats: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");
      const stats = await Flights.aggregate<FlightStats>()
        .match({ $or: [{ pilot: requester._id }, { pic: requester._id }] })
        .group({
          _id: null,
          totalDC: { $sum: "$pilotFunctionTime.dualCommand" },
          totalPIC: { $sum: "$pilotFunctionTime.pic" },
          totalCOPI: { $sum: "$pilotFunctionTime.coPilot" },
          totalInstructor: { $sum: "$pilotFunctionTime.instructor" },
          totalFlightTime: { $sum: "$totalFlightTime" },
          flightAmount: { $count: {} },
        })
        .toArray();
      return stats[0];
    },
  },
};
