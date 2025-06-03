import React from "react";
import Stepper from "../stepper/Stepper";
import { useSelector } from "react-redux";

const StartDashboard = (props) => {
  const { workoutPlan } = useSelector((state) => state.workout);

  return (
    <div className="overflow-hidden pt-10 pb-20 px-[30px] xl:px-[120px]">
      {!workoutPlan ? (
        <>
          <h1 className="mt-10 text-3xl font-bold">Hi! {props.name}</h1>
          <p className=" text-secondary-400 mt-8 dark:text-secondary-50">
            Get a fully customized workout plan in just 60 seconds! Our AI will
            create a science-backed routine tailored to your unique body, goals,
            and fitness level – no guesswork required. Answer a few quick
            questions and you'll be ready to train with confidence.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-10 text-3xl font-bold">
            Your personalized fitness blueprint is ready
          </h1>
          <p className=" text-secondary-400 mt-8 dark:text-secondary-50">
            This plan adapts to your schedule and evolves with your progress.
            Every workout brings you closer to your strongest, healthiest self
          </p>
        </>
      )}

      <div className="mt-24">
        <Stepper />
      </div>
    </div>
  );
};

export default StartDashboard;
