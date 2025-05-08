import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { PiPuzzlePiece } from "react-icons/pi";

const NutritionSummary = () => {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-secondary-400 w-full lg:w-1/2 p-8 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] md:text-xl font-semibold">
          Nutrition Summary
        </h1>
        <span className="text-primary-500 font-semibold text-[13px] md:text-[14px]">
          Today
        </span>
      </div>
      <div className="flex gap-4 items-center mt-1">
        <div className="flex items-center justify-center bg-primary-300 rounded-full p-5">
          <PiPuzzlePiece size={28} className="text-primary-500" />
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] font-light">
            <span className="text-xl font-bold">1840</span> / 2200 kcal
          </p>
          <div className="w-[120px] h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-400 rounded-full"
              style={{ width: "90%" }}
            />
          </div>
        </div>
      </div>
      <h1 className="text-md font-semibold mt-4">Macronutrients</h1>
      <div className="flex flex-col sm:flex-row justify-around gap-4">
        <div className="flex flex-col bg-supportBlue-100 w-full items-center justify-center py-4 rounded-lg gap-1">
          <p className="text-[12px] font-light dark:text-secondary-400">
            Protein
          </p>
          <p className="font-semibold dark:text-secondary-400">35%</p>
        </div>

        <div className="flex flex-col bg-supportGreen-100 w-full items-center justify-center py-4 rounded-lg gap-1">
          <p className="text-[12px] font-light dark:text-secondary-400">
            Carbs
          </p>
          <p className="font-semibold dark:text-secondary-400">45%</p>
        </div>

        <div className="flex flex-col bg-supportYellow-100 w-full items-center justify-center py-4 rounded-lg gap-1">
          <p className="text-[12px] font-light dark:text-secondary-400">Fat</p>
          <p className="font-semibold dark:text-secondary-400">25%</p>
        </div>
      </div>
      <hr className="h-2 border-[#f0f0f0] dark:border-[#333333] " />
      <h1 className="text-md font-semibold">Last Meal</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-supportGreen-200 w-12 h-12 rounded-lg flex justify-center items-center">
            <span className="text-primary-500">Thu</span>
          </div>
          <div>
            <p className="text-md font-semibold">Chicken Salad</p>
            <p className="text-[12px] text-secondary-300 dark:text-secondary-50">
              420 kcal · 35g protein
            </p>
          </div>
        </div>
        <span className="text-primary-500 font-semibold text-[13px] md:text-[14px]">
          Log Meal
        </span>
      </div>
    </div>
  );
};

export default NutritionSummary;
