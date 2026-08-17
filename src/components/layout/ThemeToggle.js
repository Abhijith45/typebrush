"use client";

import { useState, useEffect } from "react";
import { storageService } from "@/lib/storage/storageService";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Safely check theme on mount via storageService
    const savedTheme = storageService.getTheme();
    setTimeout(() => {
      setTheme(savedTheme);
    }, 0);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    storageService.saveTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      style={{
        background: "none",
        border: "none",
        color: "var(--main-color)",
        fontSize: "1.2rem",
        cursor: "pointer",
        padding: "0.5rem",
        borderRadius: "var(--border-radius)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease"
      }}
      className="theme-toggle-btn"
    >
      {theme === "light" ? (
        <span className="material-icons-outlined">dark_mode</span>
      ) : (
        <span className="material-icons-outlined">light_mode</span>
      )}
    </button>
  );
}
