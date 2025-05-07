import React from "react";
import WorkoutSummary from "../../components/workoutSummary/WorkoutSummary";

const Dashbord = () => {
  return (
    <div className="px-[120px] min-h-screen">
      <h1 className="mt-10 text-3xl font-bold">Welcome back, Rajitha</h1>
      <p className="text-secondary-400 mt-2">Here's an overview of your fitness journey</p>
      <divv className="flex flex-row gap-10 mt-10">
        <WorkoutSummary/>
        <WorkoutSummary/>
      </divv>
    </div>
  );
};

export default Dashbord;
