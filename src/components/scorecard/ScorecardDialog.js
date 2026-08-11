"use client";

import { useState, useEffect, useRef } from "react";
import { generateScorecard } from "@/lib/scorecard/generateScorecard";

export default function ScorecardDialog({ isOpen, onClose, resultData }) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  // Auto-focus input when modal opens and reset state
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setName("");
        setErrorMessage("");
        setIsGenerating(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape" && !isGenerating) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isGenerating, onClose]);

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    // Live validation check for length
    if (value.length > 50) {
      setErrorMessage("Name must not exceed 50 characters.");
    } else if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter your name.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    if (name.length > 50) {
      setErrorMessage("Name must not exceed 50 characters.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setErrorMessage("");
    setIsGenerating(true);

    try {
      await generateScorecard({
        name: trimmedName,
        wpm: resultData?.wpm || 0,
        accuracy: resultData?.accuracy || 100,
        errors: resultData?.errors || 0,
        correctChars: resultData?.correctChars || 0,
        incorrectChars: resultData?.incorrectChars || 0,
        duration: resultData?.duration || 0,
        testName: resultData?.testName || "Typing Test"
      });
      setIsGenerating(false);
      onClose();
    } catch (err) {
      console.error("Failed to generate scorecard PDF:", err);
      setErrorMessage("Unable to generate the scorecard. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isGenerating) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        className="card"
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "var(--surface-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          padding: "2rem",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 id="dialog-title" style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.25rem" }}>
              Download Your Scorecard
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Enter your name to personalize your scorecard.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            style={{
              background: "none",
              border: "none",
              color: "var(--sub-color)",
              cursor: isGenerating ? "not-allowed" : "pointer",
              padding: "0.25rem",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center"
            }}
            aria-label="Close dialog"
          >
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleDownload} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="user-name-input" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--main-color)" }}>
              Your Name
            </label>
            <input
              id="user-name-input"
              ref={inputRef}
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              disabled={isGenerating}
              maxLength={60}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--border-radius)",
                border: errorMessage ? "2px solid #ef4444" : "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s ease"
              }}
            />
            {errorMessage && (
              <span style={{ fontSize: "0.8rem", color: "#ef4444", fontWeight: "500" }}>
                {errorMessage}
              </span>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="control-btn"
              style={{ padding: "0.6rem 1.25rem" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="control-btn primary"
              style={{ padding: "0.6rem 1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            >
              {isGenerating ? (
                <>
                  <span className="material-icons-outlined" style={{ animation: "spin 1s linear infinite" }}>sync</span>
                  Preparing Scorecard...
                </>
              ) : (
                <>
                  <span className="material-icons-outlined">file_download</span>
                  Download Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
