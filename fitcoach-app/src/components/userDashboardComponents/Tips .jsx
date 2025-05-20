import React from "react";

const Tips = ({ workoutPlanInfo }) => {
    const tips = workoutPlanInfo.plan.tips;
  return (
    <div className="bg-backgroundLight-500 dark:bg-backgroundDark-400 p-8 rounded-xl shadow-sm">
      <h2 className="font-semibold text-lg">✅ Tips</h2>
      <ul className="mt-2 list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
        {tips.general.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
