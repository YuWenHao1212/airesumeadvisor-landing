# Landing Page Marketing - Content Optimization

**Created**: 2025-11-28 16:30 CST
**Updated**: 2025-11-28
**Status**: Copywriting Confirmed, Ready for Implementation

---

## 1. Product Understanding

### What is AI Resume Advisor?

**NOT a Resume Builder** — It's a **Resume Assessment Tool**.

Most AI resume tools and Resume Builders treat resume tailoring as a "writing problem." But polishing the resume is only part of the solution.

AI Resume Advisor works like a **Career Consultant**:

1. **Analyze JD** → Extract required skill sets
2. **Analyze Resume** → Identify existing skills
3. **Classify Gaps**:
   - **Presentation Gap** → AI assists with rewriting
   - **Skill Gap** → Recommend courses to bridge the gap
   - **Hidden Skills** → Remind users to add skills they have but didn't include

### Core Metrics (Differentiation)

| Metric | Competitors | AI Resume Advisor |
|--------|-------------|-------------------|
| **Keyword Coverage** | ✅ Only this | ✅ Included |
| **Alignment Score** | ❌ None | ✅ Semantic similarity between JD & Resume |

**Why this matters:**
- Keyword Coverage = surface-level match
- Alignment Score = true semantic match (what employers actually look for)

### Quantitative + Qualitative Analysis

**Quantitative:**
- Alignment Score (e.g., 79% Content Match)
- Keyword Coverage (e.g., 3/10)
- Section-by-section breakdown scores

**Qualitative:**
- Strengths
- Weaknesses
- Quick Wins
- Skill Development Suggestions

This report helps job seekers decide **whether to apply in the first 30 seconds** instead of spending 30 minutes analyzing a JD.

### Job Alignment Simulator

Users can:
- See **Before/After** comparison after AI optimization
- Add courses/certifications/projects to see score changes **before investing time and money**
- Understand **what to learn, in what order, and how much it matters**

> **User Quote:** "It's like a skill tree in a game, but it's my real career—and now I finally know how to level up my life."

---

## 2. Target Users

| User Type | Primary Pain Point |
|-----------|-------------------|
| **Recent Graduates** | Don't know what skills they're missing or what to learn |
| **Career Changers** | Know the goal but don't know the path from A to B |

**Common Pain Points:**
- Submitting resumes without knowing if they're qualified
- No feedback on why applications fail
- Making resume changes without knowing if they help

---

## 3. Brand Voice

| Attribute | Description |
|-----------|-------------|
| **Tone** | Friendly & Supportive + Professional |
| **NOT** | Pushy, aggressive, or overly salesy |
| **Language** | Clear, concise, benefit-focused |

---

## 4. Confirmed Pricing

| Plan | Price | Duration | Copy |
|------|-------|----------|------|
| **Free** | $0 | Daily | Analyze and optimize up to 5 jobs per day. Includes full reports with before/after comparison. |
| **Daily Pass** | $6 | 24 hours | Less than your morning coffee. Unlimited assessments for one focused job-hunting session. |
| **Weekly Pass** | $20 | 7 days | Best value—save over 50%. Perfect for active job seekers. |

**Credit System:**
- Analyze = 1 credit
- Tailor Resume (includes Before/After) = 1 credit
- Simulation (manual edit + recalculate) = 1 credit
- 10 credits/day free ≈ 5 complete job analyses

**Value Comparison:**
> A career consultant charges $100–300/hour. Get the same level of analysis—instantly.

---

## 5. Confirmed Landing Page Structure

| # | Section | Status |
|---|---------|--------|
| 1 | Header | Keep existing |
| 2 | Hero | ✅ New copy |
| 3 | Features (3 Tabs) | ✅ New copy + renamed tabs |
| 4 | Job Simulator | ✅ New copy + user quote |
| 5 | ~~Social Proof~~ | ❌ **REMOVE** (redundant with Hero trust badges) |
| 6 | How it Works | Keep existing |
| 7 | Pricing | ✅ New copy + new pricing ($6/$20) |
| 8 | Bottom CTA | ✅ New copy |
| 9 | Footer | Keep existing |

---

## 6. Confirmed Copy - All Sections

### Hero Section

| Element | Content |
|---------|---------|
| **Headline** | Know Your Match Before You Apply |
| **Subheadline** | Instant analysis of your resume vs. job requirements—with a clear path to improve. |
| **CTA** | Sign Up Free |
| **Trust Badges** | Sponsored by Microsoft · Course content by Coursera |

