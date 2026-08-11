"use client";

import { useState, useEffect, useRef } from "react";

export default function ShareDialog({ isOpen, onClose, shareContent }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setCopied(false);
        setCopyError(false);
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !shareContent) return null;

  const { title, text, url, fullCopyText } = shareContent;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullCopyText);
      } else {
        // Fallback for older browsers or restricted contexts
        const textarea = document.createElement("textarea");
        textarea.value = fullCopyText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setCopyError(false);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      setCopyError(true);
    }
  };

  // Intent URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n\n" + url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

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
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
    >
      <div
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
            <h3 id="share-dialog-title" style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--main-color)", marginBottom: "0.25rem" }}>
              Share Your Result
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--sub-color)", margin: 0 }}>
              Share your score on social platforms or copy the summary.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--sub-color)",
              cursor: "pointer",
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

        {/* Score Message Preview Card */}
        <div
          style={{
            backgroundColor: "var(--bg-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--border-radius)",
            padding: "1rem",
            fontSize: "0.9rem",
            color: "var(--main-color)",
            lineHeight: "1.5rem"
          }}
        >
          <p style={{ margin: 0, fontWeight: "500" }}>{text}</p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600" }}>
            {url}
          </p>
        </div>

        {/* Social Platforms Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--sub-color)" }}>
            Share to platform:
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="control-btn"
              style={{ textDecoration: "none", fontSize: "0.85rem", padding: "0.6rem" }}
            >
              WhatsApp
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="control-btn"
              style={{ textDecoration: "none", fontSize: "0.85rem", padding: "0.6rem" }}
            >
              X (Twitter)
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="control-btn"
              style={{ textDecoration: "none", fontSize: "0.85rem", padding: "0.6rem" }}
            >
              LinkedIn
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="control-btn"
              style={{ textDecoration: "none", fontSize: "0.85rem", padding: "0.6rem" }}
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Copy Result & Close Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
          <button
            onClick={handleCopy}
            className="control-btn primary"
            style={{ padding: "0.65rem 1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <span className="material-icons-outlined">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy Result"}
          </button>

          <button
            onClick={onClose}
            className="control-btn"
            style={{ padding: "0.65rem 1.25rem" }}
          >
            Close
          </button>
        </div>

        {copyError && (
          <span style={{ fontSize: "0.8rem", color: "#ef4444", textAlign: "center" }}>
            Unable to copy automatically. You can copy the text above manually.
          </span>
        )}
      </div>
    </div>
  );
}
