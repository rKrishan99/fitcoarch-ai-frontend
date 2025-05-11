import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import images from "../../assets/images/images";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import GoogleSignIn from "../signInOptions/GoogleSignIn";
import FacebookSignIn from "../signInOptions/FacebookSignIn";
import GithubSignIn from "../signInOptions/GithubSignIn";
import { ModalContext } from "../../context/ModalContext";

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
  p: 4,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const Login = () => {
  //   const [open, setOpen] = useState(isOpen);

  const { visibleLogin, setVisibleLogin, setVisibleSignUp, closeAllModals } =
    useContext(ModalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setVisibleLogin(visibleLogin);
  }, [visibleLogin]);

  const handleSignupOpen = () => {
    setVisibleLogin(false);
    setVisibleSignUp(true);
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="block text-sm font-medium text-gray-700 mb-1"
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

          <div className="flex justify-between items-center mt-4">
            {/* <div className="flex flex-row gap-2 items-center">
              <div className="relative inline-block items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  className="appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-primary-400 checked:border-primary-400 focus:outline-none transition-colors cursor-pointer"
                />
              </div>

              <label
                htmlFor="myCheckbox"
                className="text-sm font-medium text-gray-700"
              >
                Accept terms
              </label>
            </div> */}
            <span className="text-sm font-medium text-gray-700 hover:text-primary-500 cursor-pointer">
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
            <p className="text-sm font-semibold">New user? </p>
            <p
              onClick={handleSignupOpen}
              className="text-sm hover:text-primary-400 cursor-pointer"
            >
              Create an Account
            </p>
          </div>
        </form>

        <div className="flex flex-row items-center justify-center mt-10 gap-2 w-full">
          <div className="w-16 h-[0.2px] bg-black" />
          <span className="text-sm">Or Login With</span>
          <div className="w-16 h-[0.2px] bg-black" />
          <hr />
        </div>
        <div className="mt-4 flex justify-around gap-3 items-center">
          <GoogleSignIn />
          <FacebookSignIn />
          <GithubSignIn />
        </div>
      </Box>
    </Modal>
  );
};

export default Login;
