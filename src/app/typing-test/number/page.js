import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Number Typing Test | Practice Numeric Keypad Typing | TypeBrush",
  description: "Test and improve your numeric typing speed. Practice typing number sequences and decimals to check your numbers-only speed (KPM/WPM).",
  alternates: {
    canonical: "https://typebrush.in/typing-test/number"
  }
};

export default function NumberTest() {
  const breadcrumbItems = [
    { label: "Typing Test", url: "/typing-test" },
    { label: "Number Test" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://typebrush.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Typing Test",
        "item": "https://typebrush.in/typing-test"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Number Typing Test",
        "item": "https://typebrush.in/typing-test/number"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={breadcrumbSchema} />
      <Breadcrumbs items={breadcrumbItems} />

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Number Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Practice typing number codes and numeric sequences. Perfect for data entry operators, billing specialists, and accountants.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="number" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>The Importance of Numeric Practice</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          Numbers require moving your fingers away from the standard home row or utilizing the Numpad correctly. Practice maintaining a continuous flow to build precision on the top number row without looking down. It is essential for bookkeeping, database entry, inventory logging, and financial operations.
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
