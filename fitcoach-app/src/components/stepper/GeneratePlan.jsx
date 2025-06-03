import React, { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { GENERATE_PLAN } from "../../graphql/mutations/workoutMutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { setWorkoutPlan } from "../../store/slices/workoutPlanSlice";
import WorkoutPlan from "./WorkoutPlan";

const GeneratePlan = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const [generatePlan, { loading }] = useMutation(GENERATE_PLAN);
  const dispatch = useDispatch();
  const { workoutPlan } = useSelector((state) => state.workout);
  const [plan, setPlan] = useState(null);

  const handleGenerate = async () => {
    const userId = authInfo?.user?.id;

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const { data } = await generatePlan({ variables: { userId } });
      if (data?.generateWorkoutPlan?.plan) {
        console.log("Workout data:", data);
        // Clean the response data before storing
        const jsonString = data.generateWorkoutPlan.plan.replace(
          /^```json\n|\n```$/g,
          ""
        );
        
        const parsedPlan = JSON.parse(jsonString);
        console.log('parsedPlan in generated:', parsedPlan)
        setPlan(parsedPlan);
        console.log("Workout Plan:", plan);
        console.log("Workout parsedPlan:", parsedPlan);
        console.log("CreatedAt value:", parsedPlan?.createdAt); 

        toast.success("Workout plan generated successfully!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Generate plan error:", err);
      toast.error(`Submission failed: ${err.message}`);
    }
  };

  const handleFinish = () => {
    dispatch(setWorkoutPlan( plan ));
    console.log("workoutPlan:", workoutPlan);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-90 ">
      {!plan && !loading && (
        <button
          onClick={handleGenerate}
          className="bg-primary-400 hover:bg-primary-500 px-6 py-3 rounded-lg cursor-pointer"
        >
          Generate Workout Plan
        </button>
      )}

      {loading && (
        <div className="mx-auto w-full max-w-sm flex items-center justify-center rounded-md">
          <div className="flex animate-pulse space-x-4">
            <RiAiGenerate className="text-primary-400" size={64} />
          </div>
        </div>
      )}

      {plan && !loading && (
        <div className="flex flex-col w-full">
          <WorkoutPlan plan={plan} />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:px-8  mt-10">
            <button
              onClick={handleGenerate}
              className="bg-primary-400 hover:bg-primary-500 px-4 py-1 rounded-sm text-white cursor-pointer"
            >
              Regenerate
            </button>
            <button
              onClick={handleFinish}
              className="bg-primary-400 hover:bg-primary-500 px-4 py-1 rounded-sm text-white cursor-pointer"
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePlan;
