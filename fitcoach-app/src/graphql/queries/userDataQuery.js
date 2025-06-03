import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query GetUserData($userId: String!) {
    getUserData(userId: $userId) {
      id
      userId
      age
      gender
      weight
      height
      healthLimitation
      fitnessGoal
      workoutDays
      activityLevel
      experienceLevel
      createdAt
    }
  }
`;