import Link from "next/link";
import WpmCalculator from "@/components/wpm/WpmCalculator";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "WPM Calculator — Words Per Minute Typing Speed Calculator | TypeBrush",
  description: "Calculate your typing WPM speed and accuracy with our free online WPM calculator. Learn how character-to-word conversions and accuracy formulas operate.",
  alternates: {
    canonical: "https://typebrush.netlify.app/wpm-calculator"
  },
  openGraph: {
    title: "WPM Calculator — Words Per Minute Typing Speed Calculator | TypeBrush",
    description: "Calculate your typing WPM speed and accuracy with our free online WPM calculator. Learn how character-to-word conversions and accuracy formulas operate.",
    url: "https://typebrush.netlify.app/wpm-calculator",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function WPMCalculatorLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the WPM calculator compute speeds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The calculator standardizes a 'word' as exactly 5 keystrokes (including spaces). The formula used is: WPM = (Correct Characters ÷ 5) ÷ (Seconds Elapsed ÷ 60)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is a word standard length set to 5 characters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standardizing word length to 5 characters ensures that speeds are comparable. Otherwise, typing long words like 'professional' would artificially lower your WPM compared to typing short words like 'the'."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Net WPM and Gross WPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross WPM counts all keystrokes typed divided by time. Net WPM counts only correct keystrokes, penalizing you for errors left uncorrected in the final text."
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
        "name": "WPM Calculator",
        "item": "https://typebrush.netlify.app/wpm-calculator"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TypeBrush WPM Calculator",
    "url": "https://typebrush.netlify.app/wpm-calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description": "Interactive utility to compute typing speed metrics, net accuracy, and raw keystroke performance."
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "900px", margin: "0 auto", padding: "1rem 0" }}>
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />
      <Schema data={webAppSchema} />

      {/* Hero section */}
      <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <span className="hero-pill">
          <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>calculate</span>
          Interactive WPM Calculator Tool
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
          Words Per Minute <span className="highlight-emerald">WPM Calculator</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-color)", opacity: 0.85, maxWidth: "680px", lineHeight: "1.7rem" }}>
          Calculate your typing speed, net accuracy, and character distribution ratios instantly. Enter your raw keystroke counts below to view your performance metrics.
        </p>
      </section>

      {/* Interactive Calculator Wrapper */}
      <WpmCalculator />

      {/* Educational Content */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1.6rem" }}>The Math of WPM: How Speeds are Measured</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9, margin: 0 }}>
          Calculating Words Per Minute might seem simple, but standardizing it is crucial for fair evaluations. If typing speed was measured in physical words, a typist transcribing medical terminology (e.g. <i>gastroenterology</i>) would appear twice as slow as a typist transcribing basic pronouns (e.g. <i>he, she, it</i>).
        </p>
        
        <h3 style={{ fontSize: "1.2rem", color: "var(--main-color)", margin: "0.5rem 0 0.25rem 0" }}>The 5-Keystroke Rule</h3>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9, margin: 0 }}>
          To create a level playing field, international typing standards define a &ldquo;word&rdquo; as exactly <strong>5 keystrokes</strong>. This count includes spaces, numbers, punctuation marks, and control keys like Shift.
        </p>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9, margin: 0 }}>
          For example, if you type the sentence <code>&ldquo;The quick brown fox jumps.&rdquo;</code> (including spacing and period), you have typed 27 characters. In WPM terms, this is:
          <strong>Standard Words = 27 / 5 = 5.4 words</strong>
        </p>

        <h3 style={{ fontSize: "1.2rem", color: "var(--main-color)", margin: "0.5rem 0 0.25rem 0" }}>Accuracy Definitions: Net vs Raw</h3>
        <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.95rem" }}>
          <li><strong>Net Accuracy:</strong> The percentage of correct characters relative to the total characters in the final output text. If you fix mistakes via Backspace before submitting, your Net Accuracy remains high.</li>
          <li><strong>Raw Accuracy:</strong> The ratio of correct keystrokes over the total physical keystrokes hit, including those subsequent backspaces. It reveals the motor efficiency of your fingers.</li>
        </ul>
      </section>

      {/* CTA section */}
      <section className="card" style={{ padding: "2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "var(--main-color)", margin: 0 }}>Ready to Put Your Fingers to the Test?</h2>
        <p style={{ maxWidth: "600px", fontSize: "0.95rem", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
          Don&apos;t just estimate your speed. Run a real-time typing test or train your finger positions inside our interactive drills.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/typing-test" className="cta-button primary">
            Take Live Typing Test
          </Link>
          <Link href="/typing-gym" className="cta-button" style={{ backgroundColor: "var(--sub-alt-color)", color: "var(--main-color)" }}>
            Go to Typing Gym
          </Link>
        </div>
      </section>
    </div>
  );
}
