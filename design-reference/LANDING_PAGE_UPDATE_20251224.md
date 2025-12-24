# Landing Page Update Requirements

**Version**: 1.2.0
**Date**: 2025-12-24
**Status**: Landing Page Complete, Web App Action Required
**Last Updated**: 2025-12-24 15:32 CST

---

## Background & Why

### New Features to Promote

We have two major features that are not yet showcased on the Landing Page:

1. **Chrome Extension** — A LinkedIn integration that lets users screen jobs in 2 seconds without leaving the page. This is a powerful entry point to our funnel.

2. **Resume Score Simulator (Alignment Lab)** — A tool that lets users edit their AI-tailored resume and see their score change in real-time. No more blind editing.

### Copy Direction: "Advisor" Perspective

Our product is **AI Resume Advisor**. All copy should reflect the "Advisor" role:

| Advisor Role | What It Means |
|--------------|---------------|
| Diagnose | Tell users what's good/bad about their resume |
| Improve | Help them fix it or guide them how to fix it |
| Guide | Tell them what to do next |

---

## Current vs. New Page Structure

### Current Structure

```
1. Hero — "Know Your Match Before You Apply"
2. Features — "From Analysis to Action" (3 Tabs)
3. Job Simulator — "Your Career Skill Tree"
4. Social Proof (removed)
5. How it Works
6. Pricing — "Career Consultant Insights at a Fraction of the Cost"
7. Bottom CTA — "Start Building Your Perfect Resume Today!"
8. Footer
```

### New Structure (IMPLEMENTED)

```
1. Hero — "Know Your Match Before You Apply" (NO CHANGE)
2. NEW: Extension Section — "Screen Jobs in Seconds" ✅
3. Features — "From Analysis to Action" (NO CHANGE)
4. NEW: Resume Score Simulator — "Edit Your Resume. See Your Score Move." ✅
5. Skill Tree — "Your Career Skill Tree" (NO CHANGE)
6. How it Works (NO CHANGE)
7. Pricing — "Career Consultant Insights at a Fraction of the Cost" (UPDATED) ✅
8. Bottom CTA — "Ready to Know Your Match?" (UPDATED) ✅
9. Footer (NO CHANGE)
```

---

## Task 1: Add Extension Section ✅ DONE

### Location

After Hero, before Features ("From Analysis to Action")

### Content

| Element | Content |
|---------|---------|
| **Headline** | Screen Jobs in Seconds |
| **Subheadline** | Browse LinkedIn and know your fit instantly — without leaving the page. |

### CTA Buttons (2 buttons)

| Button | Text | URL | Icon | Notes |
|--------|------|-----|------|-------|
| **Primary** | Add to Chrome | `/install-extension` (see Task 5) | Chrome icon | Links to install relay page, **opens in new tab** |
| **Secondary** | Get Started → | `/auth/signup?source=landing` | Arrow | Standard signup flow |

**Future Extension Support**: Design should accommodate additional browser buttons (e.g., "Add to Edge") in the future.

### Features List (4 items)

| Icon | Feature |
|------|---------|
| ⚡ | Instant alignment score while browsing |
| 📊 | Section-by-section breakdown |
| 🔑 | Keyword match checklist |
| 🔗 | One click to full report |

### Visual

- Screenshot of Extension popup on LinkedIn job page
- Style: Match existing Landing Page mockup style (MacBook frame, rounded corners, shadow, floating cards)
- Reference image: `airesumeadvisor-app/extension/screenshot/result-1280x800.png`
- **Status**: Using placeholder mockup (styled to match Landing Page aesthetic)

### Layout Suggestion

Two-column layout (like Job Simulator section):
- Left: Screenshot
- Right: Headline, subheadline, features list, CTA buttons

### Implementation Notes

- Created `src/components/ExtensionPromo.astro`
- "Add to Chrome" button opens in new tab (`target="_blank"`) - industry best practice
- Placeholder mockup included, replace with actual screenshot later

---

## Task 2: Add Resume Score Simulator Section ✅ DONE

### Location

After Features ("From Analysis to Action"), before Skill Tree ("Your Career Skill Tree")

### Content

| Element | Content |
|---------|---------|
| **Headline** | Edit Your Resume. See Your Score Move. |
| **Subheadline** | See how your resume matches any job — edit and watch your score change. |
| **CTA Button** | Get Started → |
| **CTA URL** | `/auth/signup?source=landing` |

### Features List (4 items)

| Icon | Feature |
|------|---------|
| ✨ | AI rewrites your resume to match the job |
| ✏️ | Make your own edits anytime |
| 📊 | Real-time score updates |
| 🎯 | Clear before/after comparison |

### Visual

- Screenshot of Alignment Lab showing 3-column comparison (Original / Tailored / Your Edits)
- Style: Match existing Landing Page mockup style
- Reference image: Alignment Lab screenshot (provided separately)
- **Status**: Using placeholder mockup (styled to match Landing Page aesthetic)

### Layout Suggestion

