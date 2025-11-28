# AI Resume Advisor Landing Page - Development Specification

**Version**: 1.0.0
**Created**: 2025-11-27
**Status**: Ready for Development

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Page Structure](#3-page-structure)
4. [Component Specifications](#4-component-specifications)
5. [Design System](#5-design-system)
6. [SEO Strategy](#6-seo-strategy)
7. [Performance Requirements](#7-performance-requirements)
8. [Deployment Guide](#8-deployment-guide)
9. [Integration Points](#9-integration-points)
10. [Development Timeline](#10-development-timeline)

---

## 1. Project Overview

### 1.1 Purpose

Create a high-converting, SEO-optimized landing page for AI Resume Advisor that:

- Attracts organic traffic through search engines
- Clearly communicates product value proposition
- Drives user signups to the Bubble web application

### 1.2 Tech Stack Decision

| Technology | Choice                    | Rationale                                      |
| ---------- | ------------------------- | ---------------------------------------------- |
| Framework  | **Astro 4.x**             | SSG for SEO, fast build, island architecture   |
| Styling    | **Tailwind CSS 3.x**      | Rapid development, consistent design           |
| Deployment | **Azure Static Web Apps** | Integration with existing Azure infrastructure |
| Monitoring | **Application Insights**  | Unified monitoring with backend API            |
| CI/CD      | **GitHub Actions**        | Native Azure SWA integration                   |

### 1.3 Target Metrics

| Metric                   | Target |
| ------------------------ | ------ |
| Lighthouse Performance   | > 90   |
| Lighthouse SEO           | > 95   |
| Lighthouse Accessibility | > 90   |
| First Contentful Paint   | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift  | < 0.1  |
| Time to Interactive      | < 3.5s |

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Production Architecture                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   GoDaddy DNS                                                       │
│   ├── airesumeadvisor.com      → Azure Static Web Apps             │
│   ├── www.airesumeadvisor.com  → Azure Static Web Apps (redirect)  │
│   └── app.airesumeadvisor.com  → Bubble.io                         │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  Azure Static Web Apps                                       │  │
│   │  ├── Region: Global CDN                                      │  │
│   │  ├── SSL: Auto-managed                                       │  │
│   │  ├── Hosting: Landing Page (Astro SSG)                       │  │
│   │  └── Monitoring: Application Insights                        │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              │ CTA Click (redirect)                 │
│                              ▼                                      │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  Bubble.io (app.airesumeadvisor.com)                         │  │
│   │  ├── User Authentication                                     │  │
│   │  ├── Database                                                │  │
│   │  ├── Resume Editor UI                                        │  │
│   │  └── API Connector → Azure Container API                     │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              │ API Calls                            │
│                              ▼                                      │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  Azure Container Apps (Backend)                              │  │
│   │  ├── FastAPI + GPT-4.1                                       │  │
│   │  ├── 12 API Endpoints                                        │  │
│   │  └── Japan East Region                                       │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Repository Structure

```
airesumeadvisor-landing/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # Base HTML structure
│   ├── pages/
│   │   ├── index.astro               # Main landing page
│   │   ├── terms.astro               # Terms of Service
│   │   └── privacy.astro             # Privacy Policy
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.astro          # Reusable button
│   │   │   ├── Container.astro       # Max-width wrapper
│   │   │   └── SectionTitle.astro    # Section headings
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── FeatureTabs.astro
│   │   ├── JobSimulator.astro
│   │   ├── SocialProof.astro
│   │   ├── CTABanner.astro
│   │   ├── HowItWorks.astro
│   │   ├── Pricing.astro
│   │   ├── BottomCTA.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css
│   └── config/
│       └── links.ts                  # CTA link configuration
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-mockup.webp
│   │   ├── features/
│   │   │   ├── alignment-report.webp
│   │   │   ├── tailored-resume.webp
│   │   │   └── self-development.webp
│   │   ├── job-simulator.webp
│   │   └── testimonials/
│   │       ├── person-1.webp
│   │       ├── person-2.webp
│   │       └── person-3.webp
│   ├── videos/
│   │   └── how-it-works.mp4          # Or YouTube embed
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── robots.txt
├── docs/
│   └── DEVELOPMENT_SPEC.md           # This document
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── CLAUDE.md
└── README.md
```

---

## 3. Page Structure

### 3.1 Landing Page Sections (index.astro)

Based on the Figma design, the page consists of these sections in order:

| #   | Section       | Component            | Estimated Height |
| --- | ------------- | -------------------- | ---------------- |
| 1   | Header        | `Header.astro`       | 80px (sticky)    |
| 2   | Hero          | `Hero.astro`         | 100vh            |
| 3   | Features      | `FeatureTabs.astro`  | ~600px           |
| 4   | Job Simulator | `JobSimulator.astro` | ~500px           |
| 5   | Social Proof  | `SocialProof.astro`  | ~400px           |
| 6   | CTA Banner    | `CTABanner.astro`    | ~300px           |
| 7   | How it Works  | `HowItWorks.astro`   | ~500px           |
| 8   | Pricing       | `Pricing.astro`      | ~600px           |
| 9   | Bottom CTA    | `BottomCTA.astro`    | ~350px           |
| 10  | Footer        | `Footer.astro`       | ~100px           |

### 3.2 Additional Pages

| Page             | URL        | Purpose                 |
| ---------------- | ---------- | ----------------------- |
| Terms of Service | `/terms`   | Legal requirements      |
| Privacy Policy   | `/privacy` | GDPR/privacy compliance |

---

## 4. Component Specifications

### 4.1 Header Component

```astro
<!-- Header.astro -->Props: None (static content) Structure: ├── Logo (left) │ └── Link to "/" ├──
Navigation (center) │ ├── About (anchor: #features) │ ├── How it works (anchor: #how-it-works) │ └──
Pricing (anchor: #pricing) ├── Actions (right) │ ├── Log In (text link → app.domain/login) │ └──
Sign Up Free (button → app.domain/signup) └── Mobile Menu (hamburger) Behavior: - Sticky on scroll -
White background with subtle shadow on scroll - Mobile: Hamburger menu with slide-in drawer
```

### 4.2 Hero Component

```astro
<!-- Hero.astro -->Props: None (static content) Structure: ├── Left Column (55%) │ ├── Headline:
"Land Your Dream Job with AI-Powered Resumes" │ ├── Subtext: Product description │ ├── CTA Button:
"Sign Up Free →" │ └── Badge: "Sponsored by Microsoft" (optional) └── Right Column (45%) └── Product
Screenshot (macOS mockup) Responsive: - Desktop: Two columns - Tablet: Stacked, image below -
Mobile: Text only, smaller image
```

### 4.3 FeatureTabs Component

```astro
<!-- FeatureTabs.astro -->Props: None (static content) Structure: ├── Section Title: "Unlock Dream
Career with AI Hub" ├── Tab Navigation │ ├── Tab 1: "Alignment Assessment Report" (active default) │
├── Tab 2: "Tailored Resume" │ └── Tab 3: "Self-Development Suggestion" └── Tab Content (changes
based on active tab) ├── Left: Screenshot ├── Right: Title + Description + CTA Behavior: -
Client-side tab switching (minimal JS) - Use Astro's client:visible for hydration - Smooth fade
transition between tabs
```

### 4.4 Pricing Component

```astro
<!-- Pricing.astro -->Props: None (static content) Structure: ├── Section Title: "Pricing" ├──
Pricing Cards Container │ ├── Card 1: Daily Pass │ │ ├── Price: "$10" │ │ ├── Period: "1 Day" │ │
└── CTA: "Buy Now" (outline style) │ └── Card 2: Weekly Pass (highlighted) │ ├── Badge: "Popular" │
├── Price: "$20" │ ├── Period: "7 Days" │ └── CTA: "Buy Now" (filled style) └── Free Features List
├── ✓ Unlimited alignment assessments ├── ✓ Instant ATS-compatible resume revisions ├── ✓
Personalized recommendations ├── ✓ Course suggestions for missing skills ├── ✓ Before/after
comparison └── ℹ️ "Get 10 free credits daily..." CTA Links: - Buy Now →
app.airesumeadvisor.com/pricing
```

---

## 5. Design System

### 5.1 Color Palette

```css
:root {
  /* Primary */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;

  /* Secondary */
  --color-secondary: #10b981;
  --color-secondary-hover: #059669;

  /* Neutrals */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-bg-white: #ffffff;
  --color-bg-light: #f9fafb;
  --color-bg-gray: #f3f4f6;
  --color-border: #e5e7eb;

  /* Gradients */
  --gradient-cta: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  --gradient-dark: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);

  /* Semantic */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

### 5.2 Typography

```css
/* Font Family */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */

/* Heading Styles */
h1: text-5xl/text-4xl(mobile), font-bold, text-gray-900
h2: text-4xl/text-3xl(mobile), font-bold, text-gray-900
h3: text-2xl/text-xl(mobile), font-semibold, text-gray-900
```

### 5.3 Spacing System

Using Tailwind's default spacing scale:

- Section padding: `py-16 md:py-24`
- Component gaps: `gap-8 md:gap-12`
- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### 5.4 Button Styles

```astro
<!-- Primary Button -->
<button
  class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
>
  Sign Up Free
  <svg>→</svg>
</button>

<!-- Secondary/Outline Button -->
<button
  class="rounded-lg border-2 border-blue-600 px-6 py-3 font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50"
>
  Learn More
</button>

<!-- Ghost Button -->
<button class="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700">
  Get Started
  <svg>→</svg>
</button>
```

---

## 6. SEO Strategy

### 6.1 Meta Tags

```html
<!-- Primary Meta Tags -->
<title>AI Resume Advisor - Land Your Dream Job with AI-Powered Resumes</title>
<meta name="title" content="AI Resume Advisor - Land Your Dream Job with AI-Powered Resumes" />
<meta
  name="description"
  content="Create tailored resumes that match job descriptions perfectly. Our AI analyzes keywords, skills, and requirements to help you stand out and get hired faster."
/>
<meta
  name="keywords"
  content="AI resume builder, resume optimizer, ATS resume, job application, career tools, resume tailoring"
/>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://airesumeadvisor.com/" />
<meta property="og:title" content="AI Resume Advisor - Land Your Dream Job" />
<meta
  property="og:description"
  content="Create tailored resumes that match job descriptions perfectly."
/>
<meta property="og:image" content="https://airesumeadvisor.com/images/og-image.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://airesumeadvisor.com/" />
<meta property="twitter:title" content="AI Resume Advisor - Land Your Dream Job" />
<meta
  property="twitter:description"
  content="Create tailored resumes that match job descriptions perfectly."
/>
<meta property="twitter:image" content="https://airesumeadvisor.com/images/og-image.png" />
```

### 6.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AI Resume Advisor",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "10.00",
    "priceCurrency": "USD"
  },
  "description": "AI-powered resume builder that tailors your resume to job descriptions",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000"
  }
}
```

### 6.3 Technical SEO

- [x] Semantic HTML5 elements
- [x] Proper heading hierarchy (single h1)
- [x] Alt text for all images
- [x] robots.txt configuration
- [x] XML sitemap generation
- [x] Canonical URLs
- [x] Mobile-friendly design
- [x] Fast loading (< 2s)

---

## 7. Performance Requirements

### 7.1 Image Optimization

| Image Type          | Format | Max Size | Dimensions |
| ------------------- | ------ | -------- | ---------- |
| Hero mockup         | WebP   | 150KB    | 800x600    |
| Feature screenshots | WebP   | 100KB    | 600x400    |
| Testimonial photos  | WebP   | 30KB     | 200x200    |
| Logo                | SVG    | 5KB      | -          |

### 7.2 Asset Loading Strategy

```astro
<!-- Critical CSS inlined -->
<style is:inline>
  /* Above-the-fold styles */
</style>

<!-- Fonts preloaded -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />

<!-- Images lazy loaded -->
<img loading="lazy" decoding="async" ... />

<!-- Below-fold components -->
<FeatureTabs client:visible />
```

### 7.3 Bundle Size Targets

| Asset                    | Target  | Actual |
| ------------------------ | ------- | ------ |
| HTML                     | < 50KB  | TBD    |
| CSS                      | < 30KB  | TBD    |
| JS                       | < 20KB  | TBD    |
| Total (excluding images) | < 100KB | TBD    |

---

## 8. Deployment Guide

### 8.1 Azure Static Web Apps Setup

1. **Create Resource**

```bash
az staticwebapp create \
  --name airesumeadvisor-landing \
  --resource-group airesumeadvisorfastapi \
  --source https://github.com/YOUR_USERNAME/airesumeadvisor-landing \
  --location "East Asia" \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

2. **Configure Custom Domain (GoDaddy)**

```
# DNS Records to add in GoDaddy
Type    Name    Value                                         TTL
────────────────────────────────────────────────────────────────────
CNAME   www     <random>.azurestaticapps.net                  1h
TXT     @       <validation-token>                            1h
A       @       <Azure provided IP>                           1h
```

3. **Environment Variables**

```bash
az staticwebapp appsettings set \
  --name airesumeadvisor-landing \
  --setting-names \
    PUBLIC_BUBBLE_APP_URL=https://app.airesumeadvisor.com \
    PUBLIC_APP_INSIGHTS_KEY=<key>
```

### 8.2 GitHub Actions Workflow

```yaml
# .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          app_location: '/'
          output_location: 'dist'
          skip_app_build: true

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: 'close'
```

---

## 9. Integration Points

### 9.1 Bubble Integration

| Action      | Landing Page | Bubble                   |
| ----------- | ------------ | ------------------------ |
| Sign Up     | Redirect     | Handle registration      |
| Log In      | Redirect     | Handle authentication    |
| Pricing CTA | Redirect     | Display pricing/checkout |
| Get Started | Redirect     | Dashboard or onboarding  |

### 9.2 Application Insights

```typescript
// src/config/appInsights.ts
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: import.meta.env.PUBLIC_APP_INSIGHTS_KEY,
    enableAutoRouteTracking: true,
    enableRequestHeaderTracking: true,
  },
});

appInsights.loadAppInsights();
appInsights.trackPageView();

export { appInsights };
```

### 9.3 CORS Configuration (Backend Update)

The Azure Container API needs to allow the landing page domain:

```python
# src/core/config.py (already exists)
cors_origins: str = "https://airesumeadvisor.com,https://www.airesumeadvisor.com,https://airesumeadvisor.bubbleapps.io,http://localhost:3000"
```

---

## 10. Development Timeline

### Phase 1: Setup (Day 1) - 2-3 hours

- [x] Create project repository
- [x] Initialize Astro project
- [x] Configure Tailwind CSS
- [x] Set up project structure
- [ ] Create base Layout component

### Phase 2: Core Components (Day 1-2) - 6-8 hours

- [ ] Header component (sticky, responsive)
- [ ] Hero section
- [ ] Footer component
- [ ] Common components (Button, Container)

### Phase 3: Feature Sections (Day 2-3) - 6-8 hours

- [ ] FeatureTabs component (with JS hydration)
- [ ] JobSimulator section
- [ ] SocialProof section
- [ ] CTABanner component

### Phase 4: Conversion Sections (Day 3) - 4-5 hours

- [ ] HowItWorks section (video embed)
- [ ] Pricing component
- [ ] BottomCTA component

### Phase 5: Polish & Deploy (Day 4) - 4-5 hours

- [ ] Responsive testing
- [ ] Image optimization
- [ ] SEO implementation
- [ ] Azure Static Web Apps deployment
- [ ] DNS configuration
- [ ] Final testing

**Total Estimated Time**: 20-28 hours

---

## Appendix A: CTA Link Reference

```typescript
// src/config/links.ts
export const LINKS = {
  // Main CTAs
  signup: 'https://app.airesumeadvisor.com/signup',
  login: 'https://app.airesumeadvisor.com/login',

  // Feature CTAs
  getStarted: 'https://app.airesumeadvisor.com/signup',
  tryFree: 'https://app.airesumeadvisor.com/signup',

  // Pricing CTAs
  buyDaily: 'https://app.airesumeadvisor.com/pricing?plan=daily',
  buyWeekly: 'https://app.airesumeadvisor.com/pricing?plan=weekly',

  // Legal
  terms: '/terms',
  privacy: '/privacy',

  // Social (if needed)
  twitter: 'https://twitter.com/airesumeadvisor',
  linkedin: 'https://linkedin.com/company/airesumeadvisor',
} as const;
```

---

## Appendix B: Image Assets Checklist

| Image              | Source | Status      | Notes               |
| ------------------ | ------ | ----------- | ------------------- |
| Logo (SVG)         | Design | [ ] Pending | Need vector version |
| Hero mockup        | Figma  | [ ] Pending | Export from design  |
| Feature: Alignment | Figma  | [ ] Pending | Tab 1 screenshot    |
| Feature: Tailored  | Figma  | [ ] Pending | Tab 2 screenshot    |
| Feature: Self-Dev  | Figma  | [ ] Pending | Tab 3 screenshot    |
| Job Simulator      | Figma  | [ ] Pending | Section screenshot  |
| Testimonial 1      | Stock  | [ ] Pending | Professional woman  |
| Testimonial 2      | Stock  | [ ] Pending | Professional group  |
| Testimonial 3      | Stock  | [ ] Pending | Professional man    |
| How it Works video | Record | [ ] Pending | Demo video          |
| OG Image           | Create | [ ] Pending | 1200x630px          |
| Favicon            | Design | [ ] Pending | Multi-size          |

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-27
**Author**: Claude Code + WenHao
