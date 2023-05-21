import { Document, ObjectId } from "mongodb";
import { isArray, isObject, isString, keys } from "lodash-es";
import { PagerInput } from "../gqlTypes";

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

//compute pager for regular mongo queries

//compute pager to mongoDB  aggregation pipeline stages
/*export function computeAggregationPager(pagerInput: PagerInput) {
  if (!pagerInput) return [];
  const aggregationStages = [];

  //Generate Search stage
  if (pagerInput?.filters?.searches)
    aggregationStages.push({
      $match: computeSearch(pagerInput.filters.searches),
    });

  //generate sort stage
  if (pagerInput.sorts) {
    aggregationStages.push({
      $sort: pagerInput.sorts.reduce(
        (acc, { field, sorter }) => ({ ...acc, [field]: sorter }),
        {}
      ),
    });
  }

  //generate paginations stages
  if (pagerInput?.filters?.page) {
    const { skip, limit } = paginate(pagerInput.filters);
    aggregationStages.push({
      $skip: skip,
    });
    aggregationStages.push({
      $limit: limit,
    });
  }

  return aggregationStages;
}*/
