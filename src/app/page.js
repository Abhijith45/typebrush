import Link from "next/link";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Free Typing Test Online — Check Your WPM & Accuracy | TypeBrush",
  description: "Take a free online typing test and find out how fast you type. Measure your WPM, accuracy, and error rate in 1 to 10 minutes. No sign-up required.",
  alternates: {
    canonical: "https://typebrush.in/"
  },
  openGraph: {
    title: "Free Typing Test Online — Check Your WPM & Accuracy | TypeBrush",
    description: "Test your typing speed for free. Practice with timed tests, targeted drills, and personalized weak-key training. No account needed.",
    url: "https://typebrush.in",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Typing Test Online — Check Your WPM & Accuracy | TypeBrush",
    description: "Test your typing speed for free. Practice with timed tests, targeted drills, and personalized weak-key training. No account needed."
  }
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TypeBrush",
    "url": "https://typebrush.in",
    "description": "Free online typing test and practice platform. Measure WPM, improve accuracy, and train weak keys — no account required."
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
          "text": "The average typing speed is around 40 WPM. Office professionals typically type between 55–75 WPM, while competitive typists often exceed 100 WPM. For most jobs and exams, 40–60 WPM with 95%+ accuracy is considered acceptable."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up to use TypeBrush?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. TypeBrush is completely free and works without an account. Your results and progress are stored locally in your browser — no personal data is sent to any server."
        }
      },
      {
        "@type": "Question",
        "name": "How can I improve my typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on accuracy before speed. Use all ten fingers and keep them on the home row (ASDF for the left hand, JKL; for the right). Look at the screen, not your hands. Practice for 10–15 minutes daily rather than long sessions once a week."
        }
      },
      {
        "@type": "Question",
        "name": "What is WPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM stands for Words Per Minute. In typing tests, one 'word' is standardized as 5 characters (including spaces). So if you type 200 characters correctly in 1 minute, your WPM is 40."
        }
      },
      {
        "@type": "Question",
        "name": "How is typing accuracy calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typing accuracy is calculated as: (Correct Characters / Total Characters Typed) × 100. For example, if you type 190 characters correctly out of 200 total keystrokes, your accuracy is 95%."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice typing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "10–15 minutes of daily practice is more effective than long occasional sessions. Consistent short sessions build muscle memory faster. Use TypeBrush's Typing Gym to practice specific weak keys for targeted improvement."
        }
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
      <Schema data={websiteSchema} />
      <Schema data={faqSchema} />

      {/* Responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--main-color);
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--main-color);
          letter-spacing: -0.02em;
          margin: 0;
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }
      `}} />

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          maxWidth: "820px",
          margin: "1rem auto 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <span className="hero-pill">
          <span style={{ fontSize: "0.6rem" }}>●</span> Free Online Typing Test — No Sign-Up Required
        </span>

        <h1 className="hero-title">
          Find Out How Fast You Type — <span className="highlight-emerald">Free Typing Test</span>
        </h1>

        <p style={{ fontSize: "1.15rem", color: "var(--text-color)", maxWidth: "680px", lineHeight: "1.7rem", margin: 0 }}>
          Measure your typing speed in WPM, check your accuracy, and identify your weak keys. Ideal for students, job seekers, SSC aspirants, data entry operators, and anyone who types for work.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <Link href="/typing-test" className="cta-button">
            <span className="material-icons-outlined">play_arrow</span>
            Start Free Typing Test
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

      {/* Trust Signals Row */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1.75rem"
        }}
      >
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem", gap: "0.5rem" }}>
          <div className="icon-badge icon-badge-emerald" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">speed</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            WPM
          </span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            Live Speed Tracking
          </span>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem", gap: "0.5rem" }}>
          <div className="icon-badge icon-badge-emerald" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">track_changes</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            100%
          </span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            Real-time Accuracy
          </span>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem", gap: "0.5rem" }}>
          <div className="icon-badge icon-badge-blue" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">lock</span>
          </div>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            Free
          </span>
          <span style={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            No Account Needed
          </span>
        </div>
      </section>

      {/* Why Choose TypeBrush Section */}
      <section
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}
      >
        <h2 className="section-title">
          Why Use <span className="highlight-emerald">TypeBrush</span>?
        </h2>

        <div className="grid-cards">
          <div className="card" style={{ textAlign: "left", gap: "0.75rem", display: "flex", flexDirection: "column" }}>
            <div className="icon-badge icon-badge-emerald" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">trending_up</span>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Track Your Progress
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              See your WPM, accuracy, and error rate after every test. Spot weak keys and understand exactly where to improve.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem", display: "flex", flexDirection: "column" }}>
            <div className="icon-badge icon-badge-purple" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">fitness_center</span>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Targeted Typing Gym
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Don&apos;t just test — train. The Typing Gym lets you drill specific keys, finger positions, key pairs, numbers, and symbols to fix your weak spots.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem", display: "flex", flexDirection: "column" }}>
            <div className="icon-badge icon-badge-orange" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">military_tech</span>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Exam & Job Ready
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Prepare for SSC, banking, government typing exams, data entry tests, and corporate assessments with 1 to 10 minute timed tests.
            </p>
          </div>

          <div className="card" style={{ textAlign: "left", gap: "0.75rem", display: "flex", flexDirection: "column" }}>
            <div className="icon-badge icon-badge-teal" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">bolt</span>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Instant Results
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Get your WPM and accuracy score the moment you finish. Download a printable scorecard or share your result with one tap.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tests Grid */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2 className="section-title">
          Popular Typing Tests
        </h2>
        <div className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Sprint</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              1-Minute Typing Test
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              The fastest way to check your baseline WPM. Great for a quick warm-up before longer sessions.
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/2-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Standard</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              2-Minute Typing Test
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Tests your consistency and accuracy over a longer stretch. See how well your speed holds up.
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/5-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Focus</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              5-Minute Typing Test
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Build stamina and test your sustained speed. Reveals accuracy issues that shorter tests hide.
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/10-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Exam Prep</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              10-Minute Typing Test
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Standard duration for typing certifications, SSC exams, and data entry job assessments.
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/number" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Numeric</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Number Typing Test
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Practice typing digits and number sequences. Essential for data entry, accounting, and billing roles.
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Educational & WPM Formula */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          How Is Typing Speed Measured?
        </h2>
        <p style={{ lineHeight: "1.6rem", margin: 0 }}>
          Typing speed is measured in Words Per Minute (WPM). To keep measurements fair across short and long words, one &ldquo;word&rdquo; is standardized as 5 keystrokes — including spaces and punctuation.
        </p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "1.25rem", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", fontWeight: "600" }}>
          WPM = (Total Correct Characters ÷ 5) ÷ Time in Minutes
        </div>
        <p style={{ lineHeight: "1.6rem", margin: 0 }}>
          Accuracy measures how many of your keystrokes were correct. Most professional tests require 95% or higher accuracy alongside your WPM score. On TypeBrush, both are calculated live as you type.
        </p>
        <Link href="/typing-gym" style={{ color: "var(--accent-color)", fontWeight: "600", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
          Improve your weak keys in the Typing Gym <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
        </Link>
      </section>

      {/* FAQ */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2 className="section-title">
          Frequently Asked Questions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              What is a good typing speed?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              The average is around 40 WPM. Office professionals typically type 55–75 WPM. For most exams and jobs, 40–60 WPM with 95%+ accuracy is acceptable.
            </p>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              What is WPM?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              WPM stands for Words Per Minute. In typing tests, one &ldquo;word&rdquo; equals 5 characters. Type 200 correct characters in 1 minute and your WPM is 40.
            </p>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Do I need to sign up?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              No. TypeBrush is completely free and works without an account. Your results and history are stored in your browser — nothing is shared with any server.
            </p>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              How do I improve my typing speed?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              Focus on accuracy first. Keep fingers on the home row (ASDF / JKL;), avoid looking at your hands, and practice 10–15 minutes daily. Use the Typing Gym to target weak keys.
            </p>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              How is accuracy calculated?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              Accuracy = (Correct Characters ÷ Total Typed) × 100. If you typed 190 correctly out of 200 keystrokes, your accuracy is 95%.
            </p>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              How often should I practice?
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              10–15 minutes daily is more effective than one long session per week. Short, consistent practice builds muscle memory faster and lasts longer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
