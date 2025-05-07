import React from "react";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline  } from "react-icons/io";
import ThemeToggle from "../themeToggle/ThemeToggle";
import images from "../../assets/images/images";

const Navbar = () => {
  const user = true;
  return (
    <div className="bg-white dark:bg-secondary-600 flex items-center justify-between py-4 md:[80px] px-[110px]">
      <div>
        <div className="flex flex-row gap-1 items-center">
            {

            }
            <img src={images.greenLogoIcon} alt="fitcoach" className="w-[34px]" />
        <img
          src={images.FitCoachAI}
          alt="logo"
          className="w-[140px]"
        />
        </div>
        
      </div>
      <div>
        <div className="flex flex-row items-center gap-4">
          <IoMdNotificationsOutline size={24} />
          <ThemeToggle />
          <div className="rounded-full border-1  ">{user ? <FiUser size={34} /> : <img src="" alt="profile" />}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
