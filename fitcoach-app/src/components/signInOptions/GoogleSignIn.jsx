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

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(REGISTER_USER);

  const { setVisibleSignUp, setVisibleLogin } = useContext(ModalContext);

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
            navigate("/user-dashboard");
            console.log("Logged respons via Google: ",data.login);
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
          navigate("/start-dashboard");
          console.log("Registerd respons via Google: ",data.register);
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
      className="flex flex-row items-center gap-1 bg-red-600 hover:bg-red-700 rounded py-1 px-2 cursor-pointer"
    >
      <FaGoogle className="text-white" />
      <span className="text-white text-[24px] font-extralight mt-[-4px]">
        |
      </span>
      <span className="text-white text-sm">Google</span>
    </div>
  );
};

export default GoogleSignIn;
