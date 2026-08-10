import Link from "next/link";
import ParagraphPracticeContainer from "@/components/typing/ParagraphPracticeContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "English Paragraph Typing Practice | Free Speed Practice | TypeBrush",
  description: "Practice typing English paragraphs online. Select from easy, medium, and hard paragraphs to build confidence, rhythm, and accuracy.",
  alternates: {
    canonical: "https://typebrush.in/typing-practice/english-paragraph"
  }
};

export default function EnglishParagraphPractice() {
  const breadcrumbItems = [
    { label: "Typing Practice", url: "/typing-practice" },
    { label: "Paragraph Practice" }
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
        "name": "Typing Practice",
        "item": "https://typebrush.in/typing-practice"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Paragraph Practice",
        "item": "https://typebrush.in/typing-practice/english-paragraph"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={breadcrumbSchema} />
      <Breadcrumbs items={breadcrumbItems} />

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>English Paragraph Practice</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Select a short paragraph template below to begin practicing. These exercises are untimed so you can focus strictly on accuracy and hand placement.
        </p>
      </div>

      <div>
        <ParagraphPracticeContainer />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
        <span>Switch practice modes:</span>
        <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>English Passage Practice</Link>
        <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Take a 1-Minute Test</Link>
      </div>
    </div>
  );
}
