"use client";
// DarkModeToggle.js
import { useContext } from "react";
import Styles from "./DarkModeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";

export default function DropDarkModeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div
      className={`${Styles.container} ${isDark ? Styles.dark : Styles.light}`}
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? (
        <div className={Styles.icon} style={{ color: "black" }}>
          🌙 <span style={{ fontSize: "17px" }}>Light</span>
        </div>
      ) : (
        <div className={Styles.icon}>
          🌑 <span style={{ fontSize: "17px" }}> Dark</span>
        </div>
      )}
    </div>
  );
}
