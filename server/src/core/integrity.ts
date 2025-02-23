import { Collection } from "mongodb";
import { inspect } from "util";
import { isEmpty } from "lodash-es";
import { database } from "./db.js";

export async function enforceMongoSchema(
  collections: Collection<any>[],
  level: "strict" | "moderate" | "off" = "strict"
) {
  for (const collection of collections) {
    const name = collection.collectionName;
    await database
      .command({
        collMod: name,
        validator: { $jsonSchema: collection.schema },
        validationLevel: level
      })
      .catch(() => {
        console.info(
          `✗ Failed setting schema to collection ${name}, the database might not exist`
        );
      });
  }
}

export async function checkMongoIntegrity(collections: Collection<any>[]) {
  for (const collection of collections) {
    const mismatch = await collection.findAll({
      $nor: [{ $jsonSchema: collection.schema }]
    });
    if (!isEmpty(mismatch))
      throw new Error(
        `Collection ${collection.collectionName} failed integrity check.\n${
          mismatch.length
        } of ${await collection.countDocuments()} documents don't follow the expected schema, for example :\n${inspect(
          mismatch[0]
        )}`
      );
  }
}
