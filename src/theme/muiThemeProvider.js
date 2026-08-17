"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";
import { storageService } from "@/lib/storage/storageService";

export default function MuiThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
      return initialTheme === "dark" ? darkTheme : lightTheme;
    }
    return lightTheme;
  });

  useEffect(() => {
    // Run legacy storage migration safely
    storageService.migrateLegacyData();

    // Watch for theme toggles dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const updatedTheme = document.documentElement.getAttribute("data-theme");
          setActiveTheme(updatedTheme === "dark" ? darkTheme : lightTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
