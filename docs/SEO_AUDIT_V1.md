# TypeBrush — Search Engine Optimization Audit (V1)

This audit documents the indexability, technical configurations, search visibility factors, and quick-win content opportunities of TypeBrush.

---

## 1. Technical SEO & Crawlability Status

### Indexability Factors
- **Sitemap & Robots**: Sitemap and robots files exist. They are compiled statically during Next.js exports.
- **Canonical URLs**: Canonical links are declared statically in the metadata configuration of all app router layouts, directing crawler authority to `https://typebrush.in/...`.
- **SSR Hydration Boundaries**: Refactored static shells (`Footer.js`, `Header.js`, and `page.js`) from Emotion elements to standard HTML. This prevents client hydration mismatches and ensures Googlebot indexes layout text on the first pass.
- **Microdata Schema**: JSON-LD Breadcrumbs, SiteSearch, and WebSite schemas are configured inside the header wrapper.

---

## 2. Strengths & Weaknesses

### Core Strengths
1. **Lightweight & High Performance**: Fast Core Web Vitals (LCP < 1.2s, CLS = 0, INP < 50ms) due to client-side static rendering and deferred packages bundling (e.g. jsPDF is lazy-loaded).
2. **Semantic Hierarchy**: H1-H3 headers are structured logically.
3. **No Duplicate Slugs**: Clean canonical links direct crawlers away from index variants.

### Core Weaknesses
1. **Low Keyword Footprint**: Missing dedicated landing pages for popular search query clusters like "touch typing guide", "typing speed test", and "WPM calculator".
2. **Shallow Content Depth**: Existing practice directories and timers lack detailed, high-word-count educational context (800+ words).
3. **Weak Internal Link Cluster**: Home, Gym, and practice pages are decoupled from each other, diluting anchor text authority.

---

## 3. SEO Optimization Plan

### Quick Wins (Sprint 5)
1. **Build Dedicated Slugs**: Create `/touch-typing`, `/typing-speed-test`, and `/wpm-calculator`.
2. **Interactive Tools (Link Bait)**: Build a live, client-side calculator on `/wpm-calculator` to capture calculator-intent search traffic.
3. **Structured FAQ Schemas**: Add `FAQPage` schema validation scripts on all indexable landing pages.
4. **Decouple Dynamic Timers**: Ensure `/typing-test/1-minute` etc., render specific metadata and localized canonical pointers.
