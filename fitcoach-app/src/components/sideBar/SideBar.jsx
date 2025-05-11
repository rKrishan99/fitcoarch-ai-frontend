import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { ModalContext } from "../../context/ModalContext";
import { MdClose } from "react-icons/md";
import { BsBoxArrowInRight } from "react-icons/bs";
import { LiaPowerOffSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { authInfo } = useSelector((state) => state.auth);

  const { visibleSidebar, setVisibleSidebar } = useContext(ModalContext);

  const handleLogout = () => {
    dispatch(logout());
    setVisibleSidebar(false);
    navigate("/");
  };

  const handleMyAccount = () => {
    navigate("/user-profile");
    setVisibleSidebar(false);
  };

  return (
    <>
      {/* Overlay that closes sidebar when clicked */}
      {visibleSidebar && (
        <div
          className="fixed inset-0 bg-white/20 dark:bg-black/20 bg-opacity-50 z-40"
          onClick={() => setVisibleSidebar(false)}
        />
      )}
      <div
        className={`
        ${
          visibleSidebar === true
            ? "fixed  top-[74px] right-0 w-auto overflow-hidden py-6 px-4 h-[calc(100vh-74px)] drop-shadow-2xl z-50 flex flex-col bg-[#ffffff] dark:bg-[#000000] transition-all duration-700"
            : "hidden"
        }
     `}
      >
        {/* Tob block */}
        <div className="relative flex felx-row gap-4 mt-4 min-w-[250px]">
          <div className="rounded-full flex items-center justify-center border-2 hover:border-primary-400 cursor-pointer overflow-hidden w-20 h-20">
            {authInfo?.user?.profileImage ? (
              <img
                src={authInfo?.user?.profileImage}
                alt="user"
                className="w-full"
              />
            ) : (
              <FiUser size={54} className="hover:text-primary-400" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-3xl w-full">
              {authInfo?.user?.name.split(" ")[0]}
            </span>
            <div
              onClick={handleMyAccount}
              className="flex flex-row items-center gap-2 hover:text-primary-400 cursor-pointer"
            >
              <span>My Account</span>
              <BsBoxArrowInRight className="mt-1" />
            </div>
          </div>
          <MdClose
            onClick={() => setVisibleSidebar(false)}
            size={24}
            className="absolute right-0 top-[-30px] hover:text-primary-400 cursor-pointer"
          />
        </div>

        <hr className="mt-4 text-[#dedede] dark:text-[#2c2c2c]" />

        <div className="flex justify-center w-full">
          <div
            onClick={handleLogout}
            className="absolute md:w-[200px] bottom-6 flex flex-row items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
          >
            <span className="text-lg">Logout</span>
            <LiaPowerOffSolid size={24} className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
