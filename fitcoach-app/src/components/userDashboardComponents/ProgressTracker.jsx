import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const ProgressTracker = ({ progress }) => {
  return (
    <div className="bg-backgroundLight-500 dark:bg-backgroundDark-400 p-6 pb-8 rounded-xl shadow-sm text-center space-y-2">
      <h2 className="font-semibold text-xl">Progress Tracker</h2>
      <div className="relative mt-6 w-[250px] h-[250px] flex justify-center items-center mx-auto">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={4}
          styles={{
            path: {
              stroke: `rgba(30, 184, 166, ${progress / 100})`,
              strokeLinecap: "butt",
              transition: "stroke-dashoffset 0.5s ease 0s",
              transform: "rotate(0.5turn)",
              transformOrigin: "center center",
            },
            trail: {
              stroke: "#d6d6d6",
              strokeLinecap: "butt",
              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
            text: {
              fill: "color(a98-rgb 0.41 0.72 0.64 / 0)",
              fontSize: "0px",
            },
            background: {
              fill: "#14B8A6",
            },
          }}
        />
         <div className="absolute inset-0 text-primary-400 text-[40px] flex items-center justify-center font-bold text-lg">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
