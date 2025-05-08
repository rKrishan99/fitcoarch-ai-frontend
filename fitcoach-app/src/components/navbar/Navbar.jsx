import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import ThemeToggle from "../themeToggle/ThemeToggle";
import images from "../../assets/images/images";
import { ModalContext } from "../../context/ModalContext";

const Navbar = () => {
  const user = false;

  const { setVisibleLogin } = useContext(ModalContext);

  return (
    <div className="bg-white dark:bg-secondary-600 flex items-center justify-between py-4 px-[30px] sm:px-[40px] md:[80px] lg:px-[120px]">
      <div>
        <div className="flex flex-row gap-1 items-center">
          <img src={images.greenLogoIcon} alt="fitcoach" className="w-[34px]" />
          <img
            src={images.FitCoachAI}
            alt="logo"
            className="w-[100px] md:w-[140px]"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center gap-4">
          <IoMdNotificationsOutline
            size={24}
            className="hover:text-primary-400 cursor-pointer"
          />
          <ThemeToggle />
          {user ? (
            <div className="rounded-full border-1 hover:border-primary-400 cursor-pointer  ">
              <FiUser size={34} className="hover:text-primary-400" />
            </div>
          ) : (
            <button
              onClick={() => setVisibleLogin(true)}
              className="bg-primary-400 hover:bg-primary-500 cursor-pointer px-6 py-1 rounded-full text-white text-center text-md font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </div>
  );
};

export default Navbar;
