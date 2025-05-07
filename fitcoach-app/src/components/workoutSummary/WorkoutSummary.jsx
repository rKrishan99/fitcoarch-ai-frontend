import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";

const WorkoutSummary = () => {
  return (
    <div className="flex flex-col gap-8 bg-white w-1/2 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1>Workout Summary</h1>
        <span>This Week</span>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center justify-center bg-primary-300 rounded-full p-4">
          <FaArrowTrendUp size={28} className="text-primary-500" />
        </div>
        <div>
          <p>You've completed</p>
          <p>4 of 5 workouts</p>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center gap-1">
          <IoTimeOutline size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IoTimeOutline size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IoTimeOutline size={24} className="text-primary-500" />
          <p className="text-[12px]">Total Time</p>
          <p className="font-semibold">3h 45m</p>
        </div>
      </div>
      <div className="border-b-[0.3px] border-secondary-300 bg-[#00000000]"></div>
      <h1>Upcoming Workout</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-primary-300 w-12 h-12 rounded-lg flex justify-center items-center">
            <span>Thu</span>
          </div>
          <div>
            <p className="">Upper Body Focus</p>
            <p className="text-[12px] text-secondary-300">
              45 min. 8 exercises
            </p>
          </div>
        </div>
        <span>View</span>
      </div>
    </div>
  );
};

export default WorkoutSummary;
