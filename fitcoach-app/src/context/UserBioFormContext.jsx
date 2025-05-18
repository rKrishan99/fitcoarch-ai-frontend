import React, { createContext, useState } from "react";

export const UserBioFormContext = createContext();

export const UserBioFormContextProvider = ({ children }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [healthLimitation, setHealthLimitation] = useState("");

  const [fitnessGoal, setFitnessGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [workoutDays, setWorkoutDays] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  return (
    <UserBioFormContext.Provider
      value={{
        age,
        setAge,
        gender,
        setGender,
        weight,
        setWeight,
        height,
        setHeight,
        healthLimitation,
        setHealthLimitation,
        fitnessGoal,
        setFitnessGoal,
        activityLevel,
        setActivityLevel,
        workoutDays,
        setWorkoutDays,
        experienceLevel,
        setExperienceLevel,
      }}
    >
      {children}
    </UserBioFormContext.Provider>
  );
};
