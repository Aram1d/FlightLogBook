import gql from "graphql-tag";
import { Resolvers } from "../gqlTypes";
import { GraphQLScalarType, Kind } from "graphql";

export const typeDefs = gql`
  scalar Date

  input SearchInput {
    field: String!
    value: String!
  }

  input PagerInput {
    globalSearch: String
    fieldSearches: [SearchInput!]
    pagination: PaginationInput
    sorts: [SortInput!]
  }

  input PaginationInput {
    limit: Int!
    page: Int!
  }

  input SortInput {
    field: String!
    order: SortOrder!
  }

  enum SortOrder {
    ASC
    DESC
  }
`;

export const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value: any) {
      if (!(value instanceof Date))
        throw new Error("You did not provide a Date object");
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: any) {
      const date = new Date(value); // Convert incoming integer to Date
      if (isNaN(date.valueOf()))
        throw new Error("You did not provide a Date object");
      return date;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  }),
};
