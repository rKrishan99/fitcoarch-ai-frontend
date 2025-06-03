import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($userId: String!, $message: String!) {
    sendMessage(userId: $userId, message: $message) {
      reply
      history {
        sender
        text
        timestamp
      }
    }
  }
`;