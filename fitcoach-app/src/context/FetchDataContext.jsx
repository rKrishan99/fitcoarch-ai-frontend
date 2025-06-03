import React, { createContext } from "react";
import { GET_USER_DATA } from "../graphql/queries/userDataQuery";
import { GET_WORKOUT_PLAN } from "../graphql/queries/workoutPlanQuery";
import { useLazyQuery } from "@apollo/client";

export const FetchDataContext = createContext();

export const FetchDataContextProvider = ({ children }) => {
  const [getUserData, { loading: userDataLoading }] =
    useLazyQuery(GET_USER_DATA);
  const [getWorkoutPlan, { loading: workoutPlanLoading }] =
    useLazyQuery(GET_WORKOUT_PLAN);

  const getBioData = async (userId) => {
    console.log("=== STARTING getBioData ===");
    console.log("Input userId:", userId, "Type:", typeof userId);
    
    try {
      console.log("About to call getUserData with variables:", { userId: String(userId) });
      
      const result = await getUserData({
        variables: { userId: String(userId) },
        fetchPolicy: "no-cache", // Force fresh data
      });
      
      console.log("Raw getUserData result:", result);
      console.log("Result data:", result.data);
      console.log("Result error:", result.error);
      console.log("Result loading:", result.loading);
      
      if (result.error) {
        console.error("GraphQL Error Details:", {
          message: result.error.message,
          graphQLErrors: result.error.graphQLErrors,
          networkError: result.error.networkError,
        });
        throw result.error;
      }

      console.log("=== getBioData SUCCESS ===");
      return result.data;
    } catch (error) {
      console.error("=== getBioData FAILED ===");
      console.error("Caught error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  };

  const getPlanData = async (userId) => {
    try {
      const { data } = await getWorkoutPlan({
        variables: { userId },
        fetchPolicy: "network-only",
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch bio data:", error);
      throw error;
    }
  };

  return (
    <FetchDataContext.Provider
      value={{
        getBioData,
        getPlanData,
        userDataLoading,
        workoutPlanLoading,
      }}
    >
      {children}
    </FetchDataContext.Provider>
  );
};
