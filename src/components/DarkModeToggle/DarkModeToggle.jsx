"use client";
// DarkModeToggle.js
import { useContext } from "react";
import Styles from "./DarkModeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";

export default function DarkModeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div
      className={`${Styles.container} ${isDark ? Styles.dark : Styles.light}`}
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? (
        <div className={Styles.icons} style={{ color: "black" }}>
          🌙
        </div>
      ) : (
        <div className={Styles.icons}>🌑</div>
      )}
    </div>
  );
}
