"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#059669",
      contrastText: "#ffffff"
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      disabled: "#64748b"
    },
    divider: "#e2e8f0"
  },
  typography: {
    fontFamily: [
      "var(--font-sans)",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(","),
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
      color: "#0f172a"
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#0f172a"
    },
    h3: {
      fontSize: "1.15rem",
      fontWeight: 600,
      color: "#0f172a"
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#475569"
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8fafc",
          color: "#475569",
          transition: "background-color 0.3s ease, color 0.3s ease"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 9999,
          padding: "0.8rem 2rem",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)"
        }
      }
    }
  }
});
