import { gql } from "@apollo/client";

export const SUBMIT_USER_BIO = gql`
  mutation CreateUserBio(
    $userId: ID!
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
    createUserBio(
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
