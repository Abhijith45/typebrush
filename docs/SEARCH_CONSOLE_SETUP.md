# TypeBrush — Search Console Setup & Readiness Configuration

This report details indexing rules and structures verified for Search Console submissions.

---

## 1. Crawl Verification Matrix

- **Sitemap Target Location**: `https://typebrush.in/sitemap.xml`
- **Canonical Structure Template**: `https://typebrush.in/{page-slug}` (Enforced statically on server responses)
- **Robots Rules**:
  - Allowed user-agent: `*`
  - Allowed paths: `/`, `/typing-test`, `/typing-speed-test`, `/touch-typing`, `/wpm-calculator`, `/typing-gym`, `/typing-practice`
  - Disallowed paths: None.
