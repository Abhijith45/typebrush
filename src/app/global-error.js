"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Critical Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
          color: "#ffffff",
          margin: 0,
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Application Error
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            A critical error occurred while loading TypeBrush.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "#e2b714",
              color: "#000000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
