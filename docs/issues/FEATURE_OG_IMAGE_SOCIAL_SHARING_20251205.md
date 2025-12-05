# Feature Request: Open Graph Image & Social Sharing Optimization

**Version**: 1.0.0
**Created**: 2025-12-05
**Status**: Completed
**Priority**: High
**Reporter**: Development Team

---

## Summary

The landing page is missing the Open Graph image file (`og-image.png`) referenced in `Layout.astro`. This causes Facebook, LinkedIn, and other social platforms to display no preview image when the website URL is shared, significantly reducing click-through rates and brand visibility.

---

## Problem Statement

### Current State

1. **Missing og:image file**: `Layout.astro` references `/images/og-image.png` but the file does not exist in `public/images/`

2. **Missing recommended og:tags**:
   - `og:site_name` - Website name displayed alongside title
   - `og:locale` - Language/region specification

3. **Impact**: When users share `airesumeadvisor.com` on social media:
   - No preview image appears
   - Reduced engagement and click-through rates
   - Unprofessional appearance compared to competitors

### Files Affected

- `src/layouts/Layout.astro` - Contains og:meta tag definitions
- `public/images/` - Missing og-image.png

---

## Requirements

### REQ-1: Create Open Graph Image

**File**: `public/images/og-image.png`

| Specification | Value                                              |
| ------------- | -------------------------------------------------- |
| Dimensions    | 1200 x 630 px                                      |
| Format        | PNG (or WebP with PNG fallback)                    |
| File Size     | < 300 KB (optimized)                               |
| Safe Zone     | Keep important content within center 1080 x 566 px |

**Design Requirements**:

1. Include AI Resume Advisor logo (prominent placement)
2. Include tagline: "Tailor Your Resume with AI"
3. Use brand colors:
   - Primary: `#2563eb` (Blue)
   - Gradient: `#6366f1` → `#8b5cf6` → `#a855f7`
4. Professional, clean aesthetic matching landing page design
5. Legible at small preview sizes (mobile feeds)
6. Avoid text-heavy design (Facebook may reduce reach for text > 20% of image)

**Visual Concept Suggestions**:

```
+--------------------------------------------------+
|                                                  |
|     [AI Resume Advisor Logo]                     |
|                                                  |
|     "Tailor Your Resume with AI"                 |
|                                                  |
|     [Abstract resume/document visual element]    |
|                                                  |
+--------------------------------------------------+
```

---

### REQ-2: Update Layout.astro Meta Tags

Add the following meta tags to `src/layouts/Layout.astro`:

```astro
<!-- Add after existing og:image tag -->
<meta property="og:site_name" content="AI Resume Advisor" />
<meta property="og:locale" content="en_US" />
```

**Optional Enhancement** - Add fallback for older platforms:

```astro
<!-- LinkedIn specific -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="AI Resume Advisor - Tailor Your Resume with AI" />
```

---

### REQ-3: Optimize og:description

**Current Description** (in Layout.astro):
```
Create tailored resumes that match job descriptions perfectly. Our AI analyzes keywords, skills, and requirements to help you stand out and get hired faster.
```

**Optimization Guidelines**:

| Platform | Max Length | Recommendation |
|----------|------------|----------------|
| Facebook | ~200 chars | Keep under 155 chars for full display |
| LinkedIn | ~300 chars | Can be slightly longer |
| Twitter  | ~200 chars | Keep under 155 chars |

**Brand Messaging Reference** (from Web App Referral Program):

The app uses this core message aligned with brand voice:
> "Know Your Match Before You Apply"

Platform-specific copy already in use (for reference):

| Platform | Pre-filled Text |
|----------|-----------------|
| **Twitter/X** | "Stop guessing if you're qualified—know your match before you apply. AI Resume Advisor shows your alignment score in seconds, not just keyword matches." |
| **Email Subject** | "Know Your Match Before You Apply" |
| **LinkedIn** | Uses og:tags only (no pre-filled text supported) |
| **Facebook** | Uses og:tags only (`quote` param deprecated since 2017) |

**Recommended og:description** (optimized for social sharing):

```
Stop guessing if you're qualified. AI Resume Advisor shows your alignment score instantly—not just keywords, but true semantic matching. Try free!
```
(148 characters - displays fully on all platforms, aligned with brand voice)