Two-column layout (opposite of Extension section for visual rhythm):
- Left: Headline, subheadline, features list, CTA
- Right: Screenshot

### Implementation Notes

- Created `src/components/ResumeSimulator.astro`
- Placeholder mockup included, replace with actual screenshot later

---

## Task 3: Update Pricing Section Features ✅ DONE

### Location

Pricing section → Features card (below pricing cards)

### Current Features (6 items)

```
✅ Alignment score + keyword coverage analysis
✅ Strengths, weaknesses & quick wins report
✅ AI-powered resume rewrite
✅ Skill gap analysis with course recommendations
✅ Before/after score comparison
✅ Job alignment simulator
```

### New Features (6 items) — Advisor Perspective

| # | New Copy | Advisor Role |
|:-:|----------|:------------:|
| 1 | AI rewrites your resume for each job | Helps improve |
| 2 | Every edit gets instant feedback | Gives feedback |
| 3 | Know your fit while browsing LinkedIn | Always present |
| 4 | Missing skills? Get course recommendations | Identifies gaps |
| 5 | See how well you match any job | Diagnoses fit |
| 6 | Know exactly where to improve | Guides direction |

### Layout

Maintain 3x2 grid layout:

```
Row 1:
✅ AI rewrites your resume for each job
✅ Every edit gets instant feedback
✅ Know your fit while browsing LinkedIn

Row 2:
✅ See how well you match any job
✅ Missing skills? Get course recommendations
✅ Know exactly where to improve
```

---

## Task 4: Update Bottom CTA Section ✅ DONE

### Current

| Element | Current |
|---------|---------|
| Headline | Start Building Your Perfect Resume Today! |
| Subheadline | Don't let your dream job slip away. With our AI Resume Builder... |

### New

| Element | New |
|---------|-----|
| Headline | **Ready to Know Your Match?** |
| Subheadline | Don't let your dream job slip away. With AI Resume Advisor, you'll know exactly where you stand — and how to improve. |

### Rationale

"Ready to Know Your Match?" echoes the Hero headline "Know Your Match Before You Apply", creating a cohesive narrative arc.

---

## Task 5: Extension Install Relay Page (Referral Tracking) ✅ LANDING PAGE DONE

### Problem

When users click "Add to Chrome" and go to Chrome Web Store, the referral code (`?ref=ABC123`) is lost because:
1. Chrome Web Store is a different domain
2. Extension cannot read Landing Page's localStorage

### Solution: Relay Page

Create a relay page that preserves the referral code in a cookie before redirecting to Chrome Web Store.

### User Flow

```
Landing Page (airesumeadvisor.com?ref=ABC123)
    ↓
User clicks "Add to Chrome"
    ↓
Relay Page (airesumeadvisor.com/install-extension?ref=ABC123) ← Opens in new tab
    ↓
Relay Page does 2 things:
  1. Set Cookie: referral_code=ABC123 (Domain=.airesumeadvisor.com, 7 days)
  2. Redirect to Chrome Web Store
    ↓
Chrome Web Store → User installs Extension
    ↓
Extension OAuth → app.airesumeadvisor.com/api/auth/extension/login
    ↓
Backend reads Cookie → Records referredBy=ABC123 ✅
```

### Implementation Notes (Landing Page)

**Note**: Astro runs in Static Site Generation (SSG) mode. `Astro.cookies.set()` does NOT work at request time. The relay page uses **client-side JavaScript** instead:

1. Page loads with a loading spinner UI
2. JavaScript reads `?ref=` from URL
3. JavaScript sets cookie on `.airesumeadvisor.com` domain
4. JavaScript redirects to Chrome Web Store after 100ms

**Files Created/Modified**:
- `src/pages/install-extension.astro` - Relay page with client-side JS
- `src/utils/referral.ts` - Added `setReferralCookie()` function
- `src/config/links.ts` - Added `installExtension` and `chromeWebStore` links

### Chrome Web Store URL

```
https://chromewebstore.google.com/detail/iafpieelbhhlmhgjekflneciffoonkgf
```

**Extension ID**: `iafpieelbhhlmhgjekflneciffoonkgf` (permanent)

### Future Browser Support

The relay page can be extended to support multiple browsers:

| Browser | Relay URL | Store URL |
|---------|-----------|-----------|
| Chrome | `/install-extension?browser=chrome&ref=XXX` | Chrome Web Store |
| Edge | `/install-extension?browser=edge&ref=XXX` | Edge Add-ons |
| Firefox | `/install-extension?browser=firefox&ref=XXX` | Firefox Add-ons |

---

## Web App Action Required

> **FOR: airesumeadvisor-app repository**

### What Landing Page Does

When a user visits `airesumeadvisor.com?ref=ABC123`:

1. **Stores referral code** in:
   - `localStorage.referral_code` = "ABC123"
   - `Cookie: referral_code=ABC123` (Domain=`.airesumeadvisor.com`, 7 days, SameSite=Lax)

2. **Updates all CTA links** to include `?ref=ABC123`:
   - `https://app.airesumeadvisor.com/auth/signup?source=landing&ref=ABC123`
   - `/install-extension?ref=ABC123`

