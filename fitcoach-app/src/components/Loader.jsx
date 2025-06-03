import React, { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { SprinnerContext } from "../context/SprinnerContext";

const Loader = () => {
  const { loading } = useContext(SprinnerContext);
  console.log("Loader rendering with loading state:", loading);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-[9999]">
          <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="#0D9488"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
    </>
  );
};

export default Loader;
