import Link from "next/link";
import PassagePracticeContainer from "@/components/typing/PassagePracticeContainer";

export const metadata = {
  title: "English Passage Typing Practice | Long-form Practice online | TypeBrush",
  description: "Improve your typing stamina with free English passage typing practice. Select from a variety of long essays and science passages.",
  alternates: {
    canonical: "https://typebrush.in/typing-practice/english-passage"
  }
};

export default function EnglishPassagePractice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>English Passage Practice</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Select a long-form cohesive passage template below to begin. Focus on keeping your shoulders relaxed, sitting upright, and moving your fingers smoothly.
        </p>
      </div>

      <div>
        <PassagePracticeContainer />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
        <span>Switch practice modes:</span>
        <Link href="/typing-practice/english-paragraph" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>English Paragraph Practice</Link>
        <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Take a 10-Minute Test</Link>
      </div>
    </div>
  );
}
