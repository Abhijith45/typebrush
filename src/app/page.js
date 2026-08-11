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
    <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
      <Schema data={websiteSchema} />
      <Schema data={faqSchema} />

      {/* Hero Section */}
      <section style={{ textAlign: "center", maxWidth: "820px", margin: "1rem auto 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <span className="hero-pill">
          <span style={{ fontSize: "0.6rem" }}>●</span> Free Online Typing Practice
        </span>
        
        <h1>
          Improve Your <span className="highlight-emerald">Typing Speed</span> Online
        </h1>
        
        <p style={{ fontSize: "1.15rem", color: "var(--text-color)", maxWidth: "680px", lineHeight: "1.7rem" }}>
          Master touch typing with interactive practice, real-time statistics, and personalized drills. Perfect for students, job candidates, and professionals.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <Link href="/typing-test" className="cta-button">
            <span className="material-icons-outlined">play_arrow</span>
            Start Typing Test
          </Link>
          <Link href="/typing-practice" className="secondary-button">
            <span className="material-icons-outlined">menu_book</span>
            Practice Typing
          </Link>
        </div>

        {/* Keyboard Visual Graphic Card */}
        <div className="keyboard-card" aria-hidden="true">
          <div className="keyboard-row">
            <div className="key-cap"></div>
            <div className="key-cap"></div>
            <div className="key-cap active-emerald"></div>
            <div className="key-cap"></div>
            <div className="key-cap"></div>
            <div className="key-cap"></div>
          </div>
          <div className="keyboard-row">
            <div className="key-cap"></div>
            <div className="key-cap active-teal"></div>
            <div className="key-cap"></div>
            <div className="key-cap"></div>
            <div className="key-cap"></div>
          </div>
          <div className="keyboard-row">
            <div className="key-cap" style={{ width: "90px" }}></div>
            <div className="key-cap"></div>
          </div>
        </div>
      </section>

      {/* 3-Up Metrics Row */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.75rem" }}>
        <div className="card" style={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <div className="icon-badge icon-badge-emerald">
            <span className="material-icons-outlined">speed</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1 }}>0</span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600" }}>Average WPM</span>
        </div>

        <div className="card" style={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <div className="icon-badge icon-badge-emerald">
            <span className="material-icons-outlined">track_changes</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1 }}>0%</span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600" }}>Average Accuracy</span>
        </div>

        <div className="card" style={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <div className="icon-badge icon-badge-blue">
            <span className="material-icons-outlined">emoji_events</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1 }}>0</span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600" }}>Practice Sessions</span>
        </div>
      </section>

      {/* Why Choose TypeBrush Section */}
      <section style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        <h2>
          Why Choose <span className="highlight-emerald">TypeBrush</span>?
        </h2>

        <div className="grid-cards">
          <div className="card" style={{ textAlign: "left", gap: "0.75rem" }}>
            <div className="icon-badge icon-badge-emerald">
              <span className="material-icons-outlined">trending_up</span>
            </div>
            <h3>Track Progress</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem" }}>
              Monitor your improvement with detailed statistics, speed metrics, and instant character accuracy feedback.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem" }}>
            <div className="icon-badge icon-badge-purple">
              <span className="material-icons-outlined">school</span>
            </div>
            <h3>Structured Practice</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem" }}>
              Work through beginner to advanced paragraph drills and practice passages to build muscle memory.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem" }}>
            <div className="icon-badge icon-badge-orange">
              <span className="material-icons-outlined">military_tech</span>
            </div>
            <h3>Endurance Drills</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem" }}>
              Practice numeric typing, timed 1-to-10 minute tests, and prose passages to prepare for typing exams.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem" }}>
            <div className="icon-badge icon-badge-teal">
              <span className="material-icons-outlined">bolt</span>
            </div>
            <h3>Real-time Feedback</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem" }}>
              Get instant feedback on your typing speed with live error calculation and character color validation.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tests Grid */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2>Popular Typing Tests</h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Sprint</span>
            <h3>1 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>A quick speed-run test to check your baseline WPM typing performance.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/2-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Standard</span>
            <h3>2 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Check your consistency and accuracy limits on a standard duration test.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/5-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Focus</span>
            <h3>5 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Build keyboard stamina and maintain focus over intermediate intervals.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/10-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Exam Prep</span>
            <h3>10 Minute Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Professional certification-level timed test for exam and job readiness.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/number" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Numeric</span>
            <h3>Number Typing Test</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Practice typing numbers and special sequences for data entry roles.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Educational & WPM Formula */}
      <section className="card" style={{ gap: "1.25rem" }}>
        <h2>How Typing Speed Is Measured</h2>
        <p style={{ lineHeight: "1.6rem" }}>
          Typing speed is calculated in Words Per Minute (WPM). A standard &ldquo;word&rdquo; is defined as 5 keystrokes (including spaces and punctuation).
        </p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "1.25rem", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", fontWeight: "600" }}>
          WPM = (Total Correct Characters / 5) / (Time Elapsed in Minutes)
        </div>
        <p style={{ lineHeight: "1.6rem" }}>
          Accuracy is the percentage of correct keystrokes out of the total inputs. Focus on accuracy first: speed will naturally follow once your fingers memorize key locations.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="card" style={{ gap: "0.5rem" }}>
            <h3>What is a good typing speed?</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>The average typing speed is about 40 WPM. Professional typists usually range between 65 to 80 WPM, while competitive typists exceed 100 WPM.</p>
          </div>
          <div className="card" style={{ gap: "0.5rem" }}>
            <h3>Do I need to sign up to save my progress?</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>No! TypeBrush is designed to be fully functional without accounts. All calculations and logic run client-side in your browser.</p>
          </div>
          <div className="card" style={{ gap: "0.5rem" }}>
            <h3>How can I type faster?</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem" }}>Use all ten fingers on the keyboard and rest them on the home row (ASDF JKL;). Try to keep your eyes on the screen instead of looking down, and practice consistently for 10 minutes every day.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
