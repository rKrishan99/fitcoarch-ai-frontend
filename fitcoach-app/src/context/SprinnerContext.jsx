import React, { createContext, useState } from "react";

export const SprinnerContext = createContext();

export const SprinnerContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  return (
    <SprinnerContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </SprinnerContext.Provider>
  );
};
