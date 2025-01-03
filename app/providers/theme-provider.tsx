"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type ThemeColor = "teal" | "navy" | "slate" | "purple" | "rose" | "amber";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeColor, setThemeColor] = useState<ThemeColor>("teal");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColor = localStorage.getItem("themeColor") as ThemeColor;

    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setThemeColor(savedColor);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const updateThemeColor = (color: ThemeColor) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeColor,
        toggleTheme,
        setThemeColor: updateThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
