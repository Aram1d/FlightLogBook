import gql from "graphql-tag";
import {
  AircraftDb,
  ByAircraftModelStatsDb,
  ByAircraftStatsDb,
  ByInstructorStatsDb,
  FlightStats,
  FlightStatsDb,
  Resolvers,
} from "../gqlTypes.js";
import { Aircrafts, Flights } from "../db/db.js";
import dayjs from "dayjs";
import {
  formatFlightStats,
  mkFltStatsGroupStage,
  mkOwnFlightMatchStage,
} from "./utils/statsUtils.js";
import { compact } from "lodash-es";

export const typeDefs = gql`
  interface BaseFlightStats {
    id: ID! @id
    totalDC: Int! @column
    totalPIC: Int! @column
    totalCOPI: Int! @column
    totalInstructor: Int! @column
    totalFlightTime: Int! @column
    flightAmount: Int! @column
  }

  type ByAircraftStats implements BaseFlightStats @entity {
    id: ID! @id
    aircraft: Aircraft! @embedded
    totalDC: Int! @column
    totalPIC: Int! @column
    totalCOPI: Int! @column
    totalInstructor: Int! @column
    totalFlightTime: Int! @column
    flightAmount: Int! @column

    byAircraftModel: [ByAircraftModelStats!]!
    byInstructor: [ByInstructorStats!]!
  }

  type ByAircraftModelStats implements BaseFlightStats
    @entity(additionalFields: [{ path: "_id", type: "string" }]) {
    id: ID!
    aircraftModel: String! @column
    totalDC: Int! @column
    totalPIC: Int! @column
    totalCOPI: Int! @column
    totalInstructor: Int! @column
    totalFlightTime: Int! @column
    flightAmount: Int! @column

    byAircraft: [ByAircraftStats!]!
    byInstructor: [ByInstructorStats!]!
  }

  type ByInstructorStats implements BaseFlightStats @entity {
    id: ID! @id
    instructor: Pilot! @embedded
    totalDC: Int! @column
    totalPIC: Int! @column
    totalCOPI: Int! @column
    totalInstructor: Int! @column
    totalFlightTime: Int! @column
    flightAmount: Int! @column

    byAircraft: [ByAircraftStats!]!
    byAircraftModel: [ByAircraftModelStats!]!
  }

  type FlightStats implements BaseFlightStats @entity {
    id: ID! @column
    totalDC: Int! @column
    totalPIC: Int! @column
    totalCOPI: Int! @column
    totalInstructor: Int! @column
    totalFlightTime: Int! @column
    flightAmount: Int! @column

    byAircraft: [ByAircraftStats!]!
    byAircraftModel: [ByAircraftModelStats!]!
    byInstructor: [ByInstructorStats!]!
  }

  input ByAcftStatsInput {
    mergeByModel: Boolean
  }

  extend type Query {
    flightStats: FlightStats!
    last3MonthsFlightStats: FlightStats!
  }
`;

