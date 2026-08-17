"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Typography, Box, Rating, CircularProgress } from "@mui/material";
import { submitFeedback } from "@/services/feedbackService";

export default function FeedbackDialog({ isOpen, onClose, onSuccess, onFailure }) {
  const [rating, setRating] = useState(5);
  const [type, setType] = useState("General Feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setRating(5);
    setType("General Feedback");
    setMessage("");
    setEmail("");
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Rating is required (1 to 5 stars).";
    }

    if (!type) {
      newErrors.type = "Feedback type is required.";
    }

    const trimmedMsg = message.trim();
    if (trimmedMsg.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    } else if (trimmedMsg.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await submitFeedback({ rating, type, message, email });
      setIsSubmitting(false);
      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setIsSubmitting(false);
      if (onFailure) onFailure(err.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={isSubmitting ? null : handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="feedback-dialog-title"
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
      <DialogTitle id="feedback-dialog-title" sx={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        💬 Help Us Improve TypeBrush
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "0.5rem" }}>
          
          {/* Rating */}
          <Box>
            <Typography variant="subtitle2" sx={{ marginBottom: "0.25rem", fontWeight: "600", color: "var(--text-color)" }}>
              How was your experience? *
            </Typography>
            <Rating
              name="feedback-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              disabled={isSubmitting}
            />
            {errors.rating && (
              <Typography variant="caption" color="error" sx={{ display: "block", marginTop: "0.25rem" }}>
                {errors.rating}
              </Typography>
            )}
          </Box>

          {/* Feedback Type Dropdown */}
          <FormControl fullWidth error={!!errors.type} disabled={isSubmitting}>
            <InputLabel id="feedback-type-label" sx={{ color: "var(--sub-color)" }}>Feedback Type *</InputLabel>
            <Select
              labelId="feedback-type-label"
              id="feedback-type"
              value={type}
              label="Feedback Type *"
              onChange={(e) => setType(e.target.value)}
              sx={{
                borderRadius: "8px",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color)"
                }
              }}
            >
              <MenuItem value="Bug Report">Bug Report</MenuItem>
              <MenuItem value="Suggestion">Suggestion</MenuItem>
              <MenuItem value="Feature Request">Feature Request</MenuItem>
              <MenuItem value="General Feedback">General Feedback</MenuItem>
            </Select>
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>

          {/* Message Textarea */}
          <TextField
            id="feedback-message"
            label="Message (min 10 characters) *"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message || `${message.length}/1000 characters`}
            disabled={isSubmitting}
            fullWidth
            InputProps={{
              style: {
                borderRadius: "8px",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)"
              }
            }}
            InputLabelProps={{
              style: { color: "var(--sub-color)" }
            }}
          />

          {/* Email (Optional) */}
          <TextField
            id="feedback-email"
            label="Email (Optional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isSubmitting}
            fullWidth
            InputProps={{
              style: {
                borderRadius: "8px",
                backgroundColor: "var(--bg-color)",
                color: "var(--main-color)"
              }
            }}
            InputLabelProps={{
              style: { color: "var(--sub-color)" }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "1rem", gap: "0.5rem" }}>
        <Button
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{
            color: "var(--text-color)",
            textTransform: "none",
            borderRadius: "9999px"
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
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
        >
          {isSubmitting ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CircularProgress size={16} color="inherit" />
              Submitting...
            </Box>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
