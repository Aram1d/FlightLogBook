import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { execute as defaultExecute, ExecutionArgs } from "graphql";
import express from "express";
import cors from "cors";
import { registerSocketIOGraphQLServer } from "@n1ru4l/socket-io-graphql-server";
import { applyLiveQueryJSONPatchGenerator } from "@n1ru4l/graphql-live-query-patch-json-patch";

import { flowRight, isObject } from "lodash-es";

import { config } from "dotenv";
import bodyParser from "body-parser";

import { apolloContext, wsServerContext } from "./contextFns";
import * as util from "util";

import { checkMongoIntegrity, enforceMongoSchema, allCollections } from "@core";
import { schema, live } from "@graphql";

util.inspect.defaultOptions.depth = null;

config();

await enforceMongoSchema(allCollections);
await checkMongoIntegrity(allCollections);
console.info("✓ Database passed health check");

const app = express();

const server = createServer(app);
const socketServer = new IOServer(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 8e6
});

const makeLazyContextExecute =
  (contextFactory: (previous: unknown) => unknown) =>
  (execute: typeof defaultExecute) =>
  async (args: ExecutionArgs) =>
    execute({ ...args, contextValue: await contextFactory(args.contextValue) });

registerSocketIOGraphQLServer({
  socketServer,
  getParameter: async ({ socket, graphQLPayload: { extensions } }) => ({
    execute: flowRight(
      applyLiveQueryJSONPatchGenerator,
      flowRight(
        live.makeExecute,
        makeLazyContextExecute(async previous => {
          const ctx = await wsServerContext(
            socket.handshake,
            extensions?.token,
            extensions?.correlationId
          );
          const sym =
            isObject(previous) && Object.getOwnPropertySymbols(previous)[0];
          return !sym ? ctx : { ...previous, [sym]: ctx };
        })
      )(defaultExecute)
    ),
    graphQLExecutionParameter: { schema }
  })
});

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

//Serve the compiled React app if production mode
if (process.env.NODE_ENV === "production")
  app.use("/", express.static("public"));

//Open listening socket

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

app.use(
  "/api",
  bodyParser.json({ limit: 50e6 }),
  expressMiddleware(apolloServer, {
    context: apolloContext
  })
);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("public"));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: "public" });
  });
}

server.listen({ port: process.env.SERVER_PORT }, () => {
  console.info(
    "🚀 FLB graphQl server ready on port " + process.env.SERVER_PORT + " !"
  );
});
