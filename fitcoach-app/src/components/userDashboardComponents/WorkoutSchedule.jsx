import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const WorkoutSchedule = ({ workoutPlanInfo, completedDays, onMarkDone }) => {
  const schedule = workoutPlanInfo?.plan?.schedule;
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-backgroundLight-500 dark:bg-backgroundDark-400 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">📆 Workout Schedule</h2>
        <p className="text-gray-600 dark:text-gray-400">
          No workout schedule available. Please generate a plan first.
        </p>
      </div>
    );
  }

  const selectedDay = schedule[selectedDayIndex];
  const isDayCompleted = completedDays.includes(selectedDayIndex);

  const handleMarkDone = () => {
    onMarkDone(selectedDayIndex);
  };

  return (
    <div className="bg-backgroundLight-500 dark:bg-backgroundDark-400 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">📆 Workout Schedule</h2>

      {/* Day Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {schedule?.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDayIndex(idx)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              idx === selectedDayIndex
                ? "bg-primary-400 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Focus */}
      <div className="mb-3 text-gray-600 dark:text-gray-100">
        <span className="font-semibold">{selectedDay?.focus}</span>
      </div>

      {/* Warm-up */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Warm-up
        </h4>
        <ul className="mt-1 text-sm text-gray-600 space-y-1">
          {selectedDay?.warmup.map((w, i) => (
            <li key={i} className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
              <p className="text-gray-600 dark:text-gray-400">
                {w.name} – {w.duration}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Exercises */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Exercises
        </h4>
        <ul className="mt-1 text-sm text-gray-600 space-y-1">
          {selectedDay?.exercises.map((ex, i) => (
            <li
              key={i}
              className="flex flex-col gap-0.5 pl-6 relative before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-green-500 before:rounded-full"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {ex.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {ex.sets} sets × {ex.reps}
              </span>
              <span className="text-xs text-gray-500">{ex.notes}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cooldown */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Cooldown
        </h4>
        <ul className="mt-1 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {selectedDay?.cooldown.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
              {c.name} – {c.duration}
            </li>
          ))}
        </ul>
      </div>

      {/* Mark as Done */}
      <div className="mt-6 text-center">
        <button
          onClick={handleMarkDone}
          className={`px-4 py-2 mt-6 rounded text-sm font-medium transition cursor-pointer ${
            isDayCompleted
              ? "bg-primary-300 dark:bg-gray-500 dark:text-white text-gray-600 cursor-not-allowed"
              : "bg-primary-400 hover:bg-primary-500 text-white"
          }`}
        >
          {isDayCompleted ? "✅ Completed" : "✔️ Mark as Done"}
        </button>
      </div>
    </div>
  );
};

export default WorkoutSchedule;
