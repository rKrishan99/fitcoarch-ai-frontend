import React, { useContext, useEffect, useState } from "react";
import { UserDataFormContext } from "../../context/UserDataFormContext";
import { toast } from "react-toastify";
import { SUBMIT_USER_DATA } from "../../graphql/mutations/userDataMutation";
import { useMutation } from "@apollo/client";
import { StepsContext } from "../../context/StepsContext";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataInfo } from "../../store/slices/userDataSlice";
import { SprinnerContext } from "../../context/SprinnerContext";

const SetGoal = () => {
  const { activeStep, setActiveStep } = useContext(StepsContext);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // Get userId from Redux store
  const { authInfo } = useSelector((state) => state.auth);

  const {
    age,
    gender,
    weight,
    height,
    healthLimitation,
    fitnessGoal,
    setFitnessGoal,
    activityLevel,
    setActivityLevel,
    workoutDays,
    setWorkoutDays,
    experienceLevel,
    setExperienceLevel,
  } = useContext(UserDataFormContext);
  const { setLoading } = useContext(SprinnerContext);

  const [submitUserData, { loading }] = useMutation(SUBMIT_USER_DATA);

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (fitnessGoal === "") newErrors.fitnessGoal = true;
    if (activityLevel === "") newErrors.activityLevel = true;
    if (workoutDays === "") newErrors.workoutDays = true;
    if (experienceLevel === "") newErrors.experienceLevel = true;

    setErrors(newErrors);

    console.log("Get AuthInfo from store:", authInfo);
    const userId = authInfo?.user?.id;
    console.log("Get userId from store:", userId);

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log({
          userId,
          age: parseInt(age),
          gender,
          weight: parseFloat(weight),
          height: parseFloat(height),
          healthLimitation,
          fitnessGoal,
          activityLevel,
          workoutDays,
          experienceLevel,
        });
        const res = await submitUserData({
          variables: {
            userId,
            age: parseInt(age),
            gender,
            weight: parseFloat(weight),
            height: parseFloat(height),
            healthLimitation,
            fitnessGoal,
            activityLevel,
            workoutDays,
            experienceLevel,
          },
        });

        console.log("res", res);

        dispatch(
          setUserDataInfo({
            userData: res.data.createUserData,
          })
        );

        setActiveStep(activeStep + 1);
        toast.success("Bio submitted successfully!");
        setLoading(false);

      } catch (error) {
        console.error("Bio Submission failed:", error);
        toast.error(`Submission failed: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    console.log("Loading state changed:", loading);
    setLoading(loading);
  }, [loading]);

  const getInputBorderClass = (fieldName) => {
    return errors[fieldName] ? "border-red-500" : "border-gray-300";
  };

  return (
    <div className="">
      <form className="flex flex-col gap-6">
        <div className="w-full">
          <div className="flex flex-col md:w-3/5 gap-6 relative">
            {/* Fitness Goal */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label className="block md:w-60 mb-2 text-sm font-medium">
                Fitness Goal
              </label>
              <div className="w-full">
                <select
                  className={`w-full p-2.5 bg-white dark:bg-black border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${getInputBorderClass(
                    "fitnessGoal"
                  )}`}
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                >
                  <option value="">Select your goal</option>
                  <option value="lose_fat">Lose Fat</option>
                  <option value="build_muscle">Build Muscle</option>
                  <option value="maintain">Maintain</option>
                </select>
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    Your goal is required
                  </span>
                )}
              </div>
            </div>

            {/*  Activity Level */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label className="block md:w-60 mb-2 text-sm font-medium ">
                Activity Level
              </label>
              <div className="w-full">
                <select
                  className={`w-full p-2.5 bg-white dark:bg-black border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${getInputBorderClass(
                    "activityLevel"
                  )}`}
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="">Select your activity level</option>
                  <option value="sedentary">Sedentary (mostly sitting)</option>
                  <option value="active">
                    Active (light activity 1-3x/week)
                  </option>
                  <option value="very_active">
                    Very Active (intense exercise 4+ days)
                  </option>
                </select>
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    Activity Level is required
                  </span>
                )}
              </div>
            </div>

            {/* Workout Days Per Week */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label className="block md:w-60 mb-2 text-sm font-medium ">
                Workout Days Per Week
              </label>
              <div className="w-full">
                <select
                  className={`w-full p-2.5 bg-white dark:bg-black border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${getInputBorderClass(
                    "workoutDays"
                  )}`}
                  value={workoutDays}
                  onChange={(e) => setWorkoutDays(e.target.value)}
                >
                  <option value="">Select days</option>
                  <option value="2-3">2-3 days</option>
                  <option value="4-5">4-5 days</option>
                  <option value="6-7">6-7 days</option>
                </select>
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    Workout Days is required
                  </span>
                )}
              </div>
            </div>

            {/* Experience Level */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label className="block md:w-60 mb-2 text-sm font-medium ">
                Experience Level
              </label>
              <div className="w-full">
                <select
                  className={`w-full p-2.5 bg-white dark:bg-black border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${getInputBorderClass(
                    "experienceLevel"
                  )}`}
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (new to workouts)</option>
                  <option value="intermediate">
                    Intermediate (6+ months training)
                  </option>
                  <option value="advanced">
                    Advanced (years of experience)
                  </option>
                </select>
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    Level is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse gap-4 md:flex-row justify-between mt-12">
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className="bg-primary-400 hover:bg-primary-500 px-4 py-1 rounded-sm text-white cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="bg-primary-400 hover:bg-primary-500 px-4 py-1 rounded-sm text-white cursor-pointer"
            >
              Save & Continueue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetGoal;
