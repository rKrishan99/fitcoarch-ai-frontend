import React, { useContext } from "react";
import { UserBioFormContext } from "../../context/UserBioFormContext";

const GeneratePlan = () => {
  const {
    age,
    gender,
    weight,
    height,
    healthLimitation,
    fitnessGoal,
    workoutDays,
    activityLevel,
    experienceLevel,
  } = useContext(UserBioFormContext);

  const handleGenerate = () => {

    
    
  }

  return (
    <div className="flex items-center justify-center min-h-90">
      <button onClick={handleGenerate} className="bg-primary-400 hover:bg-primary-500 px-6 py-3 text-white rounded-lg cursor-pointer">
        Generate
      </button>
    </div>
  );
};

export default GeneratePlan;
