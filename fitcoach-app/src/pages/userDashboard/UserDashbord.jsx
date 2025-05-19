import React from "react";
import WorkoutSummary from "../../components/workoutSummary/WorkoutSummary";
import QuickActions from "../../components/quickActions/QuickActions";
import NutritionSummary from "../../components/nutritionSummary/NutritionSummary ";
import UpcomingSchedule from "../../components/upcomingSchedule/UpcomingSchedule";
import StartDashboard from "../../components/startDashboard/StartDashboard";
import { useSelector } from "react-redux";


const UserDashbord = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { workoutPlan } = useSelector((state) => state.workout);

  return (
    <div className="px-[30px] w-full pb-40 sm:px-[40px] md:px-[80px] lg:px-[120px] min-h-screen ">
      {workoutPlan ? (
        <div className="">
          <h1 className="mt-10 text-3xl font-bold">Welcome back, {authInfo?.user?.name}</h1>
          <p className="text-secondary-400 dark:text-secondary-50 mt-2">
            Here's an overview of your fitness journey
          </p>
          <div className="flex flex-col lg:flex-row gap-10 mt-10 ">
            <WorkoutSummary />
            <NutritionSummary />
          </div>
          <QuickActions />
          <UpcomingSchedule />
        </div>
      ) : (
        <StartDashboard name={authInfo?.user?.name} />
      )}
    </div>
  );
};

export default UserDashbord;
