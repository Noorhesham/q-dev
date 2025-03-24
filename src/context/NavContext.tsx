import React, { createContext, useContext, useState } from "react";

interface NavContextType {
  title: string;
  setTitle: (title: string) => void;
  setCompaniesLength: (length: number) => void;
  companiesLength: number;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("Main Page");
  const [companiesLength, setCompaniesLength] = useState(0);
  return (
    <NavContext.Provider value={{ title, setTitle, setCompaniesLength, companiesLength }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
