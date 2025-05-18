import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignUp, setVisibleSignUp] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [visibleRequestResetPassword, setVisiblleRequestResetPassword] =
    useState(false);
  const [visibleAddNewPassword, setAddNewPassword] = useState(false);
  const [visibleAskYesOrNot, setVisibleAskYesOrNot] = useState(false);

  const closeAllModals = () => {
    setVisibleLogin(false);
    setVisibleSignUp(false);
    setVisiblleRequestResetPassword(false);
  };

  return (
    <ModalContext.Provider
      value={{
        visibleLogin,
        setVisibleLogin,
        visibleSignUp,
        setVisibleSignUp,
        closeAllModals,
        visibleSidebar,
        setVisibleSidebar,
        visibleRequestResetPassword,
        setVisiblleRequestResetPassword,
        visibleAddNewPassword,
        setAddNewPassword,
        visibleAskYesOrNot,
        setVisibleAskYesOrNot,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
