import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { PiQuestionLight } from "react-icons/pi";



const actionData = [
  {
    id: 1,
    title: "Start Workout",
    icon: <FiPlus size={22} className="text-primary-400" />,
    bgColor: "bg-primary-100",
    hoverColor: "hover:bg-primary-300",
    iconbgColor: "bg-primary-300",
  },
  {
    id: 2,
    title: "Start Workout",
    icon: <IoIosArrowRoundForward size={22} className="text-supportBlue-300" />,
    bgColor: "bg-supportBlue-100",
    hoverColor: "hover:bg-supportBlue-200",
    iconbgColor: "bg-supportBlue-200",
  },

  {
    id: 3,
    title: "Start Workout",
    icon: <GoGraph size={22} className="text-supportIndigo-300" />,
    bgColor: "bg-supportIndigo-100",
    hoverColor: "hover:bg-supportIndigo-200",
    iconbgColor: "bg-supportIndigo-200",
  },

  {
    id: 4,
    title: "Start Workout",
    icon: <PiQuestionLight size={22}  className="text-supportYellow-300" />,
    bgColor: "bg-supportYellow-100",
    hoverColor: "hover:bg-supportYellow-200",
    iconbgColor: "bg-supportYellow-200",
  },
];

const QuickActions = () => {


   const handleAction = () => {

   }

  return (
    <div className="mt-20">
      <h1 className="text-[18px] md:text-xl font-semibold">Quick Actions</h1>
      <div className="">
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {actionData.map((item) => (
            <div
            onClick={handleAction}
              key={item.id}
              className={`p-6 rounded-lg w-full cursor-pointer ${item.bgColor} ${item.hoverColor} flex flex-col gap-2 items-center justify-center`}
            >
              <div className={`${item.iconbgColor} rounded-full p-4`}>
                {item.icon}
              </div>
              <span className="text-md font-semibold">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
