import Link from "next/link";

import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "5-Minute Typing Test | Online Speed & Focus Test",
  description: "Improve your focus and muscle memory with our free 5-minute typing test. Detailed reports on WPM, accuracy, and keyboard weak spots.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/5-minute"
  }
};

export default function FiveMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>5-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8 }}>
          A 300-second typing test focused on sustained typing rhythm, deep focus, and accuracy over longer prose.
        </p>
      </div>

      <div>
        <TypingTest duration={300} mode="standard" />
      </div>

      <section className="card">
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>Developing Focus and Precision</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "1rem" }}>
          In a 5-minute test, error compounding becomes clear. If you start typing too fast initially, you may lose accuracy in the latter half of the test. Try to find a balanced rhythm that allows you to type continuously without frequent breaks or restarts.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/2-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>2-Minute Test</Link>
          <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Test</Link>
          <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Section</Link>
        </div>
      </section>
    </div>
  );
}
