"use client"
import { createContext, useEffect, useState } from "react";

export const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [windowWidth, setWindowSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", setWindowWidth);

      return () => {
        window.removeEventListener("resize", setWindowWidth);
      };
    }
  }, []);

  return (
    <WindowContext.Provider value={{ windowWidth, setWindowSize }}>
      {children}
    </WindowContext.Provider>
  );
};
