import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "5-Minute Typing Test | Online Speed & Focus Test | TypeBrush",
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
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A 300-second typing test focused on sustained typing rhythm, deep focus, and accuracy over longer prose.
        </p>
      </div>

      <div>
        <TypingTest duration={300} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Developing Focus and Precision</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          In a 5-minute test, error compounding becomes clear. If you start typing too fast initially, you may lose accuracy in the latter half of the test as physical fatigue sets in. Practice maintaining a steady, moderate pace and sitting in a comfortable posture. Sustained typing builds muscle memory that helps you copy text continuously.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/2-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>2-Minute Test</Link>
          <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Test</Link>
          <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Section</Link>
        </div>
      </section>
    </div>
  );
}
