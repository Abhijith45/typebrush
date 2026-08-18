import Link from "next/link";
import ParagraphPracticeContainer from "@/components/typing/ParagraphPracticeContainer";

export const metadata = {
  title: "English Paragraph Typing Practice — Free Online Exercises | TypeBrush",
  description: "Practice typing English paragraphs at your own pace. Choose Easy, Medium, or Hard difficulty. No timer, no pressure — just focused accuracy practice.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-practice/english-paragraph"
  },
  openGraph: {
    title: "English Paragraph Typing Practice — Free Online Exercises | TypeBrush",
    description: "Practice typing English paragraphs at your own pace. Choose Easy, Medium, or Hard difficulty.",
    url: "https://typebrush.netlify.app/typing-practice/english-paragraph",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function EnglishParagraphPractice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>English Paragraph Practice</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Choose a paragraph below and practice at your own pace. These exercises are untimed so you can focus fully on accuracy, home-row positioning, and clean keystroke habits.
        </p>
      </div>

      <div>
        <ParagraphPracticeContainer />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
        <span>Explore more:</span>
        <Link href="/typing-practice/english-passage" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Passage Practice</Link>
        <Link href="/typing-gym" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Typing Gym</Link>
        <Link href="/typing-test/1-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>1-Minute Speed Test</Link>
      </div>
    </div>
  );
}
