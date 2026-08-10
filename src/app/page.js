import Link from "next/link";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Free Typing Tests & Practice Online | TypeBrush",
  description: "Test and improve your typing speed and accuracy with our free online typing test. Practice with timed tests, numbers, and custom passages.",
  alternates: {
    canonical: "https://typebrush.in/"
  }
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TypeBrush",
    "url": "https://typebrush.in",
    "description": "Free browser-based typing test and practice platform to increase WPM and accuracy."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average typing speed is about 40 WPM. Professional typists usually range between 65 to 80 WPM, while competitive typists exceed 100 WPM."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up to save my progress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! TypeBrush is designed to be fully functional without accounts. All calculations and logic run client-side in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "How can I type faster?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use all ten fingers on the keyboard and rest them on the home row (ASDF JKL;). Try to keep your eyes on the screen instead of looking down, and practice consistently for 10 minutes every day."
        }
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <Schema data={websiteSchema} />
      <Schema data={faqSchema} />

      {/* Hero Section */}
      <section style={{ textAlign: "center", maxWidth: "800px", margin: "2rem auto 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
        <h1 style={{ fontSize: "2.75rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
          Free Typing Tests & Practice
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-color)", opacity: 0.8, maxWidth: "600px" }}>
          Improve your typing speed, accuracy, and confidence with free browser-based typing tests. Focus on rhythmic typing to build long-term muscle memory.
        </p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Link href="/typing-test" className="cta-button" style={{ fontSize: "1.1rem", padding: "0.85rem 2rem" }}>
            Start Typing Test
          </Link>
          <Link
            href="/typing-practice"
            className="control-btn"
            style={{
              fontSize: "1.1rem",
              padding: "0.85rem 2rem",
              border: "1px solid var(--sub-color)",
              textDecoration: "none"
            }}
          >
            Practice Typing
          </Link>
        </div>
      </section>

      {/* Popular Tests Grid */}
      <section>
        <h2 style={{ borderBottom: "1px solid var(--sub-alt-color)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Popular Typing Tests
        </h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-color)" }}>1 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>A quick speed-run test to check your baseline WPM typing performance.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto" }}>Take Test →</span>
          </Link>
          <Link href="/typing-test/2-minute" className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-color)" }}>2 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Check your consistency and accuracy limits on a standard duration test.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto" }}>Take Test →</span>
          </Link>
          <Link href="/typing-test/5-minute" className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-color)" }}>5 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Build keyboard stamina and maintain focus over intermediate intervals.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto" }}>Take Test →</span>
          </Link>
          <Link href="/typing-test/10-minute" className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-color)" }}>10 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Professional certification-level timed test for exam and job readiness.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto" }}>Take Test →</span>
          </Link>
          <Link href="/typing-test/number" className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-color)" }}>Number Typing Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Practice typing numbers and special sequences for data entry roles.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto" }}>Take Test →</span>
          </Link>
        </div>
      </section>

      {/* Why TypeBrush Section */}
      <section className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
        <div>
          <h3>⚡ Fast & Minimal</h3>
          <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>Designed without bloated files or excessive scripts. TypeBrush loads in a fraction of a second for quick drills.</p>
        </div>
        <div>
          <h3>💸 Always Free</h3>
          <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>No subscription or paywalls. Access all test lengths, stats, and practice passages for free.</p>
        </div>
        <div>
          <h3>🛡️ Privacy First</h3>
          <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>No signup required. Test results are processed entirely in your browser without requiring personal accounts.</p>
        </div>
      </section>

      {/* Practice Program Intro */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid var(--sub-alt-color)", paddingTop: "2.5rem" }}>
        <h2>Keyboard Typing Practice</h2>
        <p style={{ lineHeight: "1.6rem" }}>
          Struggling to build speed under a timer? Our dedicated Practice section offers untimed exercises. Work through paragraphs of varying difficulties or longer prose passages at your own pace to build consistent muscle memory.
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <Link href="/typing-practice" className="cta-button">
            Go to Practice Mode
          </Link>
        </div>
      </section>

      {/* How Typing Speed is Measured */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>How Typing Speed Is Measured</h2>
        <p style={{ lineHeight: "1.6rem" }}>
          Typing speed is calculated in Words Per Minute (WPM). A standard &ldquo;word&rdquo; is defined as 5 keystrokes (including spaces and punctuation).
        </p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "1rem", borderRadius: "var(--border-radius)", border: "1px solid var(--sub-alt-color)" }}>
          WPM = (Total Correct Characters / 5) / (Time Elapsed in Minutes)
        </div>
        <p style={{ lineHeight: "1.6rem" }}>
          Accuracy is the percentage of correct keystrokes out of the total inputs. Focus on accuracy first: speed will naturally follow once your fingers memorize key locations.
        </p>
      </section>

      {/* FAQ */}
      <section>
        <h2 style={{ borderBottom: "1px solid var(--sub-alt-color)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>What is a good typing speed?</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: "1.5rem" }}>The average typing speed is about 40 WPM. Professional typists usually range between 65 to 80 WPM, while competitive typists exceed 100 WPM.</p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Do I need to sign up to save my progress?</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: "1.5rem" }}>No! TypeBrush is designed to be fully functional without accounts. All calculations and logic run client-side in your browser.</p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>How can I type faster?</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: "1.5rem" }}>Use all ten fingers on the keyboard and rest them on the home row (ASDF JKL;). Try to keep your eyes on the screen instead of looking down, and practice consistently for 10 minutes every day.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
