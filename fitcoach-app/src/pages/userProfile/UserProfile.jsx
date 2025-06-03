import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import UserAccountInfo from "../../components/userProfileElement/UserAccountInfo";
import UserBio from "../../components/userProfileElement/UserBio";

const tabLinks = [
  { id: 1, name: "Account Info", path: "account-info" },
  { id: 2, name: "Your Bio", path: "bio" },
  { id: 3, name: "My Plan", path: "my-plan" },
];

const UserProfile = () => {
  const dispatch = useDispatch();
  const { authInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [visibleTab, setVisiblTab] = useState("Account Info");

  const handleLogout = () => {
    dispatch(logoutAuth());
    navigate("/");
  };

  return (
    <div className="h-[calc(100vh-74px)] flex">
      {/* Left Sidebar */}
      <div className="relative flex-1 p-6 bg-[#f0f0f0] dark:bg-backgroundDark-300 overflow-hidden">
        {/* Profile and Name */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative rounded-full">
            <img
              src={authInfo?.user?.profileImage}
              className="rounded-full md:w-40 md:h-40 border-4 border-primary-400"
              alt="profile"
            />
            <div className="absolute bg-primary-400 p-2 rounded-full bottom-4 right-2 cursor-pointer">
              <FiEdit className="text-white" />
            </div>
          </div>

          <span className="font-bold text-3xl mt-4">
            {authInfo?.user?.name}
          </span>
          <hr className="w-full mt-6 text-[#dfdfdf]" />
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col gap-2 mt-4">
          {tabLinks.map((tablink) => (
            <div
              onClick={() => setVisiblTab(tablink.name)}
              className={`${
                tablink.name === visibleTab ? "bg-primary-400 dark:bg-primary-400" : ""
              } hover:bg-primary-400 px-6 py-2 bg-[#f6f6f6] dark:bg-[#2e2e2e] cursor-pointer`}
            >
              {tablink.name}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-8 right-0 flex w-full px-6 justify-center">
          <button
            onClick={handleLogout}
            className="font-medium text-white cursor-pointer w-full bg-red-500 hover:bg-red-500 px-6 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-3 bg-[#e3e3e3] dark:bg-[#1e1e1e]">
        {visibleTab === "Account info" ? (
          <UserAccountInfo />
        ) : visibleTab === "Your Bio" ? (
          <UserBio />
        ) : (
          <UserAccountInfo />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
