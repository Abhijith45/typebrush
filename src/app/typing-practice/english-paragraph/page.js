import Link from "next/link";

export const metadata = {
  title: "English Paragraph Typing Practice | Free Speed Practice",
  description: "Practice typing English paragraphs online. Select from easy, medium, and hard paragraphs to build confidence, rhythm, and accuracy.",
  alternates: {
    canonical: "https://typebrush.in/typing-practice/english-paragraph"
  }
};

export default function EnglishParagraphPractice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>English Paragraph Practice</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8 }}>
          Select a short paragraph template below to begin practicing. These exercises are untimed so you can focus strictly on accuracy and hand placement.
        </p>
      </div>

      <div className="placeholder-box">
        <p className="placeholder-text">⌨️ English Paragraph Practice Interface</p>
        <p style={{ fontSize: "0.95rem" }}>
          The interactive paragraph selector and practice interface will be available here in V1.2.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
        <span>Switch practice modes:</span>
        <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>English Passage Practice</Link>
        <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Take a 1-Minute Test</Link>
      </div>
    </div>
  );
}
