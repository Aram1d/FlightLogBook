import { Document, ObjectId } from "mongodb";
import { isArray, isObject, isString, keys } from "lodash-es";

// MongoDB helpers

export function castId(): ObjectId;
export function castId(ids: (string | ObjectId | Document)[]): ObjectId[];
export function castId(id: string | ObjectId | Document): ObjectId;

export function castId(
  id?: string | ObjectId | Document | (string | ObjectId | Document)[]
) {
  if (isArray(id)) return id.map((id) => castId(id));
  if (!id) return new ObjectId();
  if (isString(id) || isObjectId(id)) return new ObjectId(id);
  return id._id;
}

export function isObjectId(entity: unknown): entity is ObjectId {
  return (
    isObject(entity) && "toHexString" in entity && "getTimestamp" in entity
  );
}

export function objectSchema(properties: object) {
  return {
    bsonType: "object",
    required: keys(properties),
    additionalProperties: false,
    properties,
  };
}

export function arraySchema(schema: object, unique = true) {
  return {
    bsonType: "array",
    ...(unique && { uniqueItems: true }),
    items: schema,
  };
}

export function nullableSchema(schema: object) {
  return { anyOf: [{ bsonType: "null" }, schema] };
}
