import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(LoginInput: { email: $email, password: $password }) {
      user {
        id
        name
        username
      }
    }
  }
`;
