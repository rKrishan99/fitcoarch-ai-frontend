import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserAccountInfo = () => {
  const dispatch = useDispatch();
  const { authInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(authInfo?.user?.name || "");
  const [passowdDot, setPasswordDot] = useState("........");
  const [otp, setOtp] = useState("");

  const [isChangeName, setChangeName] = useState(false);
  const [showPaswordField, setShowPaswordField] = useState(true);
  const [showOTPRequest, setShowOTPRequest] = useState(false);
  const [showSubmitOTP, setSubmitOTP] = useState(false);
  const [showAddNewPassword, setShowAddNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangePasswordButton, setChangePasswordButton] = useState(false);

  const handleSaveName = () => {
    // Here you would typically dispatch an action to update the name in your backend
    // dispatch(updateUserName(name));
    setChangeName(false);
  };

  const handleSendOTP = () => {};

  const handleSubmitOTP = () => {};

  const handleSaveNewPassword = () => {
    // Here you would typically dispatch an action to update the name in your backend
    // dispatch(updateUserName(name));
    setChangePasswordButton(false);
  };

  return (
    <div className="p-8">
      {/* Name Field */}
      <div className="flex items-center gap-4">
        <label htmlFor="name" className="text-lg">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isChangeName}
          className={`border-1 border-gray-700  dark:border-gray-100 text-lg rounded px-3 py-1 ${
            !isChangeName ? "bg-gray-100 dark:bg-[#151515]" : "bg-white dark:bg-[#070707]"
          }`}
        />

        {!isChangeName ? (
          <span
            onClick={() => setChangeName(true)}
            className="text-blue-500 hover:text-blue-700 text-[10px] border-1 px-2 py-1 rounded-sm cursor-pointer"
          >
            Change
          </span>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSaveName}
              className="bg-primary-400 text-white px-3 py-1 rounded hover:bg-primary-500 cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => {
                setName(authInfo?.user?.name || "");
                setChangeName(false);
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <hr className="mt-8 text-[#c7c7c7]" />
      {/* Change Password */}
      <div className="mt-10">
        {showPaswordField && (
          <div className="flex items-center gap-4">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={passowdDot}
              onChange={(e) => setPasswordDot(e.target.value)}
              readOnly={true}
              className={`border-1 border-gray-700  dark:border-gray-100 text-lg rounded px-3 py-1 ${
                !isChangePasswordButton ? "bg-gray-100 dark:bg-[#151515]" : "bg-white dark:bg-[#070707]"
              }`}
            />

            {!isChangePasswordButton && (
              <span
                onClick={() => {
                  setShowOTPRequest(true);
                  setShowPaswordField(false);
                }}
                className="text-blue-500 hover:text-blue-700 text-[10px] border-1 px-2 py-1 rounded-sm cursor-pointer"
              >
                Change
              </span>
            )}
          </div>
        )}

        {showOTPRequest && (
          <div className="mt-10 flex flex-col ">
            <h1>Click the button for get OTP</h1>
            <div className="flex flex-row gap-4 mt-4 ">
              <button
                onClick={handleSendOTP}
                className="bg-amber-600 px-3 w-[100px] cursor-pointer py-2 rounded-sm text-white"
              >
                Send OTP
              </button>
              <button
                onClick={() => {
                  setShowOTPRequest(false);
                  setShowPaswordField(true);
                }}
                className="bg-gray-500 w-[100px] text-white px-3 py-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showSubmitOTP && (
          <div className="mt-10 flex flex-col">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`border w-[120px] text-lg rounded px-3 py-1 bg-gray-100`}
            />
            <button
              onClick={handleSubmitOTP}
              className="bg-amber-600 w-[100px] px-3 mt-4 cursor-pointer py-2 rounded-sm text-white"
            >
              Submit
            </button>
          </div>
        )}

        {showAddNewPassword && (
          <div className="mt-10 flex flex-col gap-1">
            <label htmlFor="password" className="text-lg">
              Add New Password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              readOnly={true}
              className={`border text-lg rounded px-3 py-1 w-[300px] ${
                !isChangePasswordButton ? "bg-gray-100" : "bg-white"
              }`}
            />
            <label htmlFor="password" className="text-lg mt-6">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              readOnly={true}
              className={`border text-lg rounded px-3 py-1 w-[300px] ${
                !isChangePasswordButton ? "bg-gray-100" : "bg-white"
              }`}
            />
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleSaveNewPassword}
                className="bg-primary-400 text-white px-3 py-1 rounded hover:bg-primary-500 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddNewPassword(false);
                  setShowPaswordField(true);
                }}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountInfo;
