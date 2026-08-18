import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Free Online Typing Test — Measure Your WPM & Accuracy | TypeBrush",
  description: "Take a free online typing test and find out your WPM in seconds. Choose 1, 2, 5, or 10 minute tests. Instant results, no account needed.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-test"
  },
  openGraph: {
    title: "Free Online Typing Test — Measure Your WPM & Accuracy | TypeBrush",
    description: "Take a free online typing test and find out your WPM in seconds. Choose 1, 2, 5, or 10 minute tests. Instant results, no account needed.",
    url: "https://typebrush.netlify.app/typing-test",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TypingTestLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is WPM calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM is calculated as (total correct characters ÷ 5) ÷ (elapsed time in minutes). One 'word' equals 5 characters, which standardizes speed across text with different word lengths."
        }
      },
      {
        "@type": "Question",
        "name": "How is typing accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy = (Correct Characters / Total Characters Typed) × 100. For example, typing 95 correct characters out of 100 total keystrokes gives 95% accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "Which typing test duration should I choose?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For a quick WPM check, use the 1-minute test. For daily practice, the 2-minute test is ideal. For exam preparation (SSC, banking, government typing tests), use the 5 or 10 minute tests."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://typebrush.netlify.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Typing Test",
        "item": "https://typebrush.netlify.app/typing-test"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />

      <div>
        <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Free Online Typing Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Measure your typing speed in Words Per Minute (WPM) and check your accuracy — all for free, with no sign-up. Click &ldquo;Start Test&rdquo; to begin, or select a specific duration below.
        </p>
      </div>

      <div>
        <TypingTest duration={60} mode="standard" />
      </div>

      {/* Select Timing configuration */}
      <section style={{ borderTop: "1px solid var(--sub-alt-color)", paddingTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Choose a Test Duration</h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>1-Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>A quick sprint to check your baseline WPM. Great for daily warm-ups.</p>
          </Link>
          <Link href="/typing-test/2-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>2-Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Tests your consistency and accuracy over a slightly longer stretch.</p>
          </Link>
          <Link href="/typing-test/5-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>5-Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Build stamina and sustained accuracy. Reveals issues that shorter tests hide.</p>
          </Link>
          <Link href="/typing-test/10-minute" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>10-Minute Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Standard format for typing certifications, SSC, and government exam prep.</p>
          </Link>
          <Link href="/typing-test/number" className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-color)" }}>Number Typing Test</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem", lineHeight: "1.4rem" }}>Practice typing digit sequences for data entry and billing roles.</p>
          </Link>
        </div>
      </section>

      {/* Educational Content */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)" }}>How to Improve Your Typing Speed</h2>
        <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem", lineHeight: "1.5rem" }}>
          <li>
            <strong>Start with accuracy, not speed:</strong> Fewer mistakes means less time spent hitting backspace. Accuracy improvements naturally lead to faster WPM.
          </li>
          <li>
            <strong>Use all ten fingers:</strong> Keep your fingers on the home row (ASDF for the left hand, JKL; for the right). Use each finger for its assigned keys instead of hunting with your index fingers. Master correct setups with our complete <Link href="/touch-typing" style={{ color: "var(--accent-color)" }}>Touch Typing Guide</Link>.
          </li>
          <li>
            <strong>Stop looking at your hands:</strong> Focusing on the screen builds visual-spatial muscle memory. Your fingers will learn key positions over time without looking.
          </li>
          <li>
            <strong>Practice daily, not in long bursts:</strong> 10–15 minutes per day is far more effective than one hour per week. Short, regular sessions build muscle memory faster.
          </li>
          <li>
            <strong>Target your weak keys:</strong> Use the <Link href="/typing-gym" style={{ color: "var(--accent-color)" }}>Typing Gym</Link> to drill the specific keys that slow you down.
          </li>
        </ul>
      </section>

      {/* WPM & Accuracy Math */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <div className="card">
          <h3>Words Per Minute (WPM) Formula</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.5rem" }}>
            One &ldquo;word&rdquo; in typing is standardized as 5 characters (including spaces), so results are comparable regardless of text length. You can use our interactive <Link href="/wpm-calculator" style={{ color: "var(--accent-color)" }}>WPM Calculator</Link> to test calculations.
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "0.75rem", borderRadius: "var(--border-radius)", marginTop: "0.75rem", border: "1px solid var(--sub-alt-color)" }}>
            WPM = (Correct Characters ÷ 5) ÷ Minutes
          </div>
        </div>
        <div className="card">
          <h3>Typing Accuracy Formula</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.5rem" }}>
            Accuracy shows how many of your keystrokes matched the target text. Most professional tests require 95% or above.
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "0.75rem", borderRadius: "var(--border-radius)", marginTop: "0.75rem", border: "1px solid var(--sub-alt-color)" }}>
            Accuracy = (Correct Chars ÷ Total Typed) × 100
          </div>
        </div>
      </section>
    </div>
  );
}
