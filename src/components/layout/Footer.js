"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--surface-color)",
        color: "var(--sub-color)",
        fontSize: "0.9rem",
        marginTop: "auto",
        position: "relative",
        zIndex: 1
      }}
    >
      <Box
        className="footer-inner"
        sx={{
          maxWidth: "var(--max-width)",
          width: "100%",
          margin: "0 auto",
          padding: { xs: "1.5rem 1rem 2rem 1rem", md: "2.5rem 1rem 3rem 1rem" },
          paddingBottom: { xs: '6rem', sm: '6rem', md: '3rem' },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }
        }}
      >
        <Grid2 container rowGap={{xs:'1rem',sm:'1.5rem',md:'2rem'}}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            {/* Brand Info Column */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: {xs:"0.85rem",md:"1rem"} }}>
              <Link
                href="/"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "800",
                  color: "var(--main-color)",
                  letterSpacing: "-0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Box
                  className="icon-badge icon-badge-emerald"
                  sx={{
                    width: "34px",
                    height: "34px",
                    fontSize: "1.1rem",
                    margin: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <span className="material-icons-outlined">keyboard</span>
                </Box>
                <span>
                  Type<span className="highlight-emerald">Brush</span>
                </span>
              </Link>
              <Typography
                component="p"
                sx={{
                  fontSize: "0.85rem",
                  opacity: 0.75,
                  maxWidth: "415px",
                  lineHeight: "1.5rem",
                  margin: 0
                }}
              >
                The fastest way to master touch typing and improve your WPM with real-time statistics and targeted practice sessions.
              </Typography>
              <Box sx={{ display: "flex", gap: "0.6rem" }}>
                <a href="#" className="social-circle" aria-label="Social Link 1">
                  <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                    public
                  </span>
                </a>
                <a href="#" className="social-circle" aria-label="Social Link 2">
                  <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                    code
                  </span>
                </a>
                <a href="#" className="social-circle" aria-label="Social Link 3">
                  <span className="material-icons-outlined" style={{ fontSize: "1rem" }}>
                    groups
                  </span>
                </a>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box
              className="footer-grid"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
                gap: { xs: "1.25rem", sm: "2rem", md: "2.5rem" }
              }}
            >
              {/* Typing Tests Column */}
              <Box>
                <Typography
                  component="h4"
                  sx={{
                    color: "var(--main-color)",
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    marginBottom: { xs: "0.75rem", md: "1rem" }
                  }}
                >
                  Typing Tests
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "0.45rem", md: "0.6rem" },
                    fontSize: "0.85rem",
                    padding: 0,
                    margin: 0
                  }}
                >
                  <li>
                    <Link href="/typing-test">Standard Test</Link>
                  </li>
                  <li>
                    <Link href="/typing-test/1-minute">1 Minute Test</Link>
                  </li>
                  <li>
                    <Link href="/typing-test/2-minute">2 Minute Test</Link>
                  </li>
                  <li>
                    <Link href="/typing-test/5-minute">5 Minute Test</Link>
                  </li>
                  <li>
                    <Link href="/typing-test/10-minute">10 Minute Test</Link>
                  </li>
                  <li>
                    <Link href="/typing-test/number">Number Test</Link>
                  </li>
                </Box>
              </Box>

              {/* Practice Programs Column */}
              <Box>
                <Typography
                  component="h4"
                  sx={{
                    color: "var(--main-color)",
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    marginBottom: { xs: "0.75rem", md: "1rem" }
                  }}
                >
                  Gym & Practice
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "0.45rem", md: "0.6rem" },
                    fontSize: "0.85rem",
                    padding: 0,
                    margin: 0
                  }}
                >
                  <li>
                    <Link href="/typing-gym" style={{ fontWeight: "700", color: "var(--accent-color)" }}>
                      Typing Gym
                    </Link>
                  </li>
                  <li>
                    <Link href="/typing-practice">Practice Overview</Link>
                  </li>
                  <li>
                    <Link href="/typing-practice/english-paragraph">Paragraph Practice</Link>
                  </li>
                  <li>
                    <Link href="/typing-practice/english-passage">Passage Practice</Link>
                  </li>
                </Box>
              </Box>

              {/* Legal Column */}
              <Box>
                <Typography
                  component="h4"
                  sx={{
                    color: "var(--main-color)",
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    marginBottom: { xs: "0.75rem", md: "1rem" }
                  }}
                >
                  Legal & Trust
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "0.45rem", md: "0.6rem" },
                    fontSize: "0.85rem",
                    padding: 0,
                    margin: 0
                  }}
                >
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms of Service</Link>
                  </li>
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>

        <Box
          sx={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: {xs:"0.85rem", sm:'1rem',md:"1.5rem"},
            display: "flex",
            justifyContent: "space-between",
            flexDirection:{xs:"column",md:'row'},
            alignItems:"center",
            flexWrap: "wrap",
            gap: {xs:"0.55rem",sm:"0.75rem",md:'1rem'},
            fontSize: {xs:"0.75rem",md:'0.85rem'},
            textAlign:{xs:'center',md:'left'}
          }}
        >
          <Typography variant="p">© {currentYear} TypeBrush. Made for typists worldwide.</Typography>
          <Typography variant="p">
            Free typing tool for all |{" "}
            <Link href="/" style={{ color: "var(--accent-color)" }}>
              typebrush.in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
