import Link from "next/link";

import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "10-Minute Typing Test | Professional Typing Exam Prep",
  description: "Check your sustained WPM with our free 10-minute typing test. Ideal preparation for competitive exams and professional typing certifications.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/10-minute"
  }
};

export default function TenMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>10-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8 }}>
          A 600-second professional-grade test designed to prepare users for typing certifications, data entry roles, and school exams.
        </p>
      </div>

      <div>
        <TypingTest duration={600} mode="standard" />
      </div>

      <section className="card">
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Preparing for Professional Exams</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "1rem" }}>
          Most certification exams (such as civil services, judicial clerkships, and corporate typing tests) require at least 10 minutes of continuous typing. Taking this test regularly trains your brain and fingers to stay concentrated and relaxed over a long text block.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Numbers Test</Link>
          <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Passage Practice</Link>
        </div>
      </section>
    </div>
  );
}
