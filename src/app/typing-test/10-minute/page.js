import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "10-Minute Typing Test | Professional Typing Exam Prep | TypeBrush",
  description: "Check your sustained WPM with our free 10-minute typing test. Ideal preparation for competitive exams and professional typing certifications.",
  alternates: {
    canonical: "https://typebrush.in/typing-test/10-minute"
  }
};

export default function TenMinuteTest() {
  const breadcrumbItems = [
    { label: "Typing Test", url: "/typing-test" },
    { label: "10 Minute Test" }
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
        "name": "10-Minute Typing Test",
        "item": "https://typebrush.in/typing-test/10-minute"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={breadcrumbSchema} />
      <Breadcrumbs items={breadcrumbItems} />

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>10-Minute Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          A 600-second professional-grade test designed to prepare users for typing certifications, data entry roles, and school exams.
        </p>
      </div>

      <div>
        <TypingTest duration={600} mode="standard" />
      </div>

      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--accent-color)" }}>Preparing for Professional Exams</h2>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.6rem" }}>
          Most certification exams (such as civil services, judicial clerkships, and corporate typing tests) require at least 10 minutes of continuous typing. Taking this test regularly trains your brain and fingers to stay concentrated and relaxed over a long text block. Ensure your wrists are comfortable and your posture is relaxed before starting.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
          <span>Try other tests:</span>
          <Link href="/typing-test/5-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>5-Minute Test</Link>
          <Link href="/typing-test/number" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Numbers Test</Link>
          <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Passage Practice</Link>
        </div>
      </section>
    </div>
  );
}
