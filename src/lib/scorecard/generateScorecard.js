export async function generateScorecard({
  name = "Typist",
  wpm = 0,
  accuracy = 100,
  rawAccuracy = 100,
  errors = 0,
  correctChars = 0,
  incorrectChars = 0,
  duration = 0,
  testName = "Typing Test",
  performanceLevel = "Intermediate Typist",
  weakKeys = "None detected",
  recommendation = "Build speed and accuracy",
  date = null
}) {
  // Normalize user name
  const normalizedName = name.trim() || "Typist";

  // Sanitize filename: replace spaces with hyphens, strip non-alphanumeric chars
  const sanitizedName = normalizedName
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  
  const filename = sanitizedName
    ? `TypeBrush-Scorecard-${sanitizedName}.pdf`
    : "TypeBrush-Scorecard.pdf";

  // Format date if not provided (e.g. "11 August 2026")
  const completionDate = date || new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Dynamically import jsPDF (zero bundle cost on initial page load)
  const { jsPDF } = await import("jspdf");

  // Create A4 PDF (210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Background
  doc.setFillColor(248, 250, 252); // #f8fafc
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Outer Decorative Frame
  doc.setDrawColor(226, 232, 240); // #e2e8f0
  doc.setLineWidth(1);
  doc.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 6, 6, "S");

  // Inner Emerald Border
  doc.setDrawColor(5, 150, 105); // #059669 Emerald Accent
  doc.setLineWidth(0.5);
  doc.roundedRect(15, 15, pageWidth - 30, pageHeight - 30, 4, 4, "S");

  // Header Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // #0f172a
  doc.text("Type", 105, 32, { align: "right" });
  
  doc.setTextColor(5, 150, 105); // #059669
  doc.text("Brush", 105, 32, { align: "left" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // #64748b
  doc.text("typebrush.netlify.app", 105, 38, { align: "center" });

  // Document Title Banner
  doc.setFillColor(236, 253, 245); // #ecfdf5 (mint soft bg)
  doc.setDrawColor(167, 243, 208); // #a7f3d0
  doc.setLineWidth(0.3);
  doc.roundedRect(40, 46, 130, 14, 7, 7, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(5, 150, 105);
  doc.text("TYPING TEST SCORECARD", 105, 54, { align: "center" });

  // Recipient Section
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text("This certificate certifies that", 105, 72, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(normalizedName, 105, 84, { align: "center" });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(60, 89, 150, 89);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("has successfully completed the online typing test", 105, 96, { align: "center" });

  // Hero Metric Badges Row (WPM & Accuracy)
  // WPM Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(35, 106, 65, 40, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(5, 150, 105);
  doc.text(`${wpm}`, 67.5, 126, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("WORDS PER MINUTE (WPM)", 67.5, 137, { align: "center" });

  // Accuracy Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(110, 106, 65, 40, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42);
  doc.text(`${accuracy}%`, 142.5, 126, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("TYPING ACCURACY", 142.5, 137, { align: "center" });

  // Detailed Performance Breakdown Table
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(35, 150, 140, 94, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("PERFORMANCE BREAKDOWN", 45, 158);

  doc.setDrawColor(241, 245, 249);
  doc.line(45, 161, 165, 161);

  const tableRows = [
    { label: "Test Mode / Type", value: testName },
    { label: "Performance Level", value: performanceLevel },
    { label: "Raw Accuracy", value: `${rawAccuracy}%` },
    { label: "Net Accuracy", value: `${accuracy}%` },
    { label: "Time Elapsed", value: `${duration} seconds` },
    { label: "Characters Typed", value: `${correctChars + incorrectChars}` },
    { label: "Correct Characters", value: `${correctChars}` },
    { label: "Errors / Mistakes", value: `${errors}` },
    { label: "Weak Keys", value: weakKeys },
    { label: "Recommended Drill", value: recommendation },
    { label: "Completion Date", value: completionDate }
  ];

  let currentY = 168;

  tableRows.forEach((row) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(row.label, 45, currentY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(row.value, 165, currentY, { align: "right" });

    currentY += 7;
  });

  // Footer Disclaimer & URL
  doc.setDrawColor(226, 232, 240);
  doc.line(35, 252, 175, 252);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // #94a3b8
  doc.text("Generated client-side by TypeBrush. Free typing tool for all.", 105, 262, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(5, 150, 105);
  doc.text("https://typebrush.netlify.app", 105, 269, { align: "center" });

  // Save PDF file
  doc.save(filename);
}
