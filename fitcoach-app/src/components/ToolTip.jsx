import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const ToolTip = ({toolTipText, example}) => {
  const [visibleText, setVisibleText] = useState(false);

  return (
    <div>
      <HiOutlineExclamationCircle
        onMouseEnter={() => setVisibleText(true)}
        onMouseLeave={() => setVisibleText(false)}
      />
      {visibleText && (
        <div className="absolute right-0 bg-primary-300 dark:bg-primary-500 p-2 rounded-sm font-light mt-1">
          <p className="text-[12px]">{toolTipText}</p>
          <p className="text-[12px]">{example}</p>
        </div>
      )}
    </div>
  );
};

export default ToolTip;
