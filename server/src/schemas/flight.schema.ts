import gql from "graphql-tag";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { z } from "zod";
import dayjs from "dayjs";
import { Resolvers } from "../gqlTypes";
import {
  authMsg,
  castNonNullable,
  flightValidator,
  nulResolverHandler,
  omitNil,
} from "../serverHelpers.js";
import { Aircrafts, Flights, Pilots } from "../db/db.js";
import { castId } from "../db/helpers.js";
import { live } from "../gqlLive.js";

export const typeDefs = gql`
  enum AircraftClass {
    singleEngine
    multiEngine
    multiPilot
  }

  type Juncture @entity {
    place: String! @column
    date: Date! @column
  }

  type SinglePilotFlightTime @entity {
    singleEngine: Int! @column
    multiEngine: Int! @column
  }

  type Landings @entity {
    day: Int! @column
    night: Int! @column
  }

  type OperationalTime @entity {
    night: Int! @column
    ifr: Int! @column
  }

  type PilotFunctionTime @entity {
    pic: Int! @column
    coPilot: Int! @column
    dualCommand: Int! @column
    instructor: Int! @column
  }

  type Flight @entity {
    id: ID! @id #1
    pilot: Pilot! @link #-
    departure: Juncture! @embedded #3
    arrival: Juncture! @embedded #4
    aircraft: Aircraft @link #-
    aircraftClass: AircraftClass! @column #5
    totalFlightTime: Int! @column #6
    pic: Pilot! @link #7
    landings: Landings! @embedded #8
    ifrApproaches: Int! @column #9
    operationalTime: OperationalTime! @embedded #10
    pilotFunctionTime: PilotFunctionTime! @embedded #11
    simulatorType: String #12
    remarks: String! @column #13
  }

  type FlightsPage {
    items: [Flight!]!
    total: Int!
  }

  input JunctureInput {
    place: String!
    date: Date!
  }

  input SinglePilotFlightTimeInput {
    singleEngine: Int!
    multiEngine: Int!
  }

  input LandingsInput {
    day: Int!
    night: Int!
  }

  input OperationalTimeInput {
    night: Int!
    ifr: Int!
  }

  input PilotFunctionTimeInput {
    pic: Int!
    coPilot: Int!
    dualCommand: Int!
    instructor: Int!
  }

  input AddFlightInput {
    departure: JunctureInput!
    arrival: JunctureInput!
    aircraft: ID
    aircraftClass: AircraftClass!
    totalFlightTime: Int!
    pic: ID!
    landings: LandingsInput!
    ifrApproaches: Int!
    operationalTime: OperationalTimeInput!
    pilotFunctionTime: PilotFunctionTimeInput!
    simulatorType: String
    remarks: String!
  }

  input UpdateFlightInput {
    departure: JunctureInput
    arrival: JunctureInput
    aircraft: ID
    aircraftClass: AircraftClass
    totalFlightTime: Int
    pic: ID
    landings: LandingsInput
    ifrApproaches: Int
    operationalTime: OperationalTimeInput
    pilotFunctionTime: PilotFunctionTimeInput
    simulatorType: String
    remarks: String
  }

  extend type Query {
    ocaiCodes: [String!]!
    lastFlightDate: Date
    flight(id: ID!): Flight!
    ownFlights(pager: PagerInput): FlightsPage!
  }

  extend type Mutation {
    addFlight(input: AddFlightInput!): Flight!
    updateFlight(id: ID!, input: UpdateFlightInput!): Flight!
  }
`;

export const resolvers: Resolvers = {
  Flight: {
    id: (parent) => parent._id.toHexString(),
    aircraft: (parent) => Aircrafts.findById(parent?.aircraft ?? ""),
    pilot: (parent) =>
      Pilots.findById(parent.pilot).then(
        nulResolverHandler(
          `Pilot ${parent.pilot.toHexString()} is dangling ref`
        )
      ),
    pic: (parent) =>
      Pilots.findById(parent.pic).then(
        nulResolverHandler(
          `Pilot ${parent.pilot.toHexString()} is dangling ref`
        )
      ),
  },

  Query: {
    ocaiCodes: async () => {
      return Flights.aggregate()
        .project({
          _id: ["$departure.place", "$arrival.place"],
        })
        .unwind("$_id")
        .group({ _id: "$_id" })
        .map((doc) => doc._id)
        .toArray();
    },
    lastFlightDate: async (parent, args, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      const lastFlight = await Flights.findOne(
        {
          $or: [
            { pilot: castId(requester._id) },
            { pic: castId(requester._id) },
          ],
        },
        { sort: { "arrival.date": -1 } }
      );
      return lastFlight?.arrival.date;
    },
    flight: async (parent, { id }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      const flight = await Flights.findOne({
        _id: castId(id),
        $or: [{ pilot: castId(requester._id) }, { pic: castId(requester._id) }],
      });
      if (!flight) throw new UserInputError(`Flight ${id} not found`);
      return flight;
    },
    ownFlights: (parent, { pager }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);
      return Flights.findList(
        {
          $or: [
            { pilot: castId(requester._id) },
            { pic: castId(requester._id) },
          ],
        },
        pager
      );
    },
  },
  Mutation: {
    addFlight: async (parent, { input }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);

      const { pilotFunctionTime } = input;

      const [validator, tft] = flightValidator(input);

      validator.parse(input);

      if (
        !(
          pilotFunctionTime.pic +
            pilotFunctionTime.coPilot +
            pilotFunctionTime.dualCommand +
            pilotFunctionTime.instructor ===
          tft
        )
      )
        throw new UserInputError("Sum of pilot fn time should equal TFT");

      if (input.aircraft && input.simulatorType)
        throw new Error("Aircraft and simulator type are mutually exclusive");

      const [pic, aircraft] = await Promise.all([
        Pilots.findById(input.pic),
        Aircrafts.findById(input.aircraft ?? ""),
      ]);

      if (!pic) throw new Error("PIC id is not valid");
      if (!aircraft && !input.simulatorType)
        throw new Error("You should provide an aircraft or a simulator type");

      const newFlight = Flights.create({
        ...input,
        pilot: requester._id,
        aircraft: input.aircraft ? castId(input.aircraft) : null,
        pic: castId(input.pic),
      });

      await live.invalidate(["Query.ownFlights", "Query.lastFlightDate"]);
      return newFlight;
    },
    updateFlight: async (parent, { id, input }, { requester }) => {
      if (!requester) throw new AuthenticationError(authMsg.userReq);

      const updated = await Flights.findOneAndUpdate(
        {
          _id: castId(id),
          $or: [{ pilot: requester._id }, { pic: requester._id }],
        },
        {
          $set: omitNil({
            ...input,
            aircraft: input.aircraft ? castId(input.aircraft) : null,
            pic: input.pic ? castId(input.pic) : null,
          }),
        }
      );
      if (!updated.value)
        throw new UserInputError(
          `Flight ${id} not found or not owned by yourself`
        );
      live.invalidate([`Flight:${id}`]);
      return updated.value;
    },
  },
};
