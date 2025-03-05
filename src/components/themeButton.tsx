// components/ThemeToggler.tsx
"use client";

import { useTheme } from "./themeProvider";

export default () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggler">
      {`切换${theme === "light" ? "深色" : "浅色"}模式`}{theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};