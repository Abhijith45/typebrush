/**
 * Formats normalized typing test result data into shareable title, text, and production URL.
 */

export function buildShareContent({
  wpm = 0,
  accuracy = 100,
  errors = 0,
  testName = "Typing Test",
  canonicalPath = "/typing-test"
}) {
  const BASE_URL = "https://typebrush.in";
  
  // Ensure path starts with a single slash and is clean
  let cleanPath = canonicalPath || "/typing-test";
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  
  const fullUrl = `${BASE_URL}${cleanPath}`;
  const title = "My TypeBrush Typing Score";
  const text = `⌨️ I just scored ${wpm} WPM with ${accuracy}% accuracy on a ${testName} at TypeBrush. Can you beat my score? Try the free typing test at`;

  return {
    title,
    text,
    url: fullUrl,
    fullCopyText: `${text}\n\n${fullUrl}`
  };
}