**Alternative Options**:

1. **Action-focused** (aligned with Twitter copy):
   ```
   Know your match before you apply. Get instant alignment scores that show how your experience truly fits each role—beyond keyword matching.
   ```

2. **Benefit-focused**:
   ```
   See exactly how you match each job in seconds. AI-powered semantic analysis shows your true fit, not just keyword overlap. Try free today!
   ```

3. **Problem-solution**:
   ```
   Tired of applying blind? AI Resume Advisor analyzes job requirements and shows your alignment score before you apply. Know your match first.
   ```

**Implementation**:

Update the default description in `Layout.astro`:

```diff
  const {
    title,
-   description = 'Create tailored resumes that match job descriptions perfectly. Our AI analyzes keywords, skills, and requirements to help you stand out and get hired faster.',
+   description = 'Stop guessing if you're qualified. AI Resume Advisor shows your alignment score instantly—not just keywords, but true semantic matching. Try free!',
    image = '/images/og-image.png',
  } = Astro.props;
```

---

### REQ-4: Verify Social Sharing Preview

Test the implementation on:

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
3. **Twitter/X**: Use Tweet Composer to preview (Card Validator deprecated)

---

## Technical Implementation

### Step 1: Design og-image.png

Use design tool (Figma/Canva) to create image following REQ-1 specifications.

### Step 2: Optimize Image

```bash
# Optimize PNG (if using ImageOptim or similar)
# Target: < 300 KB file size

# Or convert to WebP with PNG fallback
npx sharp-cli og-image.png -o og-image.webp --quality 85
```

### Step 3: Place File

```bash
cp og-image.png public/images/og-image.png
```

### Step 4: Update Layout.astro

```diff
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, Astro.site)} />
+ <meta property="og:image:width" content="1200" />
+ <meta property="og:image:height" content="630" />
+ <meta property="og:image:alt" content="AI Resume Advisor - Tailor Your Resume with AI" />
+ <meta property="og:site_name" content="AI Resume Advisor" />
+ <meta property="og:locale" content="en_US" />
```

### Step 5: Deploy & Test

1. Deploy to production
2. Clear Facebook cache: https://developers.facebook.com/tools/debug/
3. Verify on all platforms

---

## Acceptance Criteria Checklist

### Image Creation

- [x] `public/images/og-image.png` exists
- [x] Image dimensions are exactly 1200 x 630 px
- [x] File size is < 300 KB (232 KB)
- [x] Design includes AI Resume Advisor logo
- [x] Design includes tagline or value proposition
- [x] Design uses brand colors consistently
- [x] Image is visually clear at small sizes (mobile preview)

### Code Changes

- [x] `og:site_name` meta tag added to Layout.astro
- [x] `og:locale` meta tag added to Layout.astro
- [x] `og:image:width` meta tag added (optional)
- [x] `og:image:height` meta tag added (optional)
- [x] `og:image:alt` meta tag added (optional)

### Description Optimization

- [x] Default description updated in Layout.astro
- [x] Description is under 155 characters (148 chars)
- [x] Description includes clear value proposition
- [x] Description includes call-to-action (e.g., "Try free today!")

### Testing & Validation

- [x] Facebook Sharing Debugger shows correct preview
- [ ] LinkedIn Post Inspector shows correct preview
- [ ] Twitter/X Tweet Composer shows correct preview
- [ ] Image displays correctly on mobile devices
- [ ] No Facebook "text overlay" warnings

### Deployment

- [x] Changes deployed to production
- [x] Facebook cache cleared and refreshed
- [x] Manual share test on Facebook confirms image appears
- [ ] Manual share test on LinkedIn confirms image appears

---

## References

- [Facebook Open Graph Best Practices](https://developers.facebook.com/docs/sharing/webmasters/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) (Note: Card Validator moved to Tweet Composer)
- [Open Graph Protocol](https://ogp.me/)

---

## Notes

- Facebook caches og:image aggressively. After deploying, always use the Sharing Debugger to "Scrape Again" and clear the cache.
- LinkedIn may take 24-48 hours to update cached previews even after using Post Inspector.
- Consider creating multiple og:images for different pages (e.g., homepage, pricing, blog posts) in the future.

---

**Document Version**: 1.3.0
**Last Updated**: 2025-12-05 11:33 CST
