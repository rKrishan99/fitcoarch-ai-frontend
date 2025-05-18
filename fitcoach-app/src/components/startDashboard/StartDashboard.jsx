import React from "react";
import Stepper from "../stepper/Stepper";

const StartDashboard = (props) => {
  return (
    <div className="overflow-hidden">
      <h1 className="mt-10 text-3xl font-bold">Hi! {props.name}</h1>
      <p className="text-secondary-400 dark:text-secondary-50 mt-2">
        You haven't created a workout plan yet.
      </p>

      <div>
        <Stepper/>
      </div>
    </div>
  );
};

export default StartDashboard;
