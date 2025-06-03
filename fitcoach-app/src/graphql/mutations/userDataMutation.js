import { gql } from "@apollo/client";

export const SUBMIT_USER_DATA = gql`
  mutation CreateUserData(
    $userId: String!
    $age: Int!
    $gender: String!
    $weight: Float!
    $height: Float!
    $healthLimitation: String!
    $fitnessGoal: String!
    $workoutDays: String!
    $activityLevel: String!
    $experienceLevel: String!
  ) {
    createUserData(
      userId: $userId
      age: $age
      gender: $gender
      weight: $weight
      height: $height
      healthLimitation: $healthLimitation
      fitnessGoal: $fitnessGoal
      workoutDays: $workoutDays
      activityLevel: $activityLevel
      experienceLevel: $experienceLevel
    ) {
      id
      userId
      age
      gender
      weight
      height
      fitnessGoal
      workoutDays
      activityLevel
      experienceLevel
      healthLimitation
    }
  }
`;
