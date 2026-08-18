import Link from "next/link";
import PassagePracticeContainer from "@/components/typing/PassagePracticeContainer";

export const metadata = {
  title: "English Passage Typing Practice - Build Stamina & Speed | TypeBrush",
  description: "Improve your typing stamina with free English passage practice. Choose from articles, essays, and stories at your own pace. No account required.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-practice/english-passage"
  },
  openGraph: {
    title: "English Passage Typing Practice - Build Stamina & Speed | TypeBrush",
    description: "Improve your typing stamina with free English passage practice. Choose from articles, essays, and stories.",
    url: "https://typebrush.netlify.app/typing-practice/english-passage",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function EnglishPassagePractice() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>English Passage Practice</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Choose a long-form passage and practice typing it at your own pace. Articles, historical texts, and essays help you build the rhythm and endurance needed for sustained professional typing.
        </p>
      </div>

      <div>
        <PassagePracticeContainer />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "1rem" }}>
        <span>Explore more:</span>
        <Link href="/typing-practice/english-paragraph" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Paragraph Practice</Link>
        <Link href="/typing-gym" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Typing Gym</Link>
        <Link href="/typing-test/10-minute" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>10-Minute Speed Test</Link>
      </div>
    </div>
  );
}
