import React, { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saveTheme = localStorage.getItem("theme");
    const systemPretersDark = window.matchMedia(
      "(prefers-color-scheme: dark"
    ).matches;
    if (saveTheme) {
      setTheme(saveTheme);
    } else if (systemPretersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`flex ${
        theme === "light" ? "justify-start" : "justify-end"
      } border-2 bg-gray-200 border-gray-300 rounded-full w-[45px] transition-all duration-300`}
    >
      <div
        className="flex items-center justify-center bg-gray-400 cursor-pointer p-1 rounded-full w-6 h-6"
        onClick={toggleTheme}
      >
        {theme === "light" ? <MdSunny /> : <LuSunMoon />}
      </div>
    </div>
  );
};

export default ThemeToggle;