3. **Relay page** (`/install-extension?ref=ABC123`):
   - Sets same cookie again (redundancy)
   - Redirects to Chrome Web Store

### What Web App Needs To Do

**File**: `src/app/api/auth/extension/login/route.ts`

```typescript
// Read referral code from cookie
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const referralCode = cookieStore.get('referral_code')?.value;

  // ... existing OAuth logic ...

  // When creating new user, pass referralCode
  if (isNewUser && referralCode) {
    await createUser({
      // ... other fields ...
      referredBy: referralCode,
    });
  }
}
```

### Cookie Details

| Property | Value |
|----------|-------|
| Name | `referral_code` |
| Domain | `.airesumeadvisor.com` |
| Path | `/` |
| Max-Age | 7 days |
| SameSite | Lax |
| Secure | true |

### Testing Checklist

- [ ] Visit `airesumeadvisor.com?ref=TEST123`
- [ ] Click "Add to Chrome" → verify cookie is set
- [ ] Install extension → OAuth login
- [ ] Verify new user has `referredBy: TEST123` in database

---

## Assets Required

### Screenshots to Create

| # | Asset | Source | Status |
|:-:|-------|--------|:------:|
| 1 | Extension popup on LinkedIn | `extension/screenshot/result-1280x800.png` | Placeholder used |
| 2 | Alignment Lab 3-column view | Provided separately | Placeholder used |

### Icons Required

| # | Icon | Usage | Status |
|:-:|------|-------|:------:|
| 1 | Chrome browser icon | "Add to Chrome" button | ✅ SVG included |
| 2 | Edge browser icon (future) | "Add to Edge" button | Not needed yet |

### Design Style Reference

- Existing mockups: `/public/images/hero-screenshot.webp`, `/public/images/feature-tab1.webp`
- Style elements: MacBook frame, rounded corners (12-16px), drop shadow, light gray gradient background
- Floating cards with key metrics (optional enhancement)

---

## Files Modified

### Landing Page (airesumeadvisor-landing)

| File | Changes | Status |
|------|---------|:------:|
| `src/pages/index.astro` | Add imports for new sections, update section order | ✅ |
| `src/components/Pricing.astro` | Update `features` array with new copy | ✅ |
| `src/components/BottomCTA.astro` | Update headline and subheadline | ✅ |
| `src/utils/referral.ts` | Add cookie storage for referral code | ✅ |
| `src/config/links.ts` | Add extension install links | ✅ |
| **NEW** `src/pages/install-extension.astro` | Create relay page for referral tracking | ✅ |
| **NEW** `src/components/ExtensionPromo.astro` | Create new component with install CTA | ✅ |
| **NEW** `src/components/ResumeSimulator.astro` | Create new component | ✅ |

### Web App (airesumeadvisor-app)

| File | Changes | Status |
|------|---------|:------:|
| `src/app/api/auth/extension/login/route.ts` | Read referral cookie, pass to user creation | ⏳ TODO |

---

## Implementation Checklist

### Landing Page (airesumeadvisor-landing)

- [x] Create `ExtensionPromo.astro` component
- [x] Create `ResumeSimulator.astro` component
- [x] Create `install-extension.astro` relay page
- [x] Update `referral.ts` to store cookie
- [x] Update `index.astro` to include new sections
- [x] Update `Pricing.astro` features list
- [x] Update `BottomCTA.astro` headline
- [x] "Add to Chrome" opens in new tab (industry best practice)
- [ ] Create styled Extension screenshot (using placeholder)
- [ ] Create styled Alignment Lab screenshot (using placeholder)
- [ ] Test responsive layout (mobile, tablet, desktop)
- [ ] Verify all CTA links work correctly
- [ ] Test referral cookie is set correctly on `/install-extension`

### Web App (airesumeadvisor-app)

- [ ] Update Extension OAuth API to read referral cookie
- [ ] Test referral tracking end-to-end (Landing → Extension Install → OAuth → Account Created with referredBy)

---

## Summary

| Change Type | Count | Status |
|-------------|:-----:|:------:|
| New Sections | 2 | ✅ Done |
| Updated Sections | 2 | ✅ Done |
| New Components | 2 | ✅ Done |
| New Pages (Landing) | 1 | ✅ Done |
| Web App Changes | 1 | ⏳ TODO |
| New Assets | 2 | Placeholder |

**Priority**: High — These features are live in production but not promoted on the Landing Page.

---

## Appendix: Extension Install Button Design

### Recommended Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Chrome Icon] Add to Chrome    [Get Started →]                 │
│  ─────────────────────────      ───────────────                 │
│  Primary (solid blue)           Secondary (outline or text)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Button Styles

| Button | Style | Color |
|--------|-------|-------|
| Add to Chrome | Solid with Chrome icon | Primary blue (#0183FF) |
| Get Started | Outline or text link | Secondary |

### Future Multi-Browser Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Chrome] Add to Chrome    [Edge] Add to Edge                   │
│                                                                 │
│  [Get Started →]                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
