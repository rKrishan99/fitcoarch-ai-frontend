import React from "react";

const AdditionalNotes = ({ workoutPlanInfo }) => {
  const notes = workoutPlanInfo.plan.notes;

  return (
    <div className="bg-backgroundLight-500 dark:bg-backgroundDark-400 p-8 rounded-xl shadow-sm">
      <h2 className="font-semibold text-lg">📝 Additional Notes</h2>
      <ul className="mt-2 list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
        {notes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalNotes;
