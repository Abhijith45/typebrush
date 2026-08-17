"use client";

import { useState, useEffect, useRef } from "react";
import { generateScorecard } from "@/lib/scorecard/generateScorecard";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function ScorecardDialog({ isOpen, onClose, resultData }) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef(null);

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
        rawAccuracy: resultData?.rawAccuracy || 100,
        errors: resultData?.errors || 0,
        correctChars: resultData?.correctChars || 0,
        incorrectChars: resultData?.incorrectChars || 0,
        duration: resultData?.duration || 0,
        testName: resultData?.testName || "Typing Test",
        performanceLevel: resultData?.performanceLevel || "Intermediate Typist",
        weakKeys: resultData?.weakKeys || "None detected",
        recommendation: resultData?.recommendation || "Build speed and accuracy"
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
    <Dialog
      open={isOpen}
      onClose={isGenerating ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)"
          }
        }
      }}
      PaperProps={{
        sx: {
          backgroundColor: "var(--surface-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          padding: "2rem",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          margin: "1rem"
        }
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography
            component="h3"
            id="dialog-title"
            sx={{
              fontSize: "1.35rem",
              fontWeight: "700",
              color: "var(--main-color)",
              marginBottom: "0.25rem",
              lineHeight: 1.2
            }}
          >
            Get Your Official Scorecard
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}
          >
            Personalize and download your official TypeBrush performance report.
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          disabled={isGenerating}
          sx={{
            color: "var(--sub-color)",
            padding: "0.25rem",
            borderRadius: "4px"
          }}
          aria-label="Close dialog"
        >
          <span className="material-icons-outlined">close</span>
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleDownload} sx={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Typography
            component="label"
            htmlFor="user-name-input"
            sx={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--main-color)" }}
          >
            Enter Full Name
          </Typography>
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
            <Typography
              component="span"
              sx={{ fontSize: "0.8rem", color: "#ef4444", fontWeight: "500" }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
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
            style={{
              padding: "0.6rem 1.25rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            {isGenerating ? (
              <>
                <span className="material-icons-outlined" style={{ animation: "spin 1s linear infinite" }}>
                  sync
                </span>
                Preparing Scorecard...
              </>
            ) : (
              <>
                <span className="material-icons-outlined">file_download</span>
                Download PDF Report
              </>
            )}
          </button>
        </Box>
      </Box>

      <Typography
        component="p"
        sx={{
          fontSize: "0.8rem",
          color: "var(--sub-color)",
          marginTop: "0.75rem",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "0.75rem",
          textAlign: "center"
        }}
      >
        Generated locally. No personal data or keystrokes are sent to any server.
      </Typography>
    </Dialog>
  );
}
