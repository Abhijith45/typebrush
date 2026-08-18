import Link from "next/link";
import Schema from "@/components/layout/Schema";

export const metadata = {
  title: "Free Typing Practice Online - Paragraphs & Passages | TypeBrush",
  description: "Improve your typing with free untimed exercises. Choose from English paragraphs and passages at Easy, Medium, and Hard difficulty. No account required.",
  alternates: {
    canonical: "https://typebrush.netlify.app/typing-practice"
  },
  openGraph: {
    title: "Free Typing Practice Online - Paragraphs & Passages | TypeBrush",
    description: "Improve your typing with free untimed exercises. Choose from English paragraphs and passages at Easy, Medium, and Hard difficulty.",
    url: "https://typebrush.netlify.app/typing-practice",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  }
};

export default function TypingPracticeLanding() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is untimed typing practice important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Untimed typing practice allows typists to focus completely on technique, wrist alignment, and correct finger placements without the anxiety of a countdown clock, which often leads to errors and poor habits."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between paragraph and passage practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Paragraph practice features short-to-medium blocks of text ideal for building muscle memory on word transitions. Passage practice consists of longer stories and articles designed to build typing endurance."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice typing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Short, daily practice sessions of 10 to 15 minutes are significantly more effective for building long-term muscle memory than practicing for an hour once a week."
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
        "name": "Typing Practice",
        "item": "https://typebrush.netlify.app/typing-practice"
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <Schema data={faqSchema} />
      <Schema data={breadcrumbSchema} />

      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Free Typing Practice Exercises</h1>
        <p style={{ color: "var(--text-color)", opacity: 0.8, lineHeight: "1.6rem" }}>
          Build real typing speed through deliberate, focused practice. Unlike timed tests, the practice section removes the clock so you can concentrate on correct posture, home-row positioning, and rhythmic accuracy. Choose a format below to begin.
        </p>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>English Paragraph Practice</h2>
            <p style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Short to medium-length paragraphs sorted by Easy, Medium, and Hard. Perfect for daily warm-ups, beginners building finger placement habits, or anyone focusing on accuracy.
            </p>
          </div>
          <Link href="/typing-practice/english-paragraph" className="cta-button" style={{ marginTop: "1.5rem", width: "fit-content" }}>
            Select Paragraph →
          </Link>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", color: "var(--accent-color)", marginBottom: "0.5rem" }}>English Passage Practice</h2>
            <p style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: "1.5rem" }}>
              Longer cohesive articles, historical texts, and stories. Designed to build endurance, rhythm, and the ability to maintain speed over extended passages.
            </p>
          </div>
          <Link href="/typing-practice/english-passage" className="cta-button" style={{ marginTop: "1.5rem", width: "fit-content" }}>
            Select Passage →
          </Link>
        </div>
      </section>

      {/* Structured Educational Content */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--main-color)" }}>The Philosophy of Deliberate Practice</h2>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          Many typists hit a WPM plateau around 40 to 50 Words Per Minute. The primary cause of this limit is visual reliance: looking at the keys while typing. To break past this plateau, you must switch to <strong>deliberate touch typing practice</strong>.
        </p>
        <p style={{ lineHeight: "1.6rem", opacity: 0.9 }}>
          By removing the countdown timer, the typing practice module allows you to slow down and focus on mapping keys to fingers correctly. Speed is a by-product of accurate physical motor patterns. If you type with 98% accuracy at 30 WPM, your speed will rapidly increase. If you type at 60 WPM but with 88% accuracy, you spend half your time fixing typos, keeping your net speed low.
        </p>
      </section>

      {/* Rules for Practice */}
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Tips for Effective Typing Practice</h2>
        <ul style={{ color: "var(--text-color)", opacity: 0.85, fontSize: "0.95rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", lineHeight: "1.6" }}>
          <li><strong>Float your wrists:</strong> Keep your wrists floating above the desk to allow your fingers to reach high and low rows comfortably.</li>
          <li><strong>No keyboard looking:</strong> Keep your eyes locked on the screen. If you forget a key position, refer to our touch-typing reference sheets rather than looking down.</li>
          <li><strong>Steady speed rhythm:</strong> Type with a steady tempo. Rushing through easy words and hitting a wall on unfamiliar ones disrupts hand coordination.</li>
          <li><strong>Take regular short breaks:</strong> 10 to 15 minutes of focused practice daily is much better than practicing for hours on weekends. It keeps muscle memory formation continuous.</li>
          <li><strong>Target your weak keys:</strong> If certain letters (like <code>P</code>, <code>R</code>, or symbols) trigger frequent typos, run a quick drill in the <Link href="/typing-gym" style={{ color: "var(--accent-color)" }}>Typing Gym</Link> to build muscle memory.</li>
        </ul>
      </section>

      {/* Internal Linking Silo Cards */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
        <div className="card" style={{ padding: "1.25rem" }}>
          <h3>Learn the Core Basics</h3>
          <p style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.4rem" }}>
            Unsure about home row positions or finger mappings? Read our complete step-by-step <Link href="/touch-typing" style={{ color: "var(--accent-color)" }}>Touch Typing Guide</Link>.
          </p>
        </div>
        <div className="card" style={{ padding: "1.25rem" }}>
          <h3>Measure Your Progress</h3>
          <p style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: "1.4rem" }}>
            Ready to test your limits? Take a timed <Link href="/typing-speed-test" style={{ color: "var(--accent-color)" }}>Typing Speed Test</Link> to check your WPM.
          </p>
        </div>
      </section>
    </div>
  );
}
