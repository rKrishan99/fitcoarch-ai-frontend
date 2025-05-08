import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignUp, setVisibleSignUp] = useState(false);

  const closeAllModals = () => {
    setVisibleLogin(false);
    setVisibleSignUp(false);
  };

  return (
    <ModalContext.Provider
      value={{
        visibleLogin,
        setVisibleLogin,
        visibleSignUp,
        setVisibleSignUp,
        closeAllModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
