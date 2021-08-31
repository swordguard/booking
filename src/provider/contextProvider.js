import { createContext } from "react";

export const ContextProvider = createContext();

export const AppContextProvider = ({ provider, children }) => {
  return (
    <ContextProvider.Provider value={provider}>
      {children}
    </ContextProvider.Provider>
  );
};
