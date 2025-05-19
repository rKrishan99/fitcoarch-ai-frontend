import React, { useContext } from "react";
import { IoPersonAddOutline, IoCheckmarkOutline } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import AddBio from "./AddBio";
import SetGoal from "./SetGoal";
import GeneratePlan from "./GeneratePlan";
import { StepsContext } from "../../context/StepsContext";

const Stepper = () => {
  const { activeStep } = useContext(StepsContext);

  const steps = [
    {
      stepNum: 1,
      name: "Add Personal Info",
      icon: <IoPersonAddOutline size={20} />,
      stepContent: <AddBio />,
    },
    {
      stepNum: 2,
      name: "Set Goals",
      icon: <GoGoal size={20} />,
      stepContent: <SetGoal />,
    },
    {
      stepNum: 3,
      name: "Generate Plan",
      icon: <RiAiGenerate size={20} />,
      stepContent: <GeneratePlan />,
    },
  ];

  const currentStep = steps.find((step) => step.stepNum === activeStep);

  return (
    <div className="w-full mt-10 overflow-hidden">
      <div className="flex justify-center md:items-center md:justify-between mb-8 relative">
        {/* Connecting line */}
        <div className="absolute top-7 left-10 right-10 h-1 bg-gray-200 z-0">
          <div
            className="h-1 bg-primary-400 transition-all duration-300"
            style={{
              width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {steps.map((step) => {
          const stepNumber = step.stepNum;
          const isCompleted = activeStep > stepNumber;
          const isActive = activeStep === stepNumber;

          return (
            <div key={step.stepNum} className="flex flex-col items-center z-10">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : ""
                  }
                  ${
                    isActive
                      ? "bg-white dark:bg-backgroundDark-400 border-primary-400 text-primary-400"
                      : ""
                  }
                  ${
                    !isCompleted && !isActive
                      ? "bg-white dark:bg-backgroundDark-400 border-gray-300 text-gray-400"
                      : ""
                  }
                `}
              >
                {isCompleted ? <IoCheckmarkOutline size={20} /> : step.icon}
              </div>
              <span
                className={`mt-2 text-center w-20 md:w-auto text-sm ${
                  isActive
                    ? "font-medium text-primary-400"
                    : isCompleted
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 dark:bg-backgroundDark-400 mt-16 px-8 rounded-lg py-14">
        {currentStep?.stepContent}
      </div>
    </div>
  );
};

export default Stepper;
