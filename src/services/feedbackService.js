/**
 * Service to validate and submit user feedback to Google Sheets via Google Apps Script Web App.
 */

export async function submitFeedback(formValues) {
  // Validate Rating
  if (!formValues.rating || formValues.rating < 1 || formValues.rating > 5) {
    throw new Error("Rating is required (1 to 5 stars).");
  }

  // Validate Type
  if (!formValues.type) {
    throw new Error("Feedback type is required.");
  }

  // Validate Message
  const msg = (formValues.message || "").trim();
  if (msg.length < 10) {
    throw new Error("Message must be at least 10 characters.");
  }
  if (msg.length > 1000) {
    throw new Error("Message cannot exceed 1000 characters.");
  }

  // Validate Email
  if (formValues.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      throw new Error("Please enter a valid email address.");
    }
  }

  // Auto Metadata Capture
  let deviceType = "desktop";
  let browser = "unknown";
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent || "";
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth < 768) {
      deviceType = "mobile";
    } else if (/iPad|PlayBook|Silk|Tablet/i.test(userAgent) || (window.innerWidth >= 768 && window.innerWidth <= 1024)) {
      deviceType = "tablet";
    }
    
    // Parse browser
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
  }

  const payload = {
    feedbackId: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    rating: formValues.rating,
    type: formValues.type,
    message: msg,
    email: formValues.email || "",
    page: typeof window !== "undefined" ? window.location.href : "",
    route: typeof window !== "undefined" ? window.location.pathname : "",
    device: deviceType,
    browser: browser,
    version: "1.9.0",
    status: "NEW"
  };

  const apiUrl = process.env.NEXT_PUBLIC_FEEDBACK_API_URL;
  if (!apiUrl) {
    throw new Error("Feedback API URL is not configured.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors", // Use no-cors to prevent CORS preflight OPTIONS pre-check blocks on Apps Script redirect targets
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(payload)
  });

  return true;
}
