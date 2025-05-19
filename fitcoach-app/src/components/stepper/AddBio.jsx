import React, { useContext, useEffect, useState } from "react";
import ToolTip from "../ToolTip";
import { UserBioFormContext } from "../../context/UserBioFormContext";
import { StepsContext } from "../../context/StepsContext";
import { useSelector } from "react-redux";

const AddBio = () => {
  const { activeStep, setActiveStep } = useContext(StepsContext);

  const [errors, setErrors] = useState({});
  const {
    age,
    setAge,
    gender,
    setGender,
    weight,
    setWeight,
    height,
    setHeight,
    healthLimitation,
    setHealthLimitation,
  } = useContext(UserBioFormContext);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      setActiveStep(3);
    }
  }, [userInfo, setActiveStep]);

  const handleBioConfirm = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (age === "") newErrors.age = true;
    if (gender === "") newErrors.gender = true;
    if (weight === "") newErrors.weight = true;
    if (height === "") newErrors.height = true;
    if (healthLimitation === "") newErrors.healthLimitation = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setActiveStep(activeStep + 1);
    }
  };

  // Helper function to determine input border color
  const getInputBorderClass = (fieldName) => {
    return errors[fieldName] ? "border-red-500" : "border-gray-300";
  };

  return (
    <div className="">
      <form className="">
        <div className="">
          <div className="flex flex-col gap-6 relative md:w-3/5">
            {/* Age */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label htmlFor="age" className="w-32 font-medium">
                Age
              </label>
              <input
                id="age"
                type="number"
                min="12"
                max="100"
                className={`rounded-md px-3 py-2 w-24 border ${getInputBorderClass(
                  "age"
                )}`}
                placeholder="Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              {errors.age && (
                <span className="text-red-500 text-sm">Age is required</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <span className="w-32 font-medium">Gender</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="h-4 w-4"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="h-4 w-4"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Female
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="h-4 w-4"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">Gender is required</span>
              )}
            </div>

            {/* Weight */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label htmlFor="weight" className="w-32 font-medium">
                Weight
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="weight"
                  type="number"
                  min="30"
                  max="300"
                  className={`rounded-md px-3 py-2 w-24 border ${getInputBorderClass(
                    "weight"
                  )}`}
                  placeholder="kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span className="text-gray-500">kg</span>
              </div>
              {errors.weight && (
                <span className="text-red-500 text-sm">Weight is required</span>
              )}
            </div>

            {/* Height */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label htmlFor="height" className="w-32 font-medium">
                Height
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  className={`rounded-md px-3 py-2 w-24 border ${getInputBorderClass(
                    "height"
                  )}`}
                  placeholder="cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <span className="text-gray-500">cm</span>
              </div>
              {errors.height && (
                <span className="text-red-500 text-sm">Height is required</span>
              )}
            </div>

            {/* Health Limitations */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <label
                htmlFor="health-limitations"
                className="md:w-40 font-medium"
              >
                Health Limitations
              </label>
              <div className="flex flex-row w-full gap-2">
                <textarea
                  id="health-limitations"
                  className={`border rounded-md px-3 py-2 w-full ${getInputBorderClass(
                    "healthLimitation"
                  )}`}
                  rows={3}
                  placeholder="Any injuries or conditions we should know about?"
                  value={healthLimitation}
                  onChange={(e) => setHealthLimitation(e.target.value)}
                  required
                />
                <ToolTip
                  toolTipText={
                    "This helps us customize safe exercises for you."
                  }
                  example={"Example: 'Avoid heavy squats due to knee injury'"}
                />
              </div>
              {errors.healthLimitation && (
                <span className="text-red-500 text-sm">
                  Health limitations are required
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end mt-12">
            <button
              onClick={handleBioConfirm}
              className="bg-primary-400 hover:bg-primary-500 px-4 py-1 rounded-sm text-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBio;
