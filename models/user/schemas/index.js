import { gql } from "apollo-server-micro";

export const typeUser = gql`
  type User {
    ID: ID
    LOGIN: String
    AVATAR_URL: String
  }

  type Query {
    getUsers: [User]
    getUser(ID: ID!): User!
  }

  type Mutation {
    createUser(
      LOGIN: String! 
      AVATAR_URL: String
      ): User
    editUser(
      ID: ID!
      LOGIN: String
      AVATAR_URL: String
      ): User
    deleteUser(ID: ID!): String
  }
`;


