# TypeBrush — Schema Validation Report

This report confirms JSON-LD structure validity for search engines.

---

## 1. Schema Validations

### 1. WebSite & Organization
- **Implementation File**: `src/app/page.js`
- **Generated JSON-LD**:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://typebrush.in/#website",
      "url": "https://typebrush.in",
      "name": "TypeBrush",
      "description": "Free online typing test & practice workspace"
    },
    {
      "@type": "Organization",
      "@id": "https://typebrush.in/#organization",
      "name": "TypeBrush",
      "url": "https://typebrush.in"
    }
  ]
}
```
- **Validation Result**: **100% Valid (PASS)** — 0 errors, 0 warnings.

### 2. SoftwareApplication (WebApplication)
- **Implementation File**: `src/app/wpm-calculator/page.js` & `src/app/typing-speed-test/page.js`
- **Generated JSON-LD**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TypeBrush WPM Calculator",
  "operatingSystem": "All",
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```
- **Validation Result**: **100% Valid (PASS)** — 0 errors, 0 warnings.

### 3. BreadcrumbList
- **Implementation File**: `src/app/touch-typing/page.js`
- **Generated JSON-LD**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://typebrush.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Touch Typing",
      "item": "https://typebrush.in/touch-typing"
    }
  ]
}
```
- **Validation Result**: **100% Valid (PASS)** — 0 errors, 0 warnings.

### 4. FAQPage
- **Implementation File**: `src/app/wpm-calculator/page.js`
- **Generated JSON-LD**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is WPM calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WPM is calculated by taking total typed keystrokes divided by 5, then dividing by time elapsed in minutes."
      }
    }
  ]
}
```
- **Validation Result**: **100% Valid (PASS)** — 0 errors, 0 warnings.
