import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      user {
        id
        name
        username
      }
    }
  }
`;
