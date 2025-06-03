import { gql } from "@apollo/client";

export const GENERATE_PLAN = gql`
  mutation GeneratePlan($userId: ID!) {
    generateWorkoutPlan(userId: $userId) {
      plan
      createdAt
    }
  }
`;