export const resolvers: Resolvers = {
  ByInstructorStats: {
    id: (parent) => parent._id.toHexString(),

    byAircraft: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return (
        await Flights.aggregate<ByAircraftStatsDb>(
          compact([
            mkOwnFlightMatchStage(requester, {
              pic: parent.instructor._id,
            }),
            mkFltStatsGroupStage("$aircraft"),
            {
              $lookup: {
                from: "Aircrafts",
                localField: "_id",
                foreignField: "_id",
                as: "aircraft",
              },
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" },
              },
            },
            {
              $sort: {
                totalFlightTime: -1,
              },
            },
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest,
        };
      });
    },

    byAircraftModel: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByAircraftModelStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            instructor: parent.instructor._id,
          }),
          mkFltStatsGroupStage("$aircraft"),
          {
            $lookup: {
              from: "Aircrafts",
              localField: "_id",
              foreignField: "_id",
              as: "aircraft",
            },
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" },
            },
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"],
                },
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },
  },

  ByAircraftStats: {
    id: (parent) => parent._id.toHexString(),
    byAircraftModel: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      const filteredAcfts = (
        await Aircrafts.aggregate<AircraftDb>([
          {
            $addFields: {
              aircraftModel: { $concat: ["$brand", "__", "$model"] },
            },
          },
          {
            $match: {
              aircraftModel: `${parent.aircraft.brand}__${parent.aircraft.model}`,
            },
          },
        ]).toArray()
      ).map((acft) => acft._id);

      return await Flights.aggregate<ByAircraftModelStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester),
          {
            $match: {
              aircraft: { $in: filteredAcfts },
            },
          },
          mkFltStatsGroupStage("$aircraft"),
          {
            $lookup: {
              from: "Aircrafts",
              localField: "_id",
              foreignField: "_id",
              as: "aircraft",
            },
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" },
            },
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"],
                },
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },
    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            aircraft: parent.aircraft._id,
            $expr: { $not: { $eq: ["$pic", "$pilot"] } },
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor",
            },
          },
          {
            $set: {
              instructor: { $first: "$instructor" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },
  },

  ByAircraftModelStats: {
    id: (parent) => parent._id,
    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      const filteredAcfts = (
        await Aircrafts.aggregate<AircraftDb>([
          {
            $addFields: {
              aircraftModel: { $concat: ["$brand", "__", "$model"] },
            },
          },
          {
            $match: { aircraftModel: parent._id },
          },
        ]).toArray()
      ).map((acft) => acft._id);

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            aircraft: { $in: filteredAcfts },
            $expr: { $not: { $eq: ["$pic", "$pilot"] } },
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor",
            },
          },
          {
            $set: {
              instructor: { $first: "$instructor" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },
    byAircraft: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return (
        await Flights.aggregate<ByAircraftStatsDb>(
          compact([
            mkOwnFlightMatchStage(requester),
            mkFltStatsGroupStage("$aircraft"),
            {
              $lookup: {
                from: "Aircrafts",
                localField: "_id",
                foreignField: "_id",
                as: "aircraft",
              },
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" },
              },
            },
            {
              $sort: {
                totalFlightTime: -1,
              },
            },
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest,
        };
      });
    },
  },

  FlightStats: {
    byAircraft: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return (
        await Flights.aggregate<ByAircraftStatsDb>(
          compact([
            mkOwnFlightMatchStage(requester),
            mkFltStatsGroupStage("$aircraft"),
            {
              $lookup: {
                from: "Aircrafts",
                localField: "_id",
                foreignField: "_id",
                as: "aircraft",
              },
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" },
              },
            },
            {
              $sort: {
                totalFlightTime: -1,
              },
            },
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest,
        };
      });
    },

    byAircraftModel: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByAircraftModelStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester),
          mkFltStatsGroupStage("$aircraft"),
          {
            $lookup: {
              from: "Aircrafts",
              localField: "_id",
              foreignField: "_id",
              as: "aircraft",
            },
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" },
            },
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"],
                },
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },

    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            $expr: { $not: { $eq: ["$pic", "$pilot"] } },
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor",
            },
          },
          {
            $set: {
              instructor: { $first: "$instructor" },
            },
          },
          {
            $sort: {
              totalFlightTime: -1,
            },
          },
        ])
      ).toArray();
    },
  },

  Query: {
    flightStats: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return formatFlightStats(
        Flights.aggregate<FlightStatsDb>([
          mkOwnFlightMatchStage(requester),
          mkFltStatsGroupStage(),
        ]),
        `${requester._id.toHexString()}-total`
      );
    },
    last3MonthsFlightStats: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");
      return formatFlightStats(
        Flights.aggregate<Omit<FlightStats, "id">>([
          mkOwnFlightMatchStage(requester, {
            "departure.date": {
              $gte: dayjs().subtract(3, "month").toDate(),
            },
          }),
          mkFltStatsGroupStage(),
        ]),
        `${requester._id.toHexString()}-3months`
      );
    },
  },
};
