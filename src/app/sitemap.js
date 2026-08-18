export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://typebrush.netlify.app";
  const routes = [
    "",
    "/typing-test",
    "/typing-speed-test",
    "/typing-gym",
    "/touch-typing",
    "/wpm-calculator",
    "/typing-practice",
    "/typing-test/1-minute",
    "/typing-test/2-minute",
    "/typing-test/5-minute",
    "/typing-test/10-minute",
    "/typing-test/number",
    "/typing-practice/english-paragraph",
    "/typing-practice/english-passage",
    "/about",
    "/privacy",
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
