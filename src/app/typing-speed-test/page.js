import Link from "next/link";
import TypingTest from "@/components/typing/TypingTest";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Typing Speed Test - Check Your WPM & Accuracy | TypeBrush",
  description: "Test your typing speed (WPM) and accuracy online with our free typing speed test. Choose from multiple time durations and receive instant performance metrics.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-speed-test"
  },
  openGraph: {
    title: "Typing Speed Test - Check Your WPM & Accuracy | TypeBrush",
    description: "Find out how fast you type. Take our free online typing speed test, measure WPM and raw keystroke precision, and download your printable scorecard.",
    url: "https://typebrush.netlify.app/typing-speed-test",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TypingSpeedTestLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good WPM score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An average typist scores around 40 WPM. Speeds above 60 WPM are considered professional, and expert typists achieve speeds above 80 to 100+ WPM."
        }
      },
      {
        "@type": "Question",
        "name": "How does accuracy affect WPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every error you make requires two extra keystrokes to fix (Backspace + correct key). High accuracy is essential for high WPM because errors interrupt your typing rhythm."
        }
      },
      {
        "@type": "Question",
        "name": "How can I increase my typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on touch-typing mechanics: rest your fingers on the home row, keep wrists floating, and look exclusively at the screen. Use structured exercises like the Typing Gym to target your weakest keys."
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
        "name": "Typing Speed Test",
        "item": "https://typebrush.netlify.app/typing-speed-test"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TypeBrush Typing Speed Test",
    "url": "https://typebrush.netlify.app/typing-speed-test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description": "Free web utility to measure typing speed (WPM), uncorrected mistakes, and raw keystroke precision."
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />
      <Schema data={webAppSchema} />

      {/* Header Info */}
      <div>
        <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Typing Speed Test</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Measure your touch-typing velocity in Words Per Minute (WPM) and analyze your keystroke precision. Click in the box below and type the target passage to begin your speed sprint.
        </p>
      </div>

      {/* Renders the full active typing runner */}
      <div>
        <TypingTest duration={60} mode="standard" />
      </div>

      {/* Educational Content */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--main-color)" }}>Why Measure Your Typing Speed?</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          Typing is the primary interface between your mind and the digital workspace. Whether you are coding, writing reports, preparing for competitive examinations (like SSC, Banking, or Civil Services tests), or sending emails, typing speed directly defines your productivity.
        </p>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          A speed increase from 30 WPM to 60 WPM cuts your computer writing time in half. By taking regular <strong>typing speed tests</strong>, you establish a baseline and track your muscle memory gains over time.
        </p>

        <h3 style={{ fontSize: "1.2rem", marginTop: "1rem", color: "var(--main-color)" }}>Speed Benchmarks: Where Do You Rank?</h3>
        <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.95rem" }}>
          <li><strong>0 - 20 WPM (Beginner):</strong> Standard hunt-and-peck speeds. Focus on finger positions.</li>
          <li><strong>21 - 40 WPM (Intermediate):</strong> Typical casual typist speed. Time to build muscle memory.</li>
          <li><strong>41 - 60 WPM (Advanced):</strong> Professional minimum standard for office and administration roles.</li>
          <li><strong>61 - 80 WPM (Professional):</strong> Elite typing speeds. High productivity and coding flow.</li>
          <li><strong>80+ WPM (Expert):</strong> Typing master class level. Fluent and error-free coordination.</li>
        </ul>
      </section>

      {/* Tips and Recommendations */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Three Core Rules to Improve Your Speed Test Scores</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ color: "var(--accent-color)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>1. Float Your Wrists</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8, lineHeight: "1.4rem", margin: 0 }}>
              Never rest your wrists flat on the desk or key frame while typing. Keeping them elevated lets your fingers move vertically, reducing joint tension and boosting speed.
            </p>
          </div>

          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ color: "var(--accent-color)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>2. Focus on Accuracy</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8, lineHeight: "1.4rem", margin: 0 }}>
              If you type fast but make mistakes, you drop your WPM. Take slow, controlled runs to build accuracy above 95%, then let speed build naturally.
            </p>
          </div>

          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ color: "var(--accent-color)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>3. Use the Typing Gym</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8, lineHeight: "1.4rem", margin: 0 }}>
              Identified weak keys? Run target drills inside our <Link href="/typing-gym" style={{ color: "var(--accent-color)" }}>Typing Gym</Link> to consolidate muscle memory.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Frequently Asked Questions</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--main-color)" }}>How is WPM calculated on this speed test?</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              We divide your total correct characters by 5 to find your word count, then divide by minutes elapsed: WPM = (Correct Chars ÷ 5) ÷ Minutes. Read all standard calculations on our <Link href="/wpm-calculator" style={{ color: "var(--accent-color)" }}>WPM Calculator</Link> guide page.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--main-color)" }}>Can I take tests on mobile?</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Yes. The Typing Speed Test is fully responsive and supports standard on-screen mobile key inputs, although physical mechanical keyboards are recommended to reach top speeds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
