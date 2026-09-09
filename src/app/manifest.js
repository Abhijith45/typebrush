export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "TypeBrush - Online Typing Speed Test",
    short_name: "TypeBrush",
    description: "Take free online typing tests, check your WPM & accuracy, and practice with targeted drills.",
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e2e",
    theme_color: "#e2b714",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
