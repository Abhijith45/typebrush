"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QWERTY_ROWS, KEY_FINGER_MAP, FINGER_COLOR_MAP } from "@/lib/gym/gymData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function InteractiveKeyboard({ onSelectKeyForPractice }) {
  const [mounted, setMounted] = useState(false);
  const [selectedKey, setSelectedKey] = useState("R");
  const [hoveredKey, setHoveredKey] = useState(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const activeKeySymbol = hoveredKey || selectedKey;
  const activeKeyInfo = KEY_FINGER_MAP[activeKeySymbol] || KEY_FINGER_MAP["R"];
  const activeFingerColor = FINGER_COLOR_MAP[activeKeyInfo.finger] || "finger-emerald";

  const handleKeyClick = (keySymbol) => {
    setSelectedKey(keySymbol);
  };

  const handlePracticeClick = () => {
    if (onSelectKeyForPractice) {
      onSelectKeyForPractice(selectedKey);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", "personalized");
      params.set("practiceKey", selectedKey);
      router.push(`/typing-gym?${params.toString()}#training-workspace`);
    }
  };

  if (!mounted) {
    return <div style={{ minHeight: "450px" }} />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
      {/* Visual QWERTY Keyboard */}
      <Box className="gym-keyboard-container">
        <Box className="gym-keyboard">
          {QWERTY_ROWS.map((row, rowIndex) => (
            <Box key={rowIndex} className="gym-keyboard-row">
              {row.map((keySymbol) => {
                const info = KEY_FINGER_MAP[keySymbol] || { finger: "Thumbs" };
                const colorClass = FINGER_COLOR_MAP[info.finger] || "finger-slate";
                const isSelected = selectedKey === keySymbol;
                const isHovered = hoveredKey === keySymbol;
                const isSpace = keySymbol === "Space";

                return (
                  <Box
                    component="button"
                    key={keySymbol}
                    type="button"
                    onClick={() => handleKeyClick(keySymbol)}
                    onMouseEnter={() => setHoveredKey(keySymbol)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onFocus={() => setHoveredKey(keySymbol)}
                    onBlur={() => setHoveredKey(null)}
                    className={`gym-key ${colorClass} ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""} ${isSpace ? "space-key" : ""}`}
                    aria-label={`Key ${keySymbol}, assigned to ${info.finger}`}
                  >
                    <span className="gym-key-symbol">{keySymbol}</span>
                    <span className="gym-key-dot" aria-hidden="true" />
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Legend Row */}
        <Box className="gym-keyboard-legend">
          {Object.entries(FINGER_COLOR_MAP).map(([fingerName, colorClass]) => (
            <Box key={fingerName} className="legend-item">
              <span className={`legend-dot ${colorClass}`} aria-hidden="true" />
              <span className="legend-label">{fingerName}</span>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Selected Key Information Panel */}
      <Box className="card gym-info-panel">
        <Box sx={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <Box className={`gym-key-preview ${activeFingerColor}`}>
            {activeKeySymbol}
          </Box>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <Typography component="h3" sx={{ fontSize: "1.25rem", margin: 0, fontWeight: "600" }}>
                Key: {activeKeySymbol}
              </Typography>
              <Box component="span" className={`finger-badge ${activeFingerColor}`}>
                {activeKeyInfo.finger}
              </Box>
            </Box>
            <Typography component="p" sx={{ fontSize: "0.85rem", color: "var(--sub-color)", margin: 0 }}>
              Position: <strong>{activeKeyInfo.row}</strong> ({activeKeyInfo.hand} Hand)
            </Typography>
          </Box>
          <Box>
            <Box
              component="button"
              type="button"
              onClick={handlePracticeClick}
              className="control-btn primary"
              sx={{
                padding: "0.6rem 1.4rem",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <span className="material-icons-outlined">fitness_center</span>
              Practice Key &quot;{selectedKey}&quot;
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
