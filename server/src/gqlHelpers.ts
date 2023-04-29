import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { PilotDb } from "./gqlTypes";
import { live } from "./gqlLive.js";
import { ApolloServerContextFn } from "./contextFns.js";
import { Pilots } from "./db/db.js";

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
