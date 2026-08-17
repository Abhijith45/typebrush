"use client";

import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10b981",
      contrastText: "#0b1120"
    },
    background: {
      default: "#0b1120",
      paper: "#151e32"
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
      disabled: "#64748b"
    },
    divider: "#1e293b"
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
      color: "#f8fafc"
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#f8fafc"
    },
    h3: {
      fontSize: "1.15rem",
      fontWeight: 600,
      color: "#f8fafc"
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#94a3b8"
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0b1120",
          color: "#94a3b8",
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
          backgroundColor: "#151e32",
          border: "1px solid #1e293b",
          borderRadius: 16,
          boxShadow: "none"
        }
      }
    }
  }
});
