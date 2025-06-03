import React, { useState, useEffect, useContext } from "react";
import StartDashboard from "../../components/startDashboard/StartDashboard";
import { useSelector } from "react-redux";
import Overview from "../../components/userDashboardComponents/Overview";
import WorkoutSchedule from "../../components/userDashboardComponents/WorkoutSchedule";
import ProgressTracker from "../../components/userDashboardComponents/ProgressTracker";
import Tips from "../../components/userDashboardComponents/Tips ";
import AdditionalNotes from "../../components/userDashboardComponents/AdditionalNotes";
import { FetchDataContext } from "../../context/FetchDataContext";
import { RotatingLines } from "react-loader-spinner";

const LOCAL_STORAGE_KEY = "completedWorkoutDays";

const UserDashbord = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { workoutPlan } = useSelector((state) => state.workout);

  const workoutPlanInfo = workoutPlan;
  const totalDays = workoutPlanInfo?.plan?.schedule?.length || 0;

  const [completedDays, setCompletedDays] = useState([]);

  const { userBioLoading, workoutPlanLoading } = useContext(FetchDataContext);

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

  // Save to localStorage when days are updated
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

  const progress = Math.round((completedDays.length / totalDays) * 100) || 0;

  return (
    <>
      {userBioLoading || workoutPlanLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="#0D9488"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div className="px-[30px] w-full pb-40 sm:px-[40px] md:px-[80px] lg:px-[120px] min-h-screen">
          {workoutPlan ? (
            <div className="flex flex-col">
              <h1 className="mt-16 text-3xl font-bold">💪 Your Workout Plan</h1>
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
            <StartDashboard name={authInfo?.auth?.name} />
          )}
        </div>
      )}
    </>
  );
};

export default UserDashbord;
