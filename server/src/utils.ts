import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { isNil, omitBy } from "lodash-es";
import { z } from "zod";
import dayjs from "dayjs";

import { ApolloServerContextFn } from "./contextFns.js";

import { Pilots } from "@core";
import { AddFlightInput, PaginationInput, PilotDb, live } from "@graphql";

export const authMsg = {
  guestReq: "Vous êtes déjà connecté",
  userReq: "Vous devez être connecté pour accéder à cette page"
};

export const userInputError = (msg?: string) => {
  throw new GraphQLError(msg || "You entered something wrong", {
    extensions: {
      code: "BAD_USER_INPUT"
    }
  });
};

export const authenticationError = (msg?: string) => {
  throw new GraphQLError(msg || "You cannot access this", {
    extensions: {
      code: "FORBIDDEN"
    }
  });
};

export async function signIn(
  user: Pick<PilotDb, "_id">,
  { ipv4, userAgent, clientUUID }: ApolloServerContextFn["clientInfo"]
) {
  const token = jwt.sign(
    { user: user._id.toHexString() },
    process.env.TOKEN_SECRET
  );
  await Pilots.findOneAndUpdate(
    { _id: user._id },
    {
      $push: {
        credentials: {
          _id: new ObjectId(),
          token,
          ipv4,
          userAgent,
          lastUsed: new Date()
        }
      }
    }
  );

  live.invalidate(`Query.currentUser(uuid:${clientUUID})`);
  return token;
}

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const omitNil = (obj: Record<string, any>) => omitBy(obj, isNil);

export const nulResolverHandler =
  <T>(errorMsg: string) =>
  (arg: T) => {
    if (!arg) throw userInputError(errorMsg);
    return arg;
  };

export const castNonNullable =
  <T>(errorMsg: string) =>
  (arg: T | null) => {
    if (!arg) throw userInputError(errorMsg);
    return arg;
  };

// Pagination helper function
export function paginate(pagination: PaginationInput | undefined | null) {
  if (!pagination?.page) return {};
  const limit = pagination?.limit ?? 10;
  return {
    skip: (pagination?.page ?? 1) * limit - limit + (pagination.shift ?? 0),
    limit
  };
}

export const flightValidator = (
  input: Pick<
    AddFlightInput,
    "departure" | "arrival" | "totalFlightTime" | "simulatorType"
  >
) => {
  const tft = dayjs(input.arrival.date).diff(
    dayjs(input.departure.date),
    "minute"
  );

  const validator = z.object({
    departure: z.object({
      place: z
        .string()
        .nonempty("Departure place is required")
        .length(4, "Departure place should have 4 characters"),
      date: z.date()
    }),
    arrival: z.object({
      place: z
        .string()
        .nonempty("Arrival place is required")
        .length(4, "Departure place should have 4 characters"),
      date: z
        .date()
        .min(
          dayjs(input.departure.date).add(1, "m").toDate(),
          "Arrival time should be after departure time"
        )
    }),
    aircraft: input.simulatorType
      ? z.string().nullable()
      : z
          .string()
          .nonempty(
            "Aircraft is required unless you fill the simulation section"
          ),
    totalFlightTime: z.literal(tft),
    pic: z.string().nonempty("PIC is required").nonempty("PIC is required"),
    landings: z.object({
      day: z.number().min(0, "Landings should be positive"),
      night: z.number().min(0, "Landings should be positive")
    }),
    operationalTime: z.object({
      night: z
        .number()
        .min(0, "Operational time should be positive")
        .max(
          tft,
          "Operational time should not be longer than total flight time"
        ),
      ifr: z
        .number()
        .min(0, "Operational time should be positive")
        .max(
          tft,
          "Operational time should not be longer than total flight time"
        )
    }),
    pilotFunctionTime: z.object({
      pic: z
        .number()
        .min(0, "PIC time should be positive")
        .max(tft, "PIC time should not be longer than total flight time"),
      coPilot: z
        .number()
        .min(0, "Co-pilot time should be positive")
        .max(tft, "Co-pilot time should not be longer than total flight time"),
      dualCommand: z
        .number()
        .min(0, "Dual command time should be positive")
        .max(
          tft,
          "Dual command time should not be longer than total flight time"
        ),
      instructor: z
        .number()
        .min(0, "Instructor time should be positive")
        .max(tft, "Instructor time should not be longer than total flight time")
    })
  });
  return [validator, tft] as const;
};
