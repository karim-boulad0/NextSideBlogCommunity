"use client";
import { createContext, useState } from "react";
export const ReRenderContext = createContext();
export const ReRenderProvider = ({ children }) => {
  const [isAction, setIsAction] = useState(0);

  return (
    <ReRenderContext.Provider value={{ isAction, setIsAction }}>
      {children}
    </ReRenderContext.Provider>
  );
};
