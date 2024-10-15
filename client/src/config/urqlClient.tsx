import { useEffect, useState } from "react";
import {
  createClient,
  ExecutionResult,
  Provider,
  subscriptionExchange,
  Client,
  mapExchange
} from "urql";
import { cacheExchange, CacheExchangeOpts } from "@urql/exchange-graphcache";
import customScalarsExchange from "urql-custom-scalars-exchange";
import { applyAsyncIterableIteratorToSink } from "@n1ru4l/push-pull-async-iterable-iterator";
import { applyLiveQueryJSONPatch } from "@n1ru4l/graphql-live-query-patch-json-patch";
import { createSocketIOGraphQLClient } from "@n1ru4l/socket-io-graphql-client";
import { io } from "socket.io-client";
import { identity } from "lodash-es";
import { GraphCacheConfig } from "@api";
import { introspection } from "@api";
import { useStore } from "@hooks";

const url =
  import.meta.env.MODE === "development"
    ? `ws://${window.location.hostname}:4000`
    : `${window.location.origin}`;

const socket = io(url, {});
const { execute } = createSocketIOGraphQLClient<ExecutionResult>(socket);

export const createUrqlClient = () =>
  createClient({
    url: "noop",
    requestPolicy: "cache-and-network",
    exchanges: [
      mapExchange({
        onError(error) {
          console.log(error); // eslint-disable-line
        }
      }),
      cacheExchange(
        identity<
          GraphCacheConfig & Omit<CacheExchangeOpts, keyof GraphCacheConfig>
        >({
          schema: introspection,
          keys: {
            Email: ({ address }) => address ?? null,
            PilotsPage: () => null,
            AircraftsPage: () => null,
            OperationalTime: () => null,
            PilotFunctionTime: () => null,
            Landings: () => null,
            Juncture: () => null
          },
          storage: null as any
        })
      ),
      customScalarsExchange({
        schema: introspection as any,
        scalars: {
          Date(serialized: number) {
            return new Date(serialized);
          }
        }
      }),
      subscriptionExchange({
        enableAllOperations: true,
        forwardSubscription: ({ query, variables }) => ({
          subscribe: sink => ({
            unsubscribe: applyAsyncIterableIteratorToSink(
              applyLiveQueryJSONPatch(
                execute({
                  operation: query ?? "",
                  variables,
                  extensions: {
                    token: useStore.getState().loginToken,
                    correlationId: useStore.getState().clientUUID
                  }
                })
              ),
              sink
            )
          })
        })
      })
    ],
    fetchOptions: () => {
      const token = useStore.getState().loginToken;
      return token ? { headers: { Authorization: token } } : {};
    }
  });

export const UrqlWrapper = ({ children }: { children: JSX.Element }) => {
  const [token] = useStore(s => s.loginToken);
  const [urqlClient, newUrqlClient] = useState<Client>(createUrqlClient());

  useEffect(() => {
    newUrqlClient(createUrqlClient());
  }, [token]);

  return <Provider value={urqlClient}>{children}</Provider>;
};
