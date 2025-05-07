import React from "react";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline  } from "react-icons/io";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  const user = true;
  return (
    <div className="bg-white flex justify-between py-4 md:[80px] px-[110px]">
      <div>
        <img
          src="https://www.fitcoachapp.com/static/media/logo.0b4f1c2a.png"
          alt="logo"
          className="w-20 h-20"
        />
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
