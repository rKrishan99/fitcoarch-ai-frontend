import { gql } from "@apollo/client";

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($userId: String!) {
    getChatHistory(userId: $userId) {
      sender
      text
      timestamp
    }
  }
`;



