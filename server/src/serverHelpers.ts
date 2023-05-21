import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { AddFlightInput, PilotDb } from "./gqlTypes";
import { live } from "./gqlLive.js";
import { ApolloServerContextFn } from "./contextFns.js";
import { Pilots } from "./db/db.js";
import { isNil, omitBy } from "lodash-es";
import { ApolloError } from "apollo-server-express";
import { z } from "zod";
import dayjs from "dayjs";

export const authMsg = {
  guestReq: "Vous êtes déjà connecté",
  userReq: "Vous devez être connecté pour accéder à cette page",
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
          lastUsed: new Date(),
        },
      },
    }
  );

  live.invalidate(`Query.currentUser(uuid:${clientUUID})`);
  return token;
}

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const omitNil = (obj: Record<string, any>) => omitBy(obj, isNil);

export const nulResolverHandler =
  <T extends any>(errorMsg: string) =>
  (arg: T) => {
    if (!arg) throw new ApolloError(errorMsg);
    return arg;
  };

export const castNonNullable =
  <T>(errorMsg: string) =>
  (arg: T | null) => {
    if (!arg) throw new ApolloError(errorMsg);
    return arg;
  };

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
      date: z.date(),
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
        ),
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
      night: z.number().min(0, "Landings should be positive"),
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
        ),
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
        .max(
          tft,
          "Instructor time should not be longer than total flight time"
        ),
    }),
  });
  return [validator, tft] as const;
};
