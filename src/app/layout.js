import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://typebrush.in"),
  title: {
    default: "Free Typing Tests & Practice Online | TypeBrush",
    template: "%s | TypeBrush"
  },
  description: "Test and improve your typing speed and accuracy with our free online typing test. Practice with timed tests, numbers, and custom passages.",
  keywords: ["typing test", "typing speed test", "typing practice", "online typing test", "WPM test", "number typing test"],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Free Typing Tests & Practice Online | TypeBrush",
    description: "Build speed, test accuracy, and improve weak keys with browser-based keyboard typing drills.",
    url: "https://typebrush.in",
    siteName: "TypeBrush",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Typing Tests & Practice Online | TypeBrush",
    description: "Build speed, test accuracy, and improve weak keys with browser-based keyboard typing drills."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
