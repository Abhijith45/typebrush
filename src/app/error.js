"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log client error to monitoring / console
    console.error("TypeBrush runtime error:", error);
  }, [error]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1.25rem",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          color: "#ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "0.5rem",
        }}
      >
        <span className="material-icons-outlined" style={{ fontSize: "32px" }}>
          error_outline
        </span>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
        Something went wrong!
      </h1>

      <p
        style={{
          maxWidth: "480px",
          opacity: 0.8,
          fontSize: "1rem",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        An unexpected error interrupted your typing session. Don&apos;t worry, you can retry or head back home.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <button
          onClick={() => reset()}
          className="cta-button"
          style={{
            cursor: "pointer",
            border: "none",
            fontSize: "0.95rem",
            padding: "0.75rem 1.5rem",
          }}
        >
          Try Again
        </button>

        <Link
          href="/"
          className="cta-button"
          style={{
            backgroundColor: "var(--sub-alt-color)",
            color: "var(--text-color)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "0.95rem",
            padding: "0.75rem 1.5rem",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
