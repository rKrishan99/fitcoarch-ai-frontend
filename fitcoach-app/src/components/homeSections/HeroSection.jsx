import React from "react";
import images from "../../assets/images/images";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col justify-center w-full items-center bg-gradient-to-r from-[#CCFBF1] via-[#FAF2C9] to-[#BFD4F9] dark:from-[#303b39] dark:via-[#2c2b23] dark:to-[#2e333b] h-auto py-40 overflow-hidden">
      <div className="flex flex-col justify-center w-full items-center px-[30px] md:px-[120px]">
        <h1 className="text-3xl z-50 md:text-5xl: lg:text-6xl xl:w-[1100px] font-bold text-center">
          Transform Your Fitness Journey with Smart Guidance
        </h1>
        <p className="mt-5 z-50 md:mt-10 text-md text-gray-800 dark:text-gray-300 text-center">
          AI-powered personal training. Workout plans, nutrition tracking, and
          expert advice — all in one app.
        </p>
        <div className="mt-10 md:mt-20 flex flex-col md:flex-row gap-6 ">
          <Link to='/user-dashboard'>
            <button className="bg-primary-400 z-50 hover:bg-primary-500 text-white px-10 py-4 rounded-lg cursor-pointer font-bold">
              Get Started
            </button>
          </Link>
          <button className="border-2 z-50 border-primary-400 hover:border-primary-500 text-primary-400 hover:text-primary-500 px-15 py-4 rounded-lg cursor-pointer font-bold">
            Login
          </button>
        </div>
      </div>
      <img
        className="absolute w-[150px] md:w-[250px] xl:w-[400px] right-8 bottom-0"
        src={images.heroImg1}
        alt="workout"
      />
      <img
        className="absolute w-[150px] md:w-[250px] xl:w-[350px] left-4 bottom-0"
        src={images.heroImg2}
        alt="banner"
      />
    </div>
  );
};

export default HeroSection;
