import React, { useState, useEffect } from "react";
import StartDashboard from "../../components/startDashboard/StartDashboard";
import { useSelector } from "react-redux";
import Overview from "../../components/userDashboardComponents/Overview";
import WorkoutSchedule from "../../components/userDashboardComponents/WorkoutSchedule";
import ProgressTracker from "../../components/userDashboardComponents/ProgressTracker";
import Tips from "../../components/userDashboardComponents/Tips ";
import AdditionalNotes from "../../components/userDashboardComponents/AdditionalNotes";

const LOCAL_STORAGE_KEY = "completedWorkoutDays";

const UserDashbord = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { workoutPlan } = useSelector((state) => state.workout);

  const workoutPlanInfo = workoutPlan.workout;
  const totalDays = workoutPlanInfo.plan.schedule.length;

  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load completed days from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedDays));
  }, [completedDays]);

  const handleMarkDayDone = (dayIndex) => {
    if (completedDays.includes(dayIndex)) {
      setCompletedDays(completedDays.filter((i) => i !== dayIndex));
    } else {
      setCompletedDays([...completedDays, dayIndex]);
    }
  };

  const progress = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="px-[30px] w-full pb-40 sm:px-[40px] md:px-[80px] lg:px-[120px] min-h-screen ">
      {workoutPlan ? (
        <div className="flex flex-col">
          <h1 className="mt-10 text-3xl font-bold">💪 Your Workout Plan</h1>
          <p className="text-secondary-400 dark:text-secondary-50 mt-2">
            Here's an overview of your fitness journey
          </p>
          <hr className="mt-8 border-gray-400 dark:border-gray-500" />
          {/* Dashboard Components */}
          <div className="mt-10 w-full flex flex-col md:flex-row gap-10">
            <div className="flex-3 flex flex-col gap-10">
              <Overview workoutPlanInfo={workoutPlanInfo} />
              <WorkoutSchedule
                workoutPlanInfo={workoutPlanInfo}
                completedDays={completedDays}
                onMarkDone={handleMarkDayDone}
              />
            </div>
            <div className="flex-2 flex flex-col gap-10">
              <ProgressTracker progress={progress} />
              <Tips workoutPlanInfo={workoutPlanInfo} />
              <AdditionalNotes workoutPlanInfo={workoutPlanInfo} />
            </div>
          </div>
        </div>
      ) : (
        <StartDashboard name={authInfo?.user?.name} />
      )}
    </div>
  );
};

export default UserDashbord;
