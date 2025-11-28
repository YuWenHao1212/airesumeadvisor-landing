# AI Resume Advisor Landing Page - Design Summary

> Generated from Figma screenshots on 2025-11-27

---

## Overview

| Attribute           | Value                                     |
| ------------------- | ----------------------------------------- |
| **Style**           | Modern SaaS, Clean, Professional          |
| **Primary Color**   | `#0183FF` (Blue)                          |
| **Background**      | Light gray `#F5F5F5` to white gradient    |
| **Accent Gradient** | Blue `#0183FF` → Purple `#8B5CF6`         |
| **Typography**      | Sans-serif, bold headlines                |
| **Target Audience** | Job seekers (fresh grads + professionals) |

---

## Page Sections (9 Total)

### 1. Header (Sticky)

```
[Logo + "AI Resume Advisor"]     About   How it works   Pricing     Log In   [Sign Up Free →]
```

- **Logo**: Lightbulb icon with person silhouette
- **Nav Items**: About, How it works, Pricing
- **CTAs**:
  - Log In (text link, blue)
  - Sign Up Free (filled button, blue with arrow)

---

### 2. Hero Section

**Layout**: Two columns (text left, mockup right)

**Content**:

- **Headline**: "Land Your Dream Job with AI-Powered Resumes"
- **Subheadline**: "Get a resume tailored to each job posting, using the right keywords to stand out. Our AI Resume Builder analyzes job descriptions and your LinkedIn profile to create a personalized, optimized resume that gives you the competitive edge. Start building a resume that matches your next opportunity effortlessly"
- **CTA**: "Sign Up Free →" (blue button)
- **Trust Badge**: "Sponsored by Microsoft" logo

**Visual**:

- MacBook mockup with floating UI cards
- Cards show: LinkedIn Profile URL, Job Alignment Score 83%, Recommended Courses

---

### 3. Features Section (Tabs)

**Title**: "Unlock Dream Career with AI Hub"

**3 Tabs**:

| Tab | Title                       | Description                                                                                                                           |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Alignment Assessment Report | "AI-Powered Resume Alignment: Perfect Your Fit" - Instantly see how well your LinkedIn profile and resume align with your target job. |
| 2   | Tailored Resume             | "Upskill Smarter: Personalized Growth Recommendations" - Our AI analyses your resume and target job to identify skill gaps.           |
| 3   | Self-Development Suggestion | "Upskill Smarter: Personalized Growth Recommendations" - Recommends courses, certifications, and learning paths.                      |

**Visual**: MacBook with floating cards showing relevant feature

---

### 4. Job Alignment Simulator

**Layout**: Two columns (text left, mockup right)

**Content**:

- **Headline**: "Find the Fastest Path to Your Ideal Job with our Job Alignment Simulator"
- **Subheadline**: "Discover which skills matter most for your target role. Add a course, certification, or experience to see how your job score improves, guiding your next career move with data-driven insight."
- **CTA**: "Get Started →" (text link, blue)

**Visual**: MacBook with resume editor and floating certificate card

---

### 5. Social Proof

**Layout**: Two columns (images left, text right)

**Content**:

- **Headline**: "Join Thousands of Happy Job Seekers"
- **Subheadline**: "Experience the joy of landing your dream job with a resume that stands out. Our AI Resume Builder has helped thousands of professionals tailor their applications, increasing their chances of success. See the smiles of users who've taken their career to the next level—now it's your turn!"
- **CTA**: "Get Started →" (text link, blue)

**Visual**:

- 3 overlapping photos of happy professionals
- Rounded rectangle cards with slight tilt
- Decorative + symbols in background

---

### 6. How it Works

**Layout**: Two columns (text left, video right)

**Content**:

- **Headline**: "How it Works"
- **Subheadline**: "Simply copy and paste the data from a job description from the original source and leave the rest to us."
- **CTA**: "Get Started →" (text link, blue)

**Visual**:

- Browser window mockup
- Video thumbnail with play button
- Decorative + symbols

---

### 7. Pricing

**Title**: "Pricing"

**Plans**:

| Plan        | Price | Period | Button Style                       |
| ----------- | ----- | ------ | ---------------------------------- |
| Daily Pass  | $10   | 1 Day  | Outline (white bg, blue border)    |
| Weekly Pass | $20   | 7 Days | Filled (blue bg) + "Popular" badge |

**Free Features** (below pricing cards):

- Unlimited alignment assessments
- Instant ATS-compatible resume revisions
- Personalized recommendations
- Course suggestions for missing skills
- Before/after comparison

**Info Banner**: "Get 10 free credits daily to try all premium features at no cost" (light blue bg)

---

### 8. Bottom CTA Banner

**Layout**: Full-width gradient banner

**Style**:

- Background: `linear-gradient(135deg, #0183FF 0%, #8B5CF6 100%)`
- Rounded corners: `~24px`

**Content**:

- **Headline**: "Start Building Your Perfect Resume Today!"
- **Subheadline**: "Don't let your dream job slip away. With our AI Resume Builder, you can create a resume that stands out in minutes. Tailored to the job, optimized for success, and ready to impress."
- **CTA**: "Sign Up Free →" (white/light button on gradient)

---

### 9. Footer

**Layout**: Simple single row

**Content**:

- **Left**: "AI Resume Advisor © 2024. All rights reserved."
- **Right**: Terms | Privacy

**Style**: Light background, minimal design

---

## Visual Elements

### Decorative Elements

- **+ Symbols**: Scattered in various colors (blue, orange, purple, gray)
- **Floating Cards**: UI components floating near mockups
- **MacBook Mockups**: Consistent laptop frame for product screenshots

### Image Style

- **Photos**: Diverse, professional, happy people
- **Card Style**: Rounded corners (8-16px), subtle shadows
- **Mockups**: Realistic device frames

### Icons

- **Checkmarks**: Green filled circles with white check (for features)
- **Arrows**: Right arrow (→) on CTAs
- **Style**: Mix of outline and filled

---

## Component Patterns

### Buttons

```css
/* Primary (Filled) */
.btn-primary {
  background: #0183ff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
}

/* Secondary (Outline) */
.btn-secondary {
  background: white;
  color: #0183ff;
  border: 1px solid #e5e5e5;
  padding: 12px 24px;
  border-radius: 8px;
}

/* Text Link */
.btn-text {
  color: #0183ff;
  font-weight: 500;
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
}
```

### Tabs

```css
/* Inactive */
.tab {
  background: white;
  color: #1d2125;
  border: 1px solid #e5e5e5;
}

/* Active */
.tab-active {
  background: #0183ff;
  color: white;
}
```

---

## Assets Needed

### Images to Export/Create

- [ ] Logo (SVG, transparent)
- [ ] Hero mockup with floating cards
- [ ] Feature tab mockups (3 variations)
- [ ] Job simulator mockup
- [ ] Social proof photos (3)
- [ ] Video thumbnail for How it Works
- [ ] Microsoft logo (for sponsor badge)

### Icons Needed

- [ ] Lightbulb (logo)
- [ ] Arrow right (→)
- [ ] Checkmark (green)
- [ ] Info circle (for pricing banner)
- [ ] Play button (for video)

---

## Development Priority

1. **Header** - Navigation structure
2. **Hero** - First impression, most important
3. **Footer** - Complete page structure
4. **Pricing** - Key conversion section
5. **Features Tabs** - Interactive component
6. **Bottom CTA** - Conversion driver
7. **Social Proof** - Trust building
8. **Job Simulator** - Feature highlight
9. **How it Works** - Video section

---

**Document Version**: 1.0.0
**Created**: 2025-11-27
**Based on**: Figma design screenshots
