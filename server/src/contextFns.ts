import type { PilotDb } from "./gqlTypes";
import { verify } from "jsonwebtoken";
import { Pilots } from "./db/db.js";
import { castId } from "./db/helpers.js";
import { Request, Response } from "express";
import { Handshake } from "socket.io/dist/socket";

export async function commonAuthFn(token: any): Promise<PilotDb | null> {
  if (typeof token === "string") {
    const tokenPayload: any = ((token: string) => {
      try {
        return verify(token, process.env.TOKEN_SECRET);
      } catch (e) {
        console.warn("invalid token: " + e);
      }
    })(token);

    //If we get a valid Payload from decoded token

    if (tokenPayload) {
      if (typeof tokenPayload?.user === "string") {
        const userId: string = tokenPayload.user;
        const requester = await Pilots.findOne({ _id: castId(userId) });

        if (
          requester &&
          requester.credentials.filter((item) => item.token === token)
            .length === 1
        ) {
          const tokenCheck = await Pilots.findOneAndUpdate(
            { _id: requester?._id },
            {
              $set: {
                "credentials.$[cred].lastUsed": new Date(),
              },
            },
            {
              arrayFilters: [{ "cred.token": token }],
            }
          );

          if (tokenCheck) {
            return requester;
          }
        }
      }
    }
  }
  return null;
}

type ContextReturn = Promise<{
  requester: PilotDb | null;
  token: string | null;
  clientInfo: { ipv4: string; userAgent: string; clientUUID: string };
}>;

//ApolloSever Context Fn:

export function apolloContext({
  req,
}: {
  req: Request;
  res: Response;
}): ContextReturn {
  //Info about the client for the Auth system
  const clientInfo: { ipv4: string; userAgent: string; clientUUID: string } = {
    ipv4: req.ip.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)?.[0] ?? "- NR -",
    userAgent: req.headers["user-agent"] || "- NR -",
    clientUUID: (req.headers["Correlation-ID"] as string) || "",
  };

  return commonAuthFn(req.headers.authorization).then((requester) => ({
    requester,
    clientInfo,
    token: req.headers.authorization || null,
  }));
}

//Export type of the ApolloContext function.
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ApolloServerContextFn = ThenArg<ReturnType<typeof apolloContext>>;

//SocketIO gql context Fn:

export const wsServerContext = (
  handShake: Handshake,
  wsToken: string | null,
  clientUUID: string | null
): ContextReturn => {
  const clientInfo: { ipv4: string; userAgent: string } = {
    ipv4:
      handShake.address.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)?.[0] ??
      "- NR -",
    userAgent: handShake.headers["user-agent"] as string,
  };

  return commonAuthFn(wsToken).then((requester) => ({
    requester,
    clientInfo: {
      ...clientInfo,
      clientUUID: clientUUID || "",
    },
    token: wsToken,
  }));
};
