import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import {
  LOGIN_USER,
  REGISTER_USER,
} from "../../graphql/mutations/authMutation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ModalContext } from "../../context/ModalContext";
import { FetchDataContext } from "../../context/FetchDataContext";
import { setUserDataInfo } from "../../store/slices/userDataSlice";
import { setWorkoutPlan } from "../../store/slices/workoutPlanSlice";

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(REGISTER_USER);

  const { setVisibleSignUp, setVisibleLogin } = useContext(ModalContext);

  const { getBioData, getPlanData } = useContext(FetchDataContext);

  const hanndleGoogleSignin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Get user info from Google
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const { email, name, picture } = userInfo.data;

        // 2. Try to login first (user might already exist)
        try {
          const { data } = await login({
            variables: {
              email,
              password: "google_oauth",
            },
          });

          if (data.login) {
            dispatch(setCredentials(data.login));
            toast.success("Google login successful!");
            setVisibleSignUp(false);
            setVisibleLogin(false);
            console.log("Logged respons via Google: ", data.login);

            // Fetch user bio data with better error handling
            try {
              console.log("Attempting to fetch bio data for userId:", data.login.user.id);
              const bioData = await getBioData(data.login.user.id);
              console.log("Fetched user bio data from context:", bioData);

              if (bioData?.getUserData) {
                dispatch(setUserDataInfo({
                  userData: bioData.getUserData
                }));
                console.log("Bio data stored in Redux successfully");
              } else {
                console.log("No bio data found for user - this is normal for new users");
              }
            } catch (bioError) {
              console.log("Bio data fetch failed (normal for new users):", bioError.message);
              // Don't show error toast for missing bio data as it's normal for new users
            }

            // Fetch workout plan data with better error handling
            try {
              console.log("Attempting to fetch workout plan for userId:", data.login.user.id);
              const planData = await getPlanData(data.login.user.id);
              console.log("Fetched workout plan data from context:", planData);

              if (planData?.getWorkoutPlan?.plan) {
                const jsonString = planData.getWorkoutPlan.plan.replace(
                  /^```json\n|\n```$/g,
                  ""
                );
                const parsedPlan = JSON.parse(jsonString);
                console.log('parsedPlan in g login:', parsedPlan)
                dispatch(setWorkoutPlan({ parsedPlan }));
                console.log("Workout plan stored in Redux successfully");
              } else {
                console.log("No workout plan found for user");
              }
            } catch (planError) {
              console.log("Workout plan fetch failed (normal for users without plans):", planError.message);
            }

            // fetch workout plan data
            const planData = await getPlanData(data.login.user.id);
            console.log("Fetched workout plan data from context:", planData);

            if (planData?.getWorkoutPlan) {
              const jsonString = planData.getWorkoutPlan.plan.replace(
                /^```json\n|\n```$/g,
                ""
              );
              const parsedPlan = JSON.parse(jsonString);
              dispatch(setWorkoutPlan(parsedPlan));
            }

            return;
          }
        } catch (loginError) {
          console.log(
            "User not found, proceeding to registration...",
            loginError
          );
        }

        // 3. If login fails, register the user
        const { data } = await register({
          variables: {
            email,
            name,
            password: "google_oauth",
            profileImage: picture,
            role: "user",
          },
        });

        if (data.register) {
          dispatch(setCredentials(data.register));
          toast.success("Google registration successful!");
          setVisibleSignUp(false);
          setVisibleLogin(false);
          navigate("/user-dashboard");
          console.log("Registerd respons via Google: ", data.register);
        }
      } catch (error) {
        console.error("Google Sign-In failed:", error);
        toast.error("Google Sign-In failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google Sign-In error:", error);
      toast.error("Failed to connect with Google.");
    },
  });

  return (
    <div
      onClick={hanndleGoogleSignin}
      className="flex flex-row items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-md py-2 px-2 cursor-pointer"
    >
      <FaGoogle size={24} className="text-white" />
      <span className="text-white text-md">Google</span>
    </div>
  );
};

export default GoogleSignIn;
