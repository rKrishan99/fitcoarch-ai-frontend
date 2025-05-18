import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa6";
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

const GithubSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(REGISTER_USER);

  const { setVisibleSignUp, setVisibleLogin } = useContext(ModalContext);

  const handleGithubLogin = async () => {
    try {
      // Open GitHub OAuth window
      const width = 600;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const popup = window.open(
        `https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_GITHUB_CLIENT_ID
        }&scope=user:email`,
        "githubAuth",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      // Listen for message from popup
      window.addEventListener("message", async (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data.type === "github-auth-success") {
          const { code } = event.data;

          // Exchange code for access token (via your backend)
          const { data: tokenData } = await axios.post(
            `${import.meta.env.VITE_API_URL}/github-auth`,
            { code }
          );

          // Get user info from GitHub
          const { data: userData } = await axios.get(
            "https://api.github.com/user",
            {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            }
          );

          // Get email (needs separate request)
          const { data: emails } = await axios.get(
            "https://api.github.com/user/emails",
            {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            }
          );

          const primaryEmail =
            emails.find((email) => email.primary)?.email || "";
          const name = userData.name || userData.login;
          const profileImage = userData.avatar_url || "";

          // Try login first
          try {
            const { data } = await login({
              variables: {
                email: primaryEmail,
                password: "github_oauth",
              },
            });

            if (data?.login) {
              dispatch(setCredentials(data.login));
              toast.success("Logged in with GitHub!");
              navigate("/user-dashboard");
              setVisibleSignUp(false);
              setVisibleLogin(false);
              return;
            }
          } catch (loginError) {
            console.log(
              "User not found, proceeding to registration...",
              loginError
            );
          }

          // Register if login fails
          const { data: registerData } = await register({
            variables: {
              email: primaryEmail,
              name,
              password: "github_oauth",
              profileImage,
              role: "user",
            },
          });

          if (registerData?.register) {
            dispatch(setCredentials(registerData.register));
            toast.success("Account created with GitHub!");
            navigate("/user-dashboard");
            setVisibleSignUp(false);
            setVisibleLogin(false);
          }
        }
      });
    } catch (error) {
      console.error("GitHub Sign-In failed:", error);
      toast.error("GitHub Sign-In failed. Please try again.");
    }
  };

  return (
    <div
      onClick={handleGithubLogin}
      className="flex flex-row items-center gap-1 bg-black rounded py-1 px-2 cursor-pointer"
    >
      <FaGithub className="text-white" />
      <span className="text-white text-[24px] font-extralight mt-[-4px]">
        |
      </span>
      <span className="text-white text-sm">Github</span>
    </div>
  );
};

export default GithubSignIn;
