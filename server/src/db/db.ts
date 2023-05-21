import { Document, IndexDirection, MongoClient } from "mongodb";
import { values } from "lodash-es";
import { config } from "dotenv";
import "./augmentation.js";
import {
  AircraftCapabilities,
  AircraftClass,
  AircraftDb,
  FlightDb,
  PilotDb,
} from "../gqlTypes.js";
import { arraySchema, nullableSchema, objectSchema } from "./helpers.js";

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
  schema: objectSchema({
    _id: { bsonType: "objectId" },
    username: { bsonType: String, minLength: 3, maxLength: 30 },
    firstName: { bsonType: String, minLength: 2, maxLength: 30 },
    lastName: { bsonType: String, minLength: 2, maxLength: 30 },
    email: objectSchema({
      address: { bsonType: "string" },
      verified: { bsonType: "bool" },
    }),
    credentials: arraySchema(
      objectSchema({
        _id: { bsonType: "objectId" },
        token: { bsonType: "string" },
        ipv4: { bsonType: "string" },
        userAgent: { bsonType: "string" },
        lastUsed: { bsonType: "date" },
      })
    ),
    passwords: arraySchema(
      objectSchema({
        bcrypt: { bsonType: "string" },
        createdAt: { bsonType: "date" },
      })
    ),
  }),
});

export const Aircrafts = await getCollection<AircraftDb>({
  name: "Aircrafts",
  textSearchFields: [],
  indexes: [],
  schema: objectSchema({
    _id: { bsonType: "objectId" },
    brand: { bsonType: String, minLength: 3, maxLength: 30 },
    model: { bsonType: String, minLength: 3, maxLength: 30 },
    registration: { bsonType: String, minLength: 3, maxLength: 10 },
    capabilities: arraySchema({ enum: values(AircraftCapabilities) }),
  }),
});

export const Flights = await getCollection<FlightDb>({
  name: "Flights",
  textSearchFields: [],
  indexes: [],
  schema: objectSchema({
    _id: { bsonType: "objectId" },
    pilot: { bsonType: "objectId" },
    departure: objectSchema({
      date: { bsonType: "date" },
      place: { bsonType: "string", minLength: 4, maxLength: 4 },
    }),
    arrival: objectSchema({
      date: { bsonType: "date" },
      place: { bsonType: "string", minLength: 4, maxLength: 4 },
    }),
    aircraft: { bsonType: "objectId" },
    aircraftClass: { bsonType: "string", enum: Object.values(AircraftClass) },
    totalFlightTime: { bsonType: "int" },
    pic: { bsonType: "objectId" },
    landings: objectSchema({
      day: { bsonType: "int" },
      night: { bsonType: "int" },
    }),
    ifrApproaches: { bsonType: "int" },
    operationalTime: objectSchema({
      night: { bsonType: "int" },
      ifr: { bsonType: "int" },
    }),
    pilotFunctionTime: objectSchema({
      pic: { bsonType: "int" },
      coPilot: { bsonType: "int" },
      dualCommand: { bsonType: "int" },
      instructor: { bsonType: "int" },
    }),
    simulatorType: nullableSchema({ bsonType: "string" }),
    remarks: { bsonType: "string" },
  }),
});

export const allCollections = [Aircrafts, Flights, Pilots];
