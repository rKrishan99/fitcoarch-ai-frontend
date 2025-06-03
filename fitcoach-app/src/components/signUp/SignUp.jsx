import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import images from "../../assets/images/images";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import GoogleSignIn from "../signInOptions/GoogleSignIn";
import { ModalContext } from "../../context/ModalContext";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations/authMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SprinnerContext } from "../../context/SprinnerContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { store } from "../../store/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // <600px
    sm: 300, // >=600px
    md: 400, // >=900px
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { visibleSignUp, setVisibleSignUp, setVisibleLogin, closeAllModals } =
    useContext(ModalContext);
  const { setLoading } = useContext(SprinnerContext);

  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        variables: {
          name,
          email,
          password,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`,
          role: "user",
        },
      });

      console.log("User is registered:", res.data.register);
      console.log("Data from REGISTER_USER:", data);

      dispatch(setCredentials(res.data.register));

      console.log("Current Redux state:", store.getState().auth);

      setName("");
      setEmail("");
      setPassword("");
      setVisibleSignUp(false);

      toast.success("Successfully SignUp!");

      navigate("/user-dashboard");
    } catch (err) {
      console.error("Signup failed:", err.message);
      console.log("Error form REGISTER_USER::", error);
      toast.error("Fail Signup! Please try again.");
    }
  };

  useEffect(() => {
    setVisibleSignUp(visibleSignUp);
  }, [visibleSignUp]);

  useEffect(() => {
    console.log("Loading state changed:", loading);
    setLoading(loading);
  }, [loading]);

  const handleLoginOpen = () => {
    setVisibleSignUp(false);
    setVisibleLogin(true);
  };

  return (
    <Modal
      keepMounted
      open={visibleSignUp}
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
            {/* scrolle div */}
            <div className=" overflow-y-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  required
                  disabled={loading}
                />
              </div>
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
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
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
                    disabled={loading}
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-primary-400 text-white py-2 px-4 rounded-md hover:bg-primary-500 transition duration-200 cursor-pointer"
            >
              SignUp
            </button>
            <div className="flex flex-row gap-2 items-center justify-start mt-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                Already have an account?{" "}
              </p>
              <p
                onClick={handleLoginOpen}
                disabled={loading}
                className="text-sm hover:text-primary-400 text-gray-700 dark:text-gray-400 cursor-pointer"
              >
                Login
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
          <div className="mt-4 w-full gap-3 items-center">
            <GoogleSignIn />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SignUp;
