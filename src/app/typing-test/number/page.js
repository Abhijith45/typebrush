import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";

export const metadata = {
  title: "Number Typing Test — Practice Numeric Keypad Speed | TypeBrush",
  description: "Free number typing test online. Practice typing digit sequences, decimals, and number codes. Ideal for data entry operators, billing staff, and banking exam prep.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/number"
  },
  openGraph: {
    title: "Number Typing Test — Practice Numeric Keypad Speed | TypeBrush",
    description: "Free number typing test online. Practice typing digit sequences and number codes. No sign-up required.",
    url: "https://typebrush.in/typing-test/number",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function NumberTest() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Number Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Practice typing numeric sequences, decimals, and number codes. Designed for data entry operators, billing specialists, accounting professionals, and anyone preparing for banking or government data entry exams.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="number" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Why Practice Number Typing?</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          Typing numbers requires reaching away from the home row to the top number row or using the Numpad — an entirely different muscle movement than standard letter typing. Regular number typing practice builds the accuracy and speed needed for data entry jobs, banking operations, inventory management, and financial record-keeping.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try standard tests:</span>
          <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>1-Minute Test</Link>
          <Link href="/typing-practice" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Practice Section</Link>
        </div>
      </section>
    </div>
  );
}
