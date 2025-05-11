import React, { useContext, useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import ThemeToggle from "../themeToggle/ThemeToggle";
import images from "../../assets/images/images";
import { ModalContext } from "../../context/ModalContext";
import { Link, NavLink } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { TbMenuDeep } from "react-icons/tb";
import { useSelector } from "react-redux";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/abput" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { authInfo } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const { setVisibleLogin, visibleSidebar, setVisibleSidebar } =
    useContext(ModalContext);

  return (
    <div
      className={`bg-white z-50 dark:bg-secondary-600 flex items-center justify-between py-4 px-[30px] sm:px-[40px] md:px-[80px] lg:px-[120px] shadow-2xl overflow-hidden ${
        visibleSidebar ? "fixed top-0 left-0 right-0" : ""
      }`}
    >
      <div>
        <Link to="/">
          <div className="flex flex-row gap-1 items-center cursor-pointer">
            <img
              src={images.greenLogoIcon}
              alt="fitcoach"
              className="w-[34px]"
            />
            <img
              src={images.FitCoachAI}
              alt="logo"
              className="w-[100px] md:w-[140px]"
            />
          </div>
        </Link>
      </div>
      <div>
        <div className="flex flex-row items-center gap-4">
          <div className="hidden sm:flex gap-4">
            {navLinks.map((navlink) => (
              <NavLink
                to={navlink.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-primary-400 px-3 rounded transition-all duration-300"
                    : "text-black dark:text-white text-lg hover:text-navItem-hover"
                }
              >
                {navlink.name}
              </NavLink>
            ))}
            {authInfo != null ? (
              <NavLink
                to="user-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-primary-400 px-3 rounded transition-all duration-300"
                    : "text-black dark:text-white text-lg hover:text-navItem-hover"
                }
              >
                Dashboard
              </NavLink>
            ) : (
              <></>
            )}
          </div>
          <IoMdNotificationsOutline
            size={24}
            className="hover:text-primary-400 cursor-pointer"
          />
          <div className="hidden sm:flex">
            {authInfo != null ? (
              <div
                onClick={() => setVisibleSidebar(!visibleSidebar)}
                className="rounded-full border-1 hover:border-primary-400 cursor-pointer overflow-hidden w-10 h-10"
              >
                {authInfo.profileImage != "" ? (
                  <img
                    src={authInfo?.user?.profileImage}
                    alt="user"
                    className=""
                  />
                ) : (
                  <FiUser size={34} className="hover:text-primary-400" />
                )}
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
          <ThemeToggle />
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-primary-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <TbMenuDeep size={28} /> : <TbMenu2 size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute sm:hidden top-16 p-8 left-0 right-0 z-100 flex flex-col bg-background-500 dark:bg-black border-t-1 border-gray-100 dark:border-gray-900">
          {authInfo != null ? (
            <div className="rounded-full border-1 hover:border-primary-400 cursor-pointer">
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
          <div className="flex flex-col mt-4 w-1/2 gap-4">
            {navLinks.map((navlink) => (
              <NavLink
                to={navlink.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-400 text-lg transition-all duration-300"
                    : "text-black dark:text-white text-lg"
                }
              >
                {navlink.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
