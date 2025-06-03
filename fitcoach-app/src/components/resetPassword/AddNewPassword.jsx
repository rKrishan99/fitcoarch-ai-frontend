import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/mutations/authMutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalContext } from "../../context/ModalContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AddNewPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const navigate = useNavigate();

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const { setVisibleLogin } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: { token, newPassword: password },
      });

      if (data?.resetPassword?.success) {
        toast.success(data.resetPassword.message);
        navigate("/");
        setVisibleLogin(true);
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <div className="w-full min-h-screen bg-backgroundLight-400 dark:bg-backgroundDark-300 flex items-center justify-center p-4">
      <div className="bg-white flex flex-col items-center dark:bg-black p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-left mt-4 font-semibold text-lg">
          Add New Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-8">
          <div>
            <label htmlFor="password" className="block mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showFirstPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
                minLength="8"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500  hover:text-gray-700"
                onClick={() => setShowFirstPassword(!showFirstPassword)}
              >
                {showFirstPassword ? (
                  <FaEyeSlash className="h-4 w-4" />
                ) : (
                  <FaEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showSecondPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
                minLength="8"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500  hover:text-gray-700"
                onClick={() => setShowSecondPassword(!showSecondPassword)}
              >
                {showSecondPassword ? (
                  <FaEyeSlash className="h-4 w-4" />
                ) : (
                  <FaEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="bg-primary-400 w-full mt-8 text-white px-4 py-2 rounded hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

          {!token && (
            <p className="text-red-500 text-sm text-center mt-2">
              Invalid reset link. Please request a new password reset.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNewPassword;
