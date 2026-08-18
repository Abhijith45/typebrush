import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MuiThemeProvider from "@/theme/muiThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://typebrush.netlify.app"),
  title: {
    default: "Free Typing Test Online - Check Your WPM & Accuracy | TypeBrush",
    template: "%s"
  },
  description: "Take a free online typing test and check your WPM and accuracy. Practice with timed tests, paragraphs, passages, and targeted Typing Gym drills. No account required.",
  keywords: [
    "typing test",
    "online typing test",
    "typing speed test",
    "free typing test",
    "typing practice",
    "WPM test",
    "words per minute",
    "number typing test",
    "typing test for beginners",
    "10 finger typing",
    "SSC typing test",
    "typing speed check",
    "keyboard practice",
    "touch typing"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Free Typing Test Online - Check Your WPM & Accuracy | TypeBrush",
    description: "Test and improve your typing speed for free. Timed tests, targeted Typing Gym drills, and personalized weak-key recommendations. No account needed.",
    url: "https://typebrush.netlify.app",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Typing Test Online - Check Your WPM & Accuracy | TypeBrush",
    description: "Test and improve your typing speed for free. Timed tests, targeted drills, and personalized weak-key recommendations.",
    site: "@typebrush"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <BottomNav />
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
