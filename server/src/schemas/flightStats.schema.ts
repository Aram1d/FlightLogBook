import gql from "graphql-tag";
import {
  ByAircraftModelStatsDb,
  ByAircraftStatsDb,
  ByInstructorStatsDb,
  FlightStatsDb,
  Resolvers
} from "../gqlTypes.js";
import { Flights } from "../db/db.js";
import {
  formatFlightStats,
  mkFltStatsGroupStage,
  mkOwnFlightMatchStage
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

  type ByAircraftStats implements BaseFlightStats
    @entity(additionalFields: [{ path: "flightsIds", type: "ObjectId[]" }]) {
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
    @entity(
      additionalFields: [
        { path: "_id", type: "string" }
        { path: "flightsIds", type: "ObjectId[]" }
      ]
    ) {
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

  type ByInstructorStats implements BaseFlightStats
    @entity(additionalFields: [{ path: "flightsIds", type: "ObjectId[]" }]) {
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

  type FlightStats implements BaseFlightStats
    @entity(additionalFields: [{ path: "flightsIds", type: "ObjectId[]" }]) {
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
    fromDateFlightStats(date: Date): FlightStats!
  }
`;

export const resolvers: Resolvers = {
  ByInstructorStats: {
    id: parent => parent._id.toHexString(),

    byAircraft: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return (
        await Flights.aggregate<ByAircraftStatsDb>(
          compact([
            mkOwnFlightMatchStage(requester, {
              _id: { $in: parent.flightsIds }
            }),
            mkFltStatsGroupStage("$aircraft"),
            {
              $lookup: {
                from: "Aircrafts",
                localField: "_id",
                foreignField: "_id",
                as: "aircraft"
              }
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" }
              }
            },
            {
              $sort: {
                totalFlightTime: -1
              }
            }
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest
        };
      });
    },

    byAircraftModel: async (parent, __, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByAircraftModelStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            pic: parent.instructor._id
          }),
          mkFltStatsGroupStage("$aircraft"),
          {
            $lookup: {
              from: "Aircrafts",
              localField: "_id",
              foreignField: "_id",
              as: "aircraft"
            }
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" }
            }
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"]
                }
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" },
              flightsIds: { $push: "$flightsIds" }
            }
          },
          {
            $addFields: {
              _id: { $concat: ["$_id", parent._id.toHexString()] },
              flightsIds: {
                $reduce: {
                  input: "$flightsIds",
                  initialValue: [],
                  in: { $concatArrays: ["$$value", "$$this"] }
                }
              }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    }
  },

  ByAircraftStats: {
    id: parent => parent._id.toHexString(),
    byAircraftModel: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByAircraftModelStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            _id: { $in: parent.flightsIds }
          }),
          mkFltStatsGroupStage("$aircraft"),
          {
            $lookup: {
              from: "Aircrafts",
              localField: "_id",
              foreignField: "_id",
              as: "aircraft"
            }
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" }
            }
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"]
                }
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" },
              flightsIds: { $push: "$flightsIds" }
            }
          },
          {
            $addFields: {
              _id: { $concat: ["$_id", parent._id.toHexString()] },
              flightsIds: {
                $reduce: {
                  input: "$flightsIds",
                  initialValue: [],
                  in: { $concatArrays: ["$$value", "$$this"] }
                }
              }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    },
    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            _ids: { $in: parent.flightsIds },
            $expr: { $not: { $eq: ["$pic", "$pilot"] } }
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor"
            }
          },
          {
            $set: {
              instructor: { $first: "$instructor" }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    }
  },

  ByAircraftModelStats: {
    id: parent => parent._id,
    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            _id: { $in: parent.flightsIds },
            $expr: { $not: { $eq: ["$pic", "$pilot"] } }
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor"
            }
          },
          {
            $set: {
              instructor: { $first: "$instructor" }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    },
    byAircraft: async (parent, __, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return (
        await Flights.aggregate<ByAircraftStatsDb>(
          compact([
            mkOwnFlightMatchStage(requester, {
              _id: { $in: parent.flightsIds }
            }),
            mkFltStatsGroupStage("$aircraft"),
            {
              $lookup: {
                from: "Aircrafts",
                localField: "_id",
                foreignField: "_id",
                as: "aircraft"
              }
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" }
              }
            },
            {
              $sort: {
                totalFlightTime: -1
              }
            }
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest
        };
      });
    }
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
                as: "aircraft"
              }
            },
            {
              $set: {
                aircraft: { $first: "$aircraft" }
              }
            },
            {
              $sort: {
                totalFlightTime: -1
              }
            }
          ])
        ).toArray()
      ).map(({ _id, ...rest }) => {
        return {
          _id,
          id: _id.toHexString(),
          ...rest
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
              as: "aircraft"
            }
          },
          {
            $set: {
              aircraft: { $first: "$aircraft" }
            }
          },
          {
            $group: {
              _id: { $concat: ["$aircraft.brand", "__", "$aircraft.model"] },
              aircraftModel: {
                $first: {
                  $concat: ["$aircraft.brand", " ", "$aircraft.model"]
                }
              },
              totalDC: { $sum: "$totalDC" },
              totalPIC: { $sum: "$totalPIC" },
              totalCOPI: { $sum: "$totalCOPI" },
              totalInstructor: { $sum: "$totalInstructor" },
              totalFlightTime: { $sum: "$totalFlightTime" },
              flightAmount: { $sum: "$flightAmount" }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    },

    byInstructor: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return await Flights.aggregate<ByInstructorStatsDb>(
        compact([
          mkOwnFlightMatchStage(requester, {
            $expr: { $not: { $eq: ["$pic", "$pilot"] } }
          }),
          mkFltStatsGroupStage("$pic"),
          {
            $lookup: {
              from: "Pilots",
              localField: "_id",
              foreignField: "_id",
              as: "instructor"
            }
          },
          {
            $set: {
              instructor: { $first: "$instructor" }
            }
          },
          {
            $sort: {
              totalFlightTime: -1
            }
          }
        ])
      ).toArray();
    }
  },

  Query: {
    flightStats: async (parent, args, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");

      return formatFlightStats(
        Flights.aggregate<FlightStatsDb>([
          mkOwnFlightMatchStage(requester),
          mkFltStatsGroupStage()
        ]),
        `${requester._id.toHexString()}-total`
      );
    },
    fromDateFlightStats: async (parent, { date }, { requester }) => {
      if (!requester)
        throw new Error("You must be logged in to perform this action");
      return formatFlightStats(
        Flights.aggregate<FlightStatsDb>([
          mkOwnFlightMatchStage(requester, {
            "departure.date": {
              $gte: date
            }
          }),
          mkFltStatsGroupStage()
        ]),
        `${requester._id.toHexString()}-${date.toISOString()}`
      );
    }
  }
};
