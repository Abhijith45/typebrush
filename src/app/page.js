import Link from "next/link";
import Schema from "@/components/layout/Schema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
      <Schema data={websiteSchema} />
      <Schema data={faqSchema} />

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
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
          <span style={{ fontSize: "0.6rem" }}>●</span> Free Online Typing Practice
        </span>

        <Typography component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" }, fontWeight: 800, color: "var(--main-color)", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
          Improve Your <span className="highlight-emerald">Typing Speed</span> Online
        </Typography>

        <Typography component="p" sx={{ fontSize: "1.15rem", color: "var(--text-color)", maxWidth: "680px", lineHeight: "1.7rem", margin: 0 }}>
          Master touch typing with interactive practice, real-time statistics, and personalized drills. Perfect for students, job candidates, and professionals.
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <Link href="/typing-test" className="cta-button">
            <span className="material-icons-outlined">play_arrow</span>
            Start Typing Test
          </Link>
          <Link href="/typing-practice" className="secondary-button">
            <span className="material-icons-outlined">menu_book</span>
            Practice Typing
          </Link>
        </Box>

        {/* Keyboard Visual Graphic Card */}
        <Box className="keyboard-card" aria-hidden="true">
          <Box className="keyboard-row">
            <Box className="key-cap"></Box>
            <Box className="key-cap"></Box>
            <Box className="key-cap active-emerald"></Box>
            <Box className="key-cap"></Box>
            <Box className="key-cap"></Box>
            <Box className="key-cap"></Box>
          </Box>
          <Box className="keyboard-row">
            <Box className="key-cap"></Box>
            <Box className="key-cap active-teal"></Box>
            <Box className="key-cap"></Box>
            <Box className="key-cap"></Box>
            <Box className="key-cap"></Box>
          </Box>
          <Box className="keyboard-row">
            <Box className="key-cap" sx={{ width: "90px" }}></Box>
            <Box className="key-cap"></Box>
          </Box>
        </Box>
      </Box>

      {/* 3-Up Metrics Row */}
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.75rem"
        }}
      >
        <Box className="card" sx={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Box className="icon-badge icon-badge-emerald" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">speed</span>
          </Box>
          <Typography component="span" sx={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            0
          </Typography>
          <Typography component="span" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            Average WPM
          </Typography>
        </Box>

        <Box className="card" sx={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Box className="icon-badge icon-badge-emerald" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">track_changes</span>
          </Box>
          <Typography component="span" sx={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            0%
          </Typography>
          <Typography component="span" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            Average Accuracy
          </Typography>
        </Box>

        <Box className="card" sx={{ alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Box className="icon-badge icon-badge-blue" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-icons-outlined">emoji_events</span>
          </Box>
          <Typography component="span" sx={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--accent-color)", lineHeight: 1, display: "block" }}>
            0
          </Typography>
          <Typography component="span" sx={{ fontSize: "0.9rem", color: "var(--sub-color)", fontWeight: "600", display: "block" }}>
            Practice Sessions
          </Typography>
        </Box>
      </Box>

      {/* Why Choose TypeBrush Section */}
      <Box
        component="section"
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}
      >
        <Typography component="h2" sx={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--main-color)", letterSpacing: "-0.02em" }}>
          Why Choose <span className="highlight-emerald">TypeBrush</span>?
        </Typography>

        <Box className="grid-cards">
          <Box className="card" sx={{ textAlign: "left", gap: "0.75rem" }}>
            <Box className="icon-badge icon-badge-emerald" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">trending_up</span>
            </Box>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Track Progress
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Monitor your improvement with detailed statistics, speed metrics, and instant character accuracy feedback.
            </Typography>
          </Box>

          <Box className="card" sx={{ textAlign: "left", gap: "0.75rem" }}>
            <Box className="icon-badge icon-badge-purple" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">school</span>
            </Box>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Structured Practice
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Work through beginner to advanced paragraph drills and practice passages to build muscle memory.
            </Typography>
          </Box>

          <Box className="card" sx={{ textAlign: "left", gap: "0.75rem" }}>
            <Box className="icon-badge icon-badge-orange" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">military_tech</span>
            </Box>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Endurance Drills
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Practice numeric typing, timed 1-to-10 minute tests, and prose passages to prepare for typing exams.
            </Typography>
          </Box>

          <Box className="card" sx={{ textAlign: "left", gap: "0.75rem" }}>
            <Box className="icon-badge icon-badge-teal" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-icons-outlined">bolt</span>
            </Box>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Real-time Feedback
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.85, lineHeight: "1.5rem", margin: 0 }}>
              Get instant feedback on your typing speed with live error calculation and character color validation.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Popular Tests Grid */}
      <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Typography component="h2" sx={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--main-color)", letterSpacing: "-0.02em" }}>
          Popular Typing Tests
        </Typography>
        <Box className="grid-cards">
          <Link href="/typing-test/1-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Sprint</span>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              1 Minute Test
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              A quick speed-run test to check your baseline WPM typing performance.
            </Typography>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/2-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Standard</span>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              2 Minute Test
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Check your consistency and accuracy limits on a standard duration test.
            </Typography>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/5-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Focus</span>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              5 Minute Test
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Build keyboard stamina and maintain focus over intermediate intervals.
            </Typography>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/10-minute" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Exam Prep</span>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              10 Minute Test
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Professional certification-level timed test for exam and job readiness.
            </Typography>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>

          <Link href="/typing-test/number" className="card" style={{ gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-color)" }}>Numeric</span>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Number Typing Test
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
              Practice typing numbers and special sequences for data entry roles.
            </Typography>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "bold", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              Take Test <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
            </span>
          </Link>
        </Box>
      </Box>

      {/* Educational & WPM Formula */}
      <Box className="card" component="section" sx={{ gap: "1.25rem" }}>
        <Typography component="h2" sx={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--main-color)", letterSpacing: "-0.02em", margin: 0 }}>
          How Typing Speed Is Measured
        </Typography>
        <Typography component="p" sx={{ lineHeight: "1.6rem", margin: 0 }}>
          Typing speed is calculated in Words Per Minute (WPM). A standard &ldquo;word&rdquo; is defined as 5 keystrokes (including spaces and punctuation).
        </Typography>
        <Box sx={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--accent-color)", backgroundColor: "var(--bg-color)", padding: "1.25rem", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", fontWeight: "600" }}>
          WPM = (Total Correct Characters / 5) / (Time Elapsed in Minutes)
        </Box>
        <Typography component="p" sx={{ lineHeight: "1.6rem", margin: 0 }}>
          Accuracy is the percentage of correct keystrokes out of the total inputs. Focus on accuracy first: speed will naturally follow once your fingers memorize key locations.
        </Typography>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Typography component="h2" sx={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--main-color)", letterSpacing: "-0.02em" }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <Box className="card" sx={{ gap: "0.5rem" }}>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              What is a good typing speed?
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              The average typing speed is about 40 WPM. Professional typists usually range between 65 to 80 WPM, while competitive typists exceed 100 WPM.
            </Typography>
          </Box>
          <Box className="card" sx={{ gap: "0.5rem" }}>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              Do I need to sign up to save my progress?
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              No! TypeBrush is designed to be fully functional without accounts. All calculations and logic run client-side in your browser.
            </Typography>
          </Box>
          <Box className="card" sx={{ gap: "0.5rem" }}>
            <Typography component="h3" sx={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--main-color)", margin: 0 }}>
              How can I type faster?
            </Typography>
            <Typography component="p" sx={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5rem", margin: 0 }}>
              Use all ten fingers on the keyboard and rest them on the home row (ASDF JKL;). Try to keep your eyes on the screen instead of looking down, and practice consistently for 10 minutes every day.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
