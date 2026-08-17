# TypeBrush — Social Sharing Preview Validation Report

This report confirms the presentation of OpenGraph (OG) and Twitter card metadata when links are shared across platforms.

---

## 1. Social Sharing Preview Matrix

| Target Route | OpenGraph Image | Title Present | Description | Truncation Issues | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Default Banner | TypeBrush | Free typing test... | No (Under 155 chars) | **PASS** |
| `/typing-gym` | Default Banner | Typing Gym | Train weak keys... | No (Under 155 chars) | **PASS** |
| `/touch-typing` | Default Banner | Touch Typing Guide | Master the art... | No (Under 155 chars) | **PASS** |
| `/wpm-calculator` | Default Banner | WPM Calculator | Calculate speed... | No (Under 155 chars) | **PASS** |

---

## 2. Platforms Checked & Verified

- [x] **WhatsApp**: Visual preview snippet and descriptive text load correctly.
- [x] **Twitter/X**: Twitter Card layout (`summary_large_image`) pulls headings.
- [x] **LinkedIn / Facebook**: Header tags and site properties align.
- [x] **Discord**: Markdown embeds map details properly.
