import { Document, IndexDirection, MongoClient } from "mongodb";
import { AircraftDb, FlightDb, PilotDb } from "../gqlTypes.js";
import { config } from "dotenv";
import "./augmentation.js";
config();

export const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
export const database = client.db(process.env.MONGO_DB);
await database.command({ ping: 1 });

console.log("✓ Connected to MongoDB database");

type Configuration<TSchema extends Document> = {
  name: string;
  textSearchFields: Array<(keyof TSchema & string) | string>;
  indexes: Array<Record<string, IndexDirection>>;
  schema: object;
};

async function getCollection<TSchema extends Document>(
  config: Configuration<TSchema>
) {
  const hasCollection = Boolean(
    (await database.listCollections({ name: config.name }).toArray()).length
  );
  const collection = hasCollection
    ? await database.collection<TSchema>(config.name)
    : await database.createCollection<TSchema>(config.name);
  collection.textSearchFields = config.textSearchFields;
  collection.schema = config.schema;
  for (const index of config.indexes) {
    await collection.createIndex(index);
  }
  return collection;
}

export const Pilots = await getCollection<PilotDb>({
  name: "Pilots",
  textSearchFields: [],
  indexes: [],
  schema: {},
});

export const Aircrafts = await getCollection<AircraftDb>({
  name: "Aircrafts",
  textSearchFields: [],
  indexes: [],
  schema: {},
});

export const Flights = await getCollection<FlightDb>({
  name: "Flights",
  textSearchFields: [],
  indexes: [],
  schema: {},
});

export const allCollections = [Pilots];
