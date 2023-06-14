import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import { config } from "dotenv";

import { resolvers, typeDefs } from "./schema.js";
import { apolloContext, wsServerContext } from "./contextFns.js";

import { flowRight, isObject } from "lodash-es";
import { execute as defaultExecute, ExecutionArgs } from "graphql";
import { Server as IOServer } from "socket.io";
import { registerSocketIOGraphQLServer } from "@n1ru4l/socket-io-graphql-server";
import { applyLiveQueryJSONPatchGenerator } from "@n1ru4l/graphql-live-query-patch-json-patch";
import { live } from "./gqlLive.js";
import { checkMongoIntegrity, enforceMongoSchema } from "./db/integrity.js";
import { allCollections } from "./db/db.js";
import * as util from "util";
util.inspect.defaultOptions.depth = null;

config();

await enforceMongoSchema(allCollections);
await checkMongoIntegrity(allCollections);
console.log("✓ Database passed health check");

const app = express();

const server = createServer(app);
const socketServer = new IOServer(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 8e6,
});
const schema = makeExecutableSchema({ typeDefs, resolvers });

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
        makeLazyContextExecute(async (previous) => {
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
    graphQLExecutionParameter: { schema },
  }),
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Serve the compiled React app if production mode
if (process.env.NODE_ENV === "production")
  app.use("/", express.static("public"));

//Open listening socket

const apolloServer = new ApolloServer({
  schema,
  context: apolloContext,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app: app, path: "/api" });

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "public" });
  });
}

server.listen({ port: process.env.SERVER_PORT }, () => {
  console.info(
    "🚀 FLB graphQl server ready on port " + process.env.SERVER_PORT + " !"
  );
});
