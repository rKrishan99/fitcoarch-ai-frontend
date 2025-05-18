import React, { createContext, useState } from "react";

export const StepsContext = createContext();

export const StepsContextProvider = ({ children }) => {
  
  const [activeStep, setActiveStep] = useState(1);

  return (
    <StepsContext.Provider
      value={{
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
