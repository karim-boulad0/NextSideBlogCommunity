"use client";
import { createContext, useState } from "react";
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={`${!isDark ? "dark" : "light"}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
