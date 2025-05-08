import React from "react";
import { LuBrain } from "react-icons/lu";
import { LuDumbbell } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";



const FeaturesSection = () => {
  return (
    <div className="flex flex-col w-full px-[30px] md:px-[120px] py-20 items-center bg-background-500 dark:bg-secondary-500 overflow-hidden">
      <h1 className="text-4xl font-semibold text-center">
        Why Choose Smart Personal Trainer?
      </h1>
      <div className="mt-16 w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 ">
        <div className="flex flex-row gap-4 ">
          <div className="bg-primary-300 w-16 h-16 flex items-center justify-center rounded-full">
            <LuBrain size={28} className="text-primary-400" />
          </div>
          <div className="w-[200px] md:w-[300px]">
            <h1 className="text-xl font-semibold">AI-Powered Coaching</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Personalized workouts and nutrition plans based on your goals and
              progress.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="bg-primary-300 w-16 h-16 flex items-center justify-center rounded-full">
            <LuDumbbell size={28} className="text-primary-400" />
          </div>
          <div className="w-[200px] md:w-[300px]">
            <h1 className="text-xl font-semibold">Tailored Workouts</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Access curated routines that adapt to your fitness level.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 ">
        <div className="flex flex-row gap-4 ">
          <div className="bg-primary-300 w-16 h-16 flex items-center justify-center rounded-full">
            <IoFastFoodOutline size={28} className="text-primary-400" />
          </div>
          <div className="w-[200px] md:w-[300px]">
            <h1 className="text-xl font-semibold"> Nutrition Tracking</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Log meals, track calories, and follow your macros.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="bg-primary-300 w-16 h-16 flex items-center justify-center rounded-full">
            <GoGraph size={28} className="text-primary-400" />
          </div>
          <div className="w-[200px] md:w-[300px]">
            <h1 className="text-xl font-semibold">Progress Insights </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Stay motivated with weekly stats and achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
