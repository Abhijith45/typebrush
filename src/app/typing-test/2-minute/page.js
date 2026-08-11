import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "2-Minute Typing Test | Improve Typing Stamina | TypeBrush",
  description: "Take the 2-minute typing test to build stamina and spelling consistency. Free online typing test with real-time stats and accuracy reports.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/2-minute"
  }
};

export default function TwoMinuteTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>2-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A 120-second typing test that starts to challenge your spelling stamina and physical rhythm. Focus on consistency rather than rushing.
        </p>
      </div>

      <div>
        <TypingTest duration={120} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Building Typing Stamina</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          Double the duration of a quick sprint, the 2-minute test reveals whether you can maintain a constant typing speed as physical fatigue begins to affect your fingers and wrists. Practicing for two minutes helps establish a rhythm, forcing you to balance speed with careful spacing and punctuation.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>1-Minute Test</Link>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Test</Link>
        </div>
      </section>
    </div>
  );
}
