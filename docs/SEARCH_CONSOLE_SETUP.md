# TypeBrush — Google Search Console Setup & Verification Guide

This document outlines the steps required to verify ownership of `typebrush.in` in Google Search Console, submit the sitemap, and initiate index coverage.

---

## 1. Domain vs URL Prefix Verification

### Option A: DNS Record Verification (Recommended)
This covers all subdomains (e.g. `www.typebrush.in`) and both HTTP/HTTPS protocols.
1. Add property `typebrush.in` under **Domain** in Search Console.
2. Copy the TXT record token (`google-site-verification=...`).
3. Add the TXT record to the domain name registrar (e.g. GoDaddy, Namecheap) DNS configuration.
4. Click **Verify** in Search Console.

### Option B: HTML Tag Verification (Netlify Export)
Since TypeBrush is deployed as a static site, we can insert the verification tag inside `src/app/layout.js`:
1. Add property `https://typebrush.in` under **URL Prefix**.
2. Copy the `<meta name="google-site-verification" content="..." />` tag.
3. Insert this tag inside `<head>` in `src/app/layout.js`.

---

## 2. Sitemap Submission

1. Ensure the static build exports `sitemap.xml` to the public root.
2. In Search Console, navigate to **Sitemaps**.
3. Under **Add a new sitemap**, type `sitemap.xml` and click **Submit**.
4. Verify status says **Success**.

---

## 3. Crawl & Indexing Checklist

| Task | Validation Action | Expected Status |
| :--- | :--- | :--- |
| **Robots.txt Probe** | Inspect `https://typebrush.in/robots.txt` | Returns `User-agent: * Allow: /` |
| **Canonical Inspect** | View Page Source on `/typing-gym` | Contains `<link rel="canonical" href="https://typebrush.in/typing-gym" />` |
| **Mobile-Friendly Check** | Run mobile testing tool on homepage | Passes viewport config tests |
| **Schema Validation** | Inspect pages on Schema Markup Validator | No warnings for FAQPage or BreadcrumbList |
