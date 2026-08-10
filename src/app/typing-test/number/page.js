import Link from "next/link";

import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "Number Typing Test | Practice Numeric Keypad Typing",
  description: "Test and improve your numeric typing speed. Practice typing number sequences and decimals to check your numbers-only speed (KPM/WPM).",
  alternates: {
    canonical: "https://typebrush.in/typing-test/number"
  }
};

export default function NumberTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Number Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8 }}>
          Practice typing number codes and numeric sequences. Perfect for data entry operators, billing specialists, and accountants.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="number" />
      </div>

      <section className="card">
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>The Importance of Numeric Practice</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "1rem" }}>
          Numbers require moving your fingers away from the standard home row or utilizing the Numpad correctly. Practice maintaining a continuous flow to build precision on the top number row.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <span>Try standard tests:</span>
          <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>1-Minute Test</Link>
          <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Section</Link>
        </div>
      </section>
    </div>
  );
}
