import { gql } from "@apollo/client";

export const GET_WORKOUT_PLAN = gql`
  query GetWorkoutPlan($userId: ID!) {
    getWorkoutPlan(userId: $userId) {
      id
      userId
      plan
      createdAt
    }
  }
`;
