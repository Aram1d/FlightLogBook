import {
  InMemoryLiveQueryStore,
  InMemoryLiveQueryStoreParameter,
} from "@n1ru4l/in-memory-live-query-store";

const liveIndexes: InMemoryLiveQueryStoreParameter["indexBy"] = [];

export const live = new InMemoryLiveQueryStore({ indexBy: liveIndexes });
