import gql from "graphql-tag";

export const DIRECTIVES = gql`
  input AdditionalEntityFields {
    path: String
    type: String
  }

  directive @union(
    discriminatorField: String
    additionalFields: [AdditionalEntityFields]
  ) on UNION
  directive @abstractEntity(
    discriminatorField: String
    additionalFields: [AdditionalEntityFields]
  ) on INTERFACE
  directive @entity(
    embedded: Boolean
    additionalFields: [AdditionalEntityFields]
  ) on OBJECT
  directive @column(overrideType: String) on FIELD_DEFINITION
  directive @id on FIELD_DEFINITION
  directive @link(overrideType: String) on FIELD_DEFINITION
  directive @embedded on FIELD_DEFINITION
  directive @map(path: String!) on FIELD_DEFINITION
  directive @live(if: Boolean, throttle: Int) on QUERY
`;
