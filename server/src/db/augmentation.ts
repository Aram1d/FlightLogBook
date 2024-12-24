import {
  Collection,
  Document,
  Filter,
  FindOptions,
  ObjectId,
  UpdateFilter,
  WithoutId
} from "mongodb";
import {
  castArray,
  compact,
  escapeRegExp,
  fromPairs,
  get,
  isArray,
  isEmpty,
  values
} from "lodash-es";
import { castId } from "./helpers.js";
import { PagerInput, PaginationInput, SortOrder } from "../gqlTypes.js";

declare module "mongodb" {
  export type PageResult<TSchema extends Document> = {
    total: number;
    items: TSchema[];
  };

  export interface Collection<TSchema extends Document> {
    textSearchFields: Array<(keyof TSchema & string) | string>;
    schema: object;

    exists(filter: Filter<TSchema>): Promise<boolean>;

    existsById(
      id: string | ObjectId | readonly (string | ObjectId)[]
    ): Promise<boolean>;

    create(document: WithoutId<TSchema>): Promise<TSchema>;

    create(documents: readonly WithoutId<TSchema>[]): Promise<TSchema[]>;

    setById(
      id: string | ObjectId,
      $set: UpdateFilter<TSchema>["$set"]
    ): Promise<TSchema | null>;

    findById(
      id: string | ObjectId,
      options?: FindOptions
    ): Promise<TSchema | null>;

    findById(
      ids: readonly (string | ObjectId)[],
      options?: FindOptions
    ): Promise<TSchema[]>;

    findLast(filter: Filter<TSchema>): Promise<TSchema | null>;

    findAll(filter: Filter<TSchema>, options?: FindOptions): Promise<TSchema[]>;

    mappedFindOne<K extends keyof TSchema>(
      filter: Filter<TSchema>,
      key: K
    ): Promise<TSchema[K] | null>;

    mappedFind<K extends keyof TSchema>(
      filter: Filter<TSchema>,
      key: K
    ): Promise<TSchema[K][]>;

    mappedFindById<K extends keyof TSchema>(
      id: string | ObjectId,
      key: K
    ): Promise<TSchema[K] | null>;

    mappedFindById<K extends keyof TSchema>(
      ids: readonly (string | ObjectId)[],
      key: K
    ): Promise<TSchema[K][]>;

    findList(
      filter: Filter<TSchema>,
      filters?: PagerInput | null
    ): Promise<PageResult<TSchema>>;
  }
}

Collection.prototype.exists = async function (filter) {
  return Boolean(await this.countDocuments(filter, { limit: 1 }));
};

Collection.prototype.existsById = async function (id) {
  id = castArray(id);
  return (
    id.length ===
    (await this.countDocuments(
      { _id: { $in: castId(id) } },
      { limit: id.length || 1 }
    ))
  );
};

Collection.prototype.create = async function (document) {
  if (isArray(document)) {
    const result = await this.insertMany(
      document.map(document => ({ _id: castId(), ...document }))
    );
    const docs = await this.findById(values(result.insertedIds));
    if (document.length !== docs.length)
      throw new Error(
        `Some documents couldn't be inserted in collection ${this.collectionName}`
      );
    return docs;
  } else {
    const result = await this.insertOne({ _id: castId(), ...document });
    const doc = await this.findById(result.insertedId);
    if (!doc)
      throw new Error(
        `The document couldn't be inserted in collection ${this.collectionName}`
      );
    return doc;
  }
};

Collection.prototype.setById = async function (id, $set) {
  await this.updateOne({ _id: castId(id) }, { $set });
  return this.findById(id);
};

Collection.prototype.findById = function (id, options) {
  return isArray(id)
    ? this.findAll({ _id: { $in: castId(id) } }, options)
    : (this.findOne({ _id: castId(id) }, options) as any);
};

Collection.prototype.findLast = function (filter) {
  return this.findOne(filter, { sort: { _id: -1 }, limit: 1 });
};

Collection.prototype.findAll = function (filter, options) {
  return this.find(filter, options).toArray();
};

Collection.prototype.mappedFindOne = async function (filter, key) {
  const document = await this.findOne(filter, { projection: { [key]: 1 } });
  return document && get(document, key);
};

Collection.prototype.mappedFind = async function (filter, key) {
  const result = await this.findAll(filter, { projection: { [key]: 1 } });
  return result.map(document => get(document, key));
};

Collection.prototype.mappedFindById = function (id, key) {
  return isArray(id)
    ? this.mappedFind({ _id: { $in: castId(id) } }, key)
    : this.mappedFindOne({ _id: castId(id) }, key);
};

Collection.prototype.findList = async function (filter, pager: PagerInput) {
  const globalSearch = pager?.globalSearch ?? "";
  const fieldSearches = pager?.fieldSearches ?? [];
  const pagination = pager?.pagination;
  const sorts = pager?.sorts ?? [];

  const words = compact(globalSearch.split(/\s+/));
  const activeWords = words.filter(word => word.length > 2);
  if (!isEmpty(words) && isEmpty(activeWords)) {
    return { total: 0, items: [] };
  }

  const rootFilter: typeof filter = {
    $and: compact([
      filter,
      !isEmpty(activeWords) &&
        !isEmpty(this.textSearchFields) && {
          $or: this.textSearchFields.map(field => ({
            $or: activeWords.map(word => ({
              [field]: new RegExp(escapeRegExp(word), "i")
            }))
          }))
        },

      !isEmpty(fieldSearches) &&
        fieldSearches.reduce((accum, { field, value }) => {
          return {
            ...accum,
            [field]: { $regex: value, $options: "i" }
          };
        }, {})
    ])
  };

  return {
    total: await this.countDocuments(rootFilter),
    items: await this.findAll(rootFilter, {
      ...(pagination && {
        skip:
          (pagination.page - 1) * pagination.limit + (pagination.shift ?? 0),
        limit: pagination.limit
      }),
      ...(!isEmpty(sorts) && {
        sort: fromPairs(
          sorts.map(sort => [sort.field, sort.order === SortOrder.Asc ? 1 : -1])
        )
      })
    })
  };
};
