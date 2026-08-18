import Link from "next/link";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Touch Typing Guide — Learn Finger Positions & Typing Posture | TypeBrush",
  description: "Learn how to touch type without looking at your keyboard. Master home row finger placements, typing ergonomics, and practice plans for faster WPM.",
  alternates: {
    canonical: "https://typebrush.netlify.app/touch-typing"
  },
  openGraph: {
    title: "Touch Typing Guide — Learn Finger Positions & Typing Posture | TypeBrush",
    description: "Master the art of touch typing. Our complete guide covers finger positions, home row rules, ergonomics, and strategies to boost your WPM.",
    url: "https://typebrush.netlify.app/touch-typing",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TouchTypingLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is touch typing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Touch typing is the method of typing on a keyboard without looking at the keys. It relies entirely on muscle memory to locate characters, allowing for faster speeds and fewer transcription errors."
        }
      },
      {
        "@type": "Question",
        "name": "What are the home row keys?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The home row keys are the baseline resting positions for your fingers. On QWERTY keyboards, the left hand rests on A, S, D, and F, while the right hand rests on J, K, L, and ; (semicolon). Your thumbs control the Space bar."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to learn touch typing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With 10 to 15 minutes of dedicated daily practice, most users can memorize key positions within 2 to 3 weeks. Reaching speeds above 50 WPM typically takes 1 to 2 months of consistent training."
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
        "name": "Touch Typing Guide",
        "item": "https://typebrush.netlify.app/touch-typing"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "900px", margin: "0 auto", padding: "1rem 0" }}>
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />

      {/* Hero Section */}
      <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <span className="hero-pill">
          <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>school</span>
          Complete Touch Typing Manual
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
          Master <span className="highlight-emerald">Touch Typing</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-color)", opacity: 0.85, maxWidth: "680px", lineHeight: "1.7rem" }}>
          Stop hunting and pecking keys. Learn to type with all ten fingers, look exclusively at the screen, and double your typing speed through structured muscle memory drills.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <Link href="/typing-gym" className="cta-button primary" style={{ padding: "0.8rem 1.8rem" }}>
            Start Gym Drills
          </Link>
          <Link href="/typing-test" className="cta-button" style={{ padding: "0.8rem 1.8rem", backgroundColor: "var(--sub-alt-color)", color: "var(--main-color)" }}>
            Test Your Baseline WPM
          </Link>
        </div>
      </section>

      {/* What is Touch Typing? */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--main-color)" }}>What is Touch Typing?</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          Touch typing is the technique of typing without looking at the physical keyboard. Instead of searching for characters visually, touch typists rely on muscle memory built in their fingers. Each finger is assigned to specific columns on the QWERTY grid, returning to a standardized resting position known as the <strong>Home Row</strong>.
        </p>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          By eliminating the need to look down at your hands and back up at the screen, you remove cognitive overhead, reduce eye strain, and allow your fingers to translate your thoughts into text almost instantaneously.
        </p>
      </section>

      {/* The Core Finger Placement Map */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Core Finger Mapping & Home Row Rules</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9, margin: 0 }}>
          Your hands should rest lightly on the keyboard with your fingers slightly curved. Here is the standard finger mapping layout for a US QWERTY keyboard:
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginTop: "0.5rem" }}>
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ color: "var(--accent-color)", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "1.1rem" }}>
              <span className="material-icons-outlined">arrow_back</span>
              Left Hand Resting Map
            </h3>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.9rem", lineHeight: "1.4rem" }}>
              <li><strong>Pinky Finger:</strong> Rest on <code>A</code>. Controls: <code>Q, A, Z</code>, Shift, Control.</li>
              <li><strong>Ring Finger:</strong> Rest on <code>S</code>. Controls: <code>W, S, X</code>.</li>
              <li><strong>Middle Finger:</strong> Rest on <code>D</code>. Controls: <code>E, D, C</code>.</li>
              <li><strong>Index Finger:</strong> Rest on <code>F</code>. Controls: <code>R, F, V, T, G, B</code>.</li>
            </ul>
          </div>

          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ color: "var(--accent-color)", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "1.1rem" }}>
              <span className="material-icons-outlined">arrow_forward</span>
              Right Hand Resting Map
            </h3>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.9rem", lineHeight: "1.4rem" }}>
              <li><strong>Index Finger:</strong> Rest on <code>J</code>. Controls: <code>Y, H, N, U, J, M</code>.</li>
              <li><strong>Middle Finger:</strong> Rest on <code>K</code>. Controls: <code>I, K, ,</code> (comma).</li>
              <li><strong>Ring Finger:</strong> Rest on <code>L</code>. Controls: <code>O, L, .</code> (period).</li>
              <li><strong>Pinky Finger:</strong> Rest on <code>;</code>. Controls: <code>P, ;, /, Enter, Backspace</code>.</li>
            </ul>
          </div>
        </div>

        <p style={{ lineHeight: "1.6rem", opacity: 0.9, margin: 0 }}>
          <strong>Note:</strong> The keys <code>F</code> and <code>J</code> feature physical bumps or ridges. These tactile guide marks let you reposition your hands correctly without looking at the board.
        </p>
      </section>

      {/* Ergonomics & Typing Posture */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--main-color)" }}>Typing Ergonomics & Posture</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          Typing at high WPM speeds for long periods requires proper posture to prevent repetitive strain injuries (RSI) like carpal tunnel syndrome:
        </p>
        <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.95rem" }}>
          <li><strong>Elbow Position:</strong> Keep your elbows bent at a 90-degree angle, positioned close to your sides.</li>
          <li><strong>Wrist Alignment:</strong> Keep your wrists straight and floating. Do not rest them flat on the desk or bend them upwards.</li>
          <li><strong>Screen Height:</strong> Your eyes should be level with the top third of your monitor, about 20-30 inches away.</li>
          <li><strong>Shoulders:</strong> Keep your shoulders relaxed and back straight, resting flat against your chair support.</li>
        </ul>
      </section>

      {/* How to Practice effectively */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Strategic Practice Rules for WPM Gains</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          Improving WPM is a biological process of myelinating neural pathways. To build speed effectively:
        </p>
        <ol style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li><strong>Prioritize Accuracy (Net Accuracy &gt; 95%):</strong> If you type fast but make mistakes, you must hit Backspace, which cuts your speed in half. Practicing slowly but accurately builds clean muscle pathways.</li>
          <li><strong>Type with a Consistent Rhythm:</strong> Try to type at a steady pace, rather than typing easy words fast and pausing on hard ones. This is measured by your <strong>Consistency Score</strong>.</li>
          <li><strong>Identify and Target Weak Spots:</strong> Don&apos;t just type standard passages over and over. If you frequently miss the key <code>P</code> or <code>R</code>, use the <Link href="/typing-gym" style={{ color: "var(--accent-color)" }}>Typing Gym</Link> to run recovery drills specifically for those keys.</li>
        </ol>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Frequently Asked Questions</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--main-color)" }}>Why should I learn touch typing?</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Touch typing increases WPM speeds from an average of 30 WPM (index finger hunters) to 60-90+ WPM. It also lets you keep your eyes on the screen, improving accuracy and reducing neck and back strain.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--main-color)" }}>Should I look at the keyboard when learning?</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              No. Looking at the keys prevents muscle memory from forming because the brain relies on visual cues instead of motor coordinates. If you get stuck, look at the visual keyboard outline rendered inside our <Link href="/typing-gym" style={{ color: "var(--accent-color)" }}>Typing Gym</Link>.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--main-color)" }}>How is WPM calculated?</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Standard WPM calculation counts 5 characters as a single word: WPM = (Correct Characters ÷ 5) ÷ time elapsed. Learn more on our <Link href="/wpm-calculator" style={{ color: "var(--accent-color)" }}>WPM Calculator</Link> reference page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
