import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { DIRECTIVES } from "./utils/directives";

import {
  typeDefs as aircraftTypeDefs,
  resolvers as AircraftResolvers
} from "./aircraft.schema";

import {
  typeDefs as commonTypeDefs,
  resolvers as commonResolvers
} from "./common.schema";

import {
  typeDefs as flightTypeDefs,
  resolvers as flightResolvers
} from "./flight.schema";

import {
  typeDefs as flightStatsTypeDefs,
  resolvers as flightStatsResolvers
} from "./flightStats.schema";

import {
  typeDefs as pilotTypeDefs,
  resolvers as pilotResolvers
} from "./pilot.schema";

const typeDefs = mergeTypeDefs([
  DIRECTIVES,
  aircraftTypeDefs,
  commonTypeDefs,
  flightTypeDefs,
  flightStatsTypeDefs,
  pilotTypeDefs
]);
const resolvers = mergeResolvers([
  AircraftResolvers,
  commonResolvers,
  flightResolvers,
  flightStatsResolvers,
  pilotResolvers
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export * from "./utils";
