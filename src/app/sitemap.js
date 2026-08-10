export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://typebrush.in";
  const routes = [
    "",
    "/typing-test",
    "/typing-test/1-minute",
    "/typing-test/2-minute",
    "/typing-test/5-minute",
    "/typing-test/10-minute",
    "/typing-test/number",
    "/typing-practice",
    "/typing-practice/english-paragraph",
    "/typing-practice/english-passage",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
