import React from "react";
import { FaUser } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";
import { AiFillSignal } from "react-icons/ai";

const HowItWorksSection = () => {
  return (
    <div className="overflow-hidden bg-background-400 dark:bg-backgroundDark-400 px-[30px] xl:px-[120px] py-20">
      <h1 className="text-4xl font-semibold text-center">
        Your Fitness Journey in 3 Simple Steps
      </h1>
      <div className="flex flex-col md:flex-row mt-12 justify-around gap-6 md:px-20">
        <div className="bg-background-500 dark:bg-backgroundDark-300 rounded-lg p-8 flex flex-col items-center gap-4">
          <div className="bg-primary-300 dark:bg-primary-500 w-16 h-16 flex items-center justify-center rounded-full">
            <FaUser
              size={28}
              className="text-primary-400 dark:text-primary-300"
            />
          </div>
          <h1 className="text-lg font-semibold">Create an Account</h1>
          <p className="text-gray-700 text-center dark:text-gray-300">
            Sign up and let us understand your goals and lifestyle.
          </p>
        </div>
        <div className="bg-background-500 dark:bg-backgroundDark-300 rounded-lg p-8 flex flex-col items-center gap-4">
          <div className="bg-primary-300 dark:bg-primary-500 w-16 h-16 flex items-center justify-center rounded-full">
            <PiNotepadFill
              size={28}
              className="text-primary-400 dark:text-primary-300"
            />
          </div>
          <h1 className="text-lg font-semibold">Get Your Plan</h1>
          <p className="text-gray-700 text-center dark:text-gray-300">
            Receive personalized workout + nutrition plans instantly.
          </p>
        </div>
        <div className="bg-background-500 dark:bg-backgroundDark-300 rounded-lg p-8 flex flex-col items-center gap-4">
          <div className="bg-primary-300 dark:bg-primary-500 w-16 h-16 flex items-center justify-center rounded-full">
            <AiFillSignal
              size={28}
              className="text-primary-400 dark:text-primary-300"
            />
          </div>
          <h1 className="text-lg font-semibold">Track & Improve</h1>
          <p className="text-gray-700 text-center dark:text-gray-300">
            Log workouts, meals, and get real-time insights and advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