---

### Features Section

**Section Title:** From Analysis to Action

#### Tab 1: See Your Match

| Element | Content |
|---------|---------|
| **Tab Title** | See Your Match |
| **Card Title** | Know Exactly Where You Stand |
| **Copy** | Get your alignment score in seconds—not just keyword matches, but true semantic analysis of how your experience fits the role. See your strengths, gaps, and quick wins at a glance. No more guessing if you're qualified. Know before you apply. |

#### Tab 2: Fix & Polish

| Element | Content |
|---------|---------|
| **Tab Title** | Fix & Polish |
| **Card Title** | AI-Powered Resume Rewrite |
| **Copy** | Found a presentation gap? Our AI rewrites your resume to better showcase what you already have. See exactly how each section improves with before-and-after scores. Your experience stays real—just presented in the language employers want to see. |

#### Tab 3: Level Up

| Element | Content |
|---------|---------|
| **Tab Title** | Level Up |
| **Card Title** | Bridge Your Skill Gaps |
| **Copy** | Found skills you're missing? We'll show you exactly which courses and certifications can close the gap—with recommendations tailored to your target role. No more wondering what to learn next. |

---

### Job Simulator Section

| Element | Content |
|---------|---------|
| **Headline** | Your Career Skill Tree |
| **Copy** | Before you invest months in a course, see if it's worth it. Add any skill, certification, or project to your resume and watch your alignment score change in real time. Know the ROI of every learning decision before you make it. |
| **Quote** | "It's like a skill tree in a game, but it's my real career—and now I finally know how to level up my life." |

---

### Social Proof Section

**Status:** ❌ **REMOVE THIS SECTION**

**Reason:** Microsoft + Coursera trust badges already appear in Hero section. No real user data available yet. Can be added back after launch with real testimonials.

---

### Pricing Section

| Element | Content |
|---------|---------|
| **Headline** | Career Consultant Insights at a Fraction of the Cost |
| **Subheadline** | A career consultant charges $100–300/hour. Get the same level of analysis—instantly. |

**Plans:** (See Section 4 above)

**Features List:**
- ✓ Alignment score + keyword coverage analysis
- ✓ Strengths, weaknesses & quick wins report
- ✓ AI-powered resume rewrite
- ✓ Skill gap analysis with course recommendations
- ✓ Before/after score comparison
- ✓ Job alignment simulator

---

### Bottom CTA Section

| Element | Content |
|---------|---------|
| **Headline** | Ready to Know Your Match? |
| **Copy** | Upload your resume, paste a job description, and see exactly where you stand—in seconds. Free to start, no credit card required. |
| **CTA** | Get Your Match Score Free |

---

## 7. Implementation Checklist

### Files to Update

| File | Changes |
|------|---------|
| `src/components/Hero.astro` | New headline, subheadline |
| `src/components/Features.astro` | New section title, tab names, card titles, copy |
| `src/components/JobSimulator.astro` | New headline, copy, add quote |
| `src/components/SocialProof.astro` | **REMOVE or HIDE** |
| `src/components/Pricing.astro` | New headline, pricing ($6/$20), features list |
| `src/components/BottomCTA.astro` | New headline, copy, CTA text |

### Code Changes Required

1. **Remove Social Proof Section** from page layout
2. **Update pricing values** from $10 to $6 for Daily Pass
3. **Update CTA button text** in Bottom CTA section

---

## 8. Technical Reference

### File Locations

```
src/components/Hero.astro         # Main headline and CTA
src/components/Features.astro     # Feature tabs content
src/components/JobSimulator.astro # Job simulator section
src/components/SocialProof.astro  # TO BE REMOVED
src/components/HowItWorks.astro   # Process explanation (keep)
src/components/Pricing.astro      # Pricing plans and features
src/components/BottomCTA.astro    # Final conversion section
```

### CTA Links Configuration

```
src/config/links.ts  # All Bubble app URLs
```

### URLs

- Landing Page: https://airesumeadvisor.com
- Web App: https://app.airesumeadvisor.com

---

## 9. Future Optimizations (Post-Launch)

After launch with real user data:

1. **Add Social Proof Section back** with real testimonials
2. **Add specific numbers** (e.g., "500+ users", "average 23% score improvement")
3. **A/B test headlines** to optimize conversion
4. **Add video demo** in How It Works section

---

**Document Version**: 2.0.0
**Status**: Ready for Implementation
