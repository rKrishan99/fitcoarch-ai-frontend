import React from "react";

const Overview = ({ workoutPlanInfo }) => {
  return (
    <div className="p-8 shadow-sm rounded-xl bg-backgroundLight-500 dark:bg-backgroundDark-400">
      <h1 className="text-2xl font-semibold mb-4">📑 Overview</h1>
      <p className="mt-4 text-secondary-400 dark:text-secondary-50">
        {workoutPlanInfo?.plan?.overview}
      </p>
      <div className="flex flex-row gap-2 mt-6 text-gray-500 dark:text-gray-400">
        <p>Created At:</p>
        {new Date(workoutPlanInfo?.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="flex flex-row gap-2 mt-4 text-gray-500 dark:text-gray-400">
        <p>Version</p>
        {workoutPlanInfo?.version}
      </div>
    </div>
  );
};

export default Overview;
