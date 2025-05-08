import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineFire } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";



const WorkoutSummary = () => {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-secondary-400 w-full lg:w-1/2 p-8 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] md:text-xl font-semibold">Workout Summary</h1>
        <span className="text-primary-500 font-semibold text-[13px] md:text-[14px]">This Week</span>
      </div>
      <div className="flex gap-4 items-center mt-1">
        <div className="flex items-center justify-center bg-primary-300 rounded-full p-5">
          <FaArrowTrendUp size={28} className="text-primary-500" />
        </div>
        <div>
          <p className="text-[14px] font-light">You've completed</p>
          <p className="text-xl font-bold">4 of 5 workouts</p>
        </div>
      </div>
      <div className="flex flex-row justify-around mt-4">
        <div className="flex flex-col items-center gap-1">
          <IoTimeOutline size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <AiOutlineFire size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <SlCalender size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>
      </div>
      <hr className="h-2 border-[#f0f0f0] dark:border-[#333333] "/>
      <h1 className="text-md font-semibold">Upcoming Workout</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-primary-300 w-12 h-12 rounded-lg flex justify-center items-center">
            <span className="text-primary-500">Thu</span>
          </div>
          <div>
            <p className="text-md font-semibold">Upper Body Focus</p>
            <p className="text-[12px] text-secondary-300 dark:text-secondary-50">
              45 min. 8 exercises
            </p>
          </div>
        </div>
        <span className="text-primary-500 font-semibold text-[13px] md:text-[14px]">View</span>
      </div>
    </div>
  );
};

export default WorkoutSummary;
