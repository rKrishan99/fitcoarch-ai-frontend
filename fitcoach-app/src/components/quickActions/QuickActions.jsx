import React, { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { PiQuestionLight } from "react-icons/pi";
import StartWorkout from "../quickActionsSections/StartWorkout";
import LogMeal from "../quickActionsSections/LogMeal";
import ViewProgress from "../quickActionsSections/ViewProgress";
import GetAIAdvice from "../quickActionsSections/GetAIAdvice";

const actionData = [
  {
    id: "start-workout",
    title: "Start Workout",
    icon: <FiPlus size={22} className="text-primary-400" />,
    bgColor: "bg-primary-100",
    hoverColor: "hover:bg-primary-300",
    activeColor: "bg-primary-300",
    iconbgColor: "bg-primary-300",
  },
  {
    id: "log-meal",
    title: "Log Meal",
    icon: <IoIosArrowRoundForward size={22} className="text-supportBlue-300" />,
    bgColor: "bg-supportBlue-100",
    hoverColor: "hover:bg-supportBlue-200",
    activeColor: "bg-supportBlue-200",
    iconbgColor: "bg-supportBlue-200",
  },

  {
    id: "view-progress",
    title: "View Progress",
    icon: <GoGraph size={22} className="text-supportIndigo-300" />,
    bgColor: "bg-supportIndigo-100",
    hoverColor: "hover:bg-supportIndigo-200",
    activeColor: "bg-supportIndigo-200",
    iconbgColor: "bg-supportIndigo-200",
  },

  {
    id: "get-ai-advice",
    title: "Get AI Advice",
    icon: <PiQuestionLight size={22} className="text-supportYellow-300" />,
    bgColor: "bg-supportYellow-100",
    hoverColor: "hover:bg-supportYellow-200",
    activeColor: "bg-supportYellow-200",
    iconbgColor: "bg-supportYellow-200",
  },
];

const QuickActions = () => {
  const [actionId, setActionId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, actionId]);

  const handleAction = (id) => {
    if (isOpen && (actionId === id) === true) {
      setIsOpen(false);
      setActionId("");

      return;
    }
    setActionId(id);
    setIsOpen(true);
  };

  return (
    <div ref={panelRef} className="mt-10 pt-10">
      <h1 className="text-[18px] md:text-xl font-semibold">Quick Actions</h1>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {actionData.map((item) => (
          <div
            onClick={() => handleAction(item.id)}
            key={item.id}
            className={`p-6 rounded-lg w-full cursor-pointer ${
              actionId === item.id ? item.activeColor : item.bgColor
            }  ${
              item.hoverColor
            } flex flex-col gap-2 items-center justify-center`}
          >
            <div className={`${item.iconbgColor} rounded-full p-4`}>
              {item.icon}
            </div>
            <span className="text-md font-semibold dark:text-secondary-500">{item.title}</span>
          </div>
        ))}
      </div>

      {actionId === "start-workout" ? (
        <StartWorkout />
      ) : actionId === "log-meal" ? (
        <LogMeal />
      ) : actionId === "view-progress" ? (
        <ViewProgress />
      ) : actionId === "get-ai-advice" ? (
        <GetAIAdvice />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default QuickActions;
