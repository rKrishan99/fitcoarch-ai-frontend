import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $name: String!
    $profileImage: String!
    $role: String!
  ) {
    register(
      email: $email
      password: $password
      name: $name
      profileImage: $profileImage
      role: $role
    ) {
      token
      user {
        id
        email
        name
        profileImage
        role
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
