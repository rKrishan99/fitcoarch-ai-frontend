import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import images from "../../assets/images/images";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import GoogleSignIn from "../signInOptions/GoogleSignIn";
import { ModalContext } from "../../context/ModalContext";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations/authMutation";
import { toast } from "react-toastify";
import { SprinnerContext } from "../../context/SprinnerContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { store } from "../../store/store";
import { FetchDataContext } from "../../context/FetchDataContext";
import { setUserDataInfo } from "../../store/slices/userDataSlice";
import { setWorkoutPlan } from "../../store/slices/workoutPlanSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: 300,
    md: 400,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const Login = () => {
  const dispatch = useDispatch();

  const {
    visibleLogin,
    setVisibleLogin,
    setVisibleSignUp,
    closeAllModals,
    setVisibleAskYesOrNot,
  } = useContext(ModalContext);

  const { setLoading } = useContext(SprinnerContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const { getBioData, getPlanData } = useContext(FetchDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        variables: {
          email,
          password,
        },
      });

      dispatch(
        setCredentials({
          token: res.data.login.token,
          user: res.data.login.user,
        })
      );

      console.log("Current Redux state:", store.getState().auth);

      setEmail("");
      setPassword("");
      setVisibleLogin(false);

      toast.success("Successfully Login!");

      // fetch user bio data
      const bioData = await getBioData(res.data.login.user.id);
      console.log("Fetched user bio data from context:", bioData);

      if (bioData?.getUserData) {
        dispatch(setUserDataInfo(bioData.getUserData));
      }

      // fetch workout plan data
      const planData = await getPlanData(res.data.login.user.id);
      console.log("Fetched workout plan data from context:", planData);

      if (planData?.getWorkoutPlan) {
        const jsonString = planData.getWorkoutPlan.plan.replace(
          /^```json\n|\n```$/g,
          ""
        );
        const parsedPlan = JSON.parse(jsonString);
        console.log("parsedPlan in g login:", parsedPlan);
        dispatch(setWorkoutPlan(parsedPlan));
      }

      return;
    } catch (err) {
      console.error("Login failed:", err.message);
      console.log("Error form LOGIN_USER:", error);
      toast.error("Fail Login! Please try again.");
    }
  };

  useEffect(() => {
    setVisibleLogin(visibleLogin);
  }, [visibleLogin]);

  useEffect(() => {
    console.log("Loading state changed:", loading);
    setLoading(loading);
  }, [loading]);

  const handleSignupOpen = () => {
    setVisibleLogin(false);
    setVisibleSignUp(true);
  };

  const handleForgetPassword = () => {
    setVisibleLogin(false);
    setVisibleAskYesOrNot(true);
  };
  return (
    <Modal
      keepMounted
      open={visibleLogin}
      onClose={closeAllModals}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <div className="bg-white dark:bg-black w-full rounded-[16px] flex flex-col items-center justify-center p-5">
          <div>
            <img
              className="w-[160px]"
              src={images.fitcoachModalLogo}
              alt="logo"
            />
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 pr-10" // Added pr-10 for icon spacing
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500  hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span
                onClick={handleForgetPassword}
                className="text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-primary-500 cursor-pointer"
              >
                Forget Password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-10 bg-primary-400 text-white py-2 px-4 rounded-md hover:bg-primary-500 transition duration-200 cursor-pointer"
            >
              Login
            </button>

            <div className="flex flex-row gap-2 items-center justify-start mt-3">
              <p className="text-sm text-gray-700 dark:text-gray-400 font-semibold">
                New user?{" "}
              </p>
              <p
                onClick={handleSignupOpen}
                className="text-sm text-gray-700 dark:text-gray-400 hover:text-primary-400 cursor-pointer"
              >
                Create an Account
              </p>
            </div>
          </form>

          <div className="flex flex-row items-center justify-center mt-10 gap-2 w-full">
            <div className="w-16 h-[0.2px] bg-black" />
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Or Login With
            </span>
            <div className="w-16 h-[0.2px] bg-black" />
            <hr />
          </div>
          <div className="mt-4 w-full gap-3">
            <GoogleSignIn />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Login;
