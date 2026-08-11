import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "1-Minute Typing Test | Quick Speed & WPM Test | TypeBrush",
  description: "Check your typing speed with our free 1-minute typing test. Start typing to get instant WPM and accuracy metrics, along with weak key diagnostics.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/1-minute"
  }
};

export default function OneMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>1-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A quick 60-second test designed to assess your raw typing speed and error rate. Focus on keeping your eyes on the screen and typing smoothly.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Why take a 1-minute test?</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          The 1-minute typing test is the most popular test length. It lets you quickly warm up, measure your baseline words-per-minute (WPM), and identify immediate key positioning errors without getting tired. It acts as a sprint for checking maximum finger speed.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/2-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>2-Minute Test</Link>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Numbers Test</Link>
        </div>
      </section>
    </div>
  );
}
