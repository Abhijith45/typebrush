"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

export default function DesktopRequiredDialog({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="desktop-required-title"
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "0.5rem",
          backgroundColor: "var(--surface-color)",
          color: "var(--main-color)",
          border: "1px solid var(--border-color)"
        }
      }}
    >
      <DialogTitle id="desktop-required-title" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700" }}>
        ⌨️ Desktop Required
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
          <Typography variant="body1" sx={{ color: "var(--text-color)", fontSize: "0.95rem", lineHeight: "1.5rem" }}>
            TypeBrush Typing Test and Typing Gym are designed for physical keyboards.
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--sub-color)", fontSize: "0.85rem", lineHeight: "1.4rem" }}>
            To accurately measure typing speed, accuracy, and key mastery, please open TypeBrush on a desktop or laptop.
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--sub-color)", fontSize: "0.85rem", lineHeight: "1.4rem" }}>
            You can still browse guides, tools, and resources on your current device.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "var(--accent-color)",
            color: "#ffffff",
            fontWeight: "600",
            borderRadius: "9999px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "var(--accent-hover)"
            }
          }}
          fullWidth
        >
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}
