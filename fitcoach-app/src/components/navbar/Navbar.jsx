import React, { useContext, useState } from "react";
import { FiUser } from "react-icons/fi";
import ThemeToggle from "../themeToggle/ThemeToggle";
import images from "../../assets/images/images";
import { ModalContext } from "../../context/ModalContext";
import { Link, NavLink } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { TbMenuDeep } from "react-icons/tb";
import { useSelector } from "react-redux";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  // { id: 2, name: "About", path: "" },
  // { id: 3, name: "Contact", path: "" },
];

const Navbar = () => {
  const { authInfo } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const { setVisibleLogin, visibleSidebar, setVisibleSidebar } =
    useContext(ModalContext);

  return (
    <div
      className={`bg-backgroundLight-500 z-50 dark:bg-backgroundDark-400 flex items-center justify-between py-4 px-[30px] sm:px-[40px] md:px-[80px] lg:px-[120px] drop-shadow-lg overflow-hidden ${
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
                key={navlink.id}
                to={navlink.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-primary-400 px-3 rounded transition-all duration-300"
                    : "text-lg hover:text-navItem-hover"
                }
              >
                {navlink.name}
              </NavLink>
            ))}
            <p className="text-lg">About</p>
            <p className="text-lg">Contact</p>
            {authInfo != null ? (
              <NavLink
                to="user-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-primary-400 px-3 rounded transition-all duration-300"
                    : "text-lg hover:text-navItem-hover"
                }
              >
                Dashboard
              </NavLink>
            ) : (
              <></>
            )}
          </div>

          <div className="hidden sm:flex">
            {authInfo !== null ? (
              <div
                onClick={() => setVisibleSidebar(!visibleSidebar)}
                className="flex items-center justify-center rounded-full border-1 hover:border-primary-400 cursor-pointer overflow-hidden w-10 h-10"
              >
                {authInfo?.user?.profileImage !==null ? (
                  <img
                    src={authInfo?.user?.profileImage}
                    alt="user"
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
        <div className="absolute block sm:hidden z-[999] top-16 left-0 right-0 bg-backgroundLight-500 dark:bg-backgroundDark-400 border-t border-gray-100 dark:border-gray-900 shadow-lg">
          <div className="p-8 flex flex-col">
            {authInfo !== null ? (
              <div
                onClick={() => {
                  setVisibleSidebar(!visibleSidebar);
                  setMenuOpen(false);
                }}
                className="rounded-full border-1 hover:border-primary-400 cursor-pointer overflow-hidden w-10 h-10 mb-4"
              >
                {authInfo?.user?.profileImage ? (
                  <img
                    src={authInfo.user.profileImage}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser size={34} className="hover:text-primary-400" />
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setVisibleLogin(true);
                  setMenuOpen(false);
                }}
                className="bg-primary-400 hover:bg-primary-500 cursor-pointer px-6 py-1 rounded-full text-white text-center text-md font-semibold mb-4 w-fit"
              >
                Login
              </button>
            )}
            <div className="flex flex-col gap-4">
              {navLinks.map((navlink) => (
                <NavLink
                  key={navlink.id}
                  to={navlink.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-400 text-lg transition-all duration-300"
                      : "text-lg"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {navlink.name}
                </NavLink>
              ))}
              <p className="text-lg">About</p>
              <p className="text-lg">Contact</p>
              {authInfo != null && (
                <NavLink
                  to="user-dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-400 text-lg transition-all duration-300"
                      : "text-lg"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
