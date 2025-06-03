import React, { useState, useEffect } from "react";
import { IoArrowUndo } from "react-icons/io5";

const TypingIndicator = ({ isTyping }) => {
  console.log("isTyping:", isTyping);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isTyping) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 300);

    return () => clearInterval(interval);
  }, [isTyping]);

  if (!isTyping) return null;

  return (
    <div>
      <div className="relative flex justify-start animate-pulse items-center">
        <div className="flex flex-col justify-center items-center m-3 rounded-xl p-2 w-6 h-4 bg-gray-300">
          <p className="text-[14px] z-50 text-gray-800 mb-2">{dots}</p>
          <div className="flex justify-start"></div>
        </div>

        <IoArrowUndo
          size={22}
          className="absolute text-gray-300 bottom-2 left-3 rotate-90"
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
