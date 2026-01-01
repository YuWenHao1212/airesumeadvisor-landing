# Feature: Explainer Video Integration (Multi-Touchpoint Strategy)

**Version**: 1.0.0
**Created**: 2025-12-26
**Status**: Planning
**Priority**: High

---

## Overview

Integrate the 60-90 second explainer video into the landing page using a **multi-touchpoint strategy** to maximize video exposure and viewer engagement.

### Video Source

- **Brief Location**: `/Users/yuwenhao/GitHub/airesumeadvisor-app/docs/marketing/VIDEO_BRIEF.md`
- **Duration**: 60-90 seconds
- **Type**: Brand Awareness / Explainer Video
- **Style**: Motion Graphics (clean, modern SaaS style)

---

## Problem Statement

| Issue | Impact |
|-------|--------|
| Current HowItWorks section shows "Video Coming Soon" placeholder | Missed opportunity for conversion |
| Single video link in Hero may be ignored by most users | Low video engagement rate (~15-20%) |
| Video placement too far down the page | Reduced visibility |

---

## Solution: Three-Touchpoint Strategy

Place the same video at **3 strategic locations** to maximize exposure:

```
┌─────────────────────────────────────────────────────────┐
│  HERO SECTION                                           │
│                                                         │
│  "Know Your Match Before You Apply"                     │
│                                                         │
│  [Sign Up Free →]  [▶ Watch 90s Demo]    ← Touchpoint 1│
│                                                         │
│  ┌─────────────────────────────────┐                   │
│  │                                 │                   │
│  │     [Product Screenshot]        │                   │
│  │            ▶                    │    ← Touchpoint 2 │
│  │                                 │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↓
              (ExtensionPromo, Features, etc.)
                           ↓
┌─────────────────────────────────────────────────────────┐
│  HOW IT WORKS SECTION                   ← Touchpoint 3  │
│                                                         │
│  "See AI Resume Advisor in Action"                      │
│                                                         │
│  ┌─────────────────────────────────┐                   │
│  │                                 │                   │
│  │      [Video Thumbnail]          │                   │
│  │            ▶                    │                   │
│  │                                 │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
│  "90 seconds to understand how we help"                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Touchpoint Specifications

### Touchpoint 1: Hero CTA Button

**Location**: Next to "Sign Up Free" button

**Design**:
```html
<div class="flex gap-4">
  <a href="..." class="btn-primary">Sign Up Free →</a>
  <button class="btn-secondary" data-video-modal>
    <span class="play-icon">▶</span>
    Watch 90s Demo
  </button>
</div>
```

**Styling**:
| Property | Primary CTA | Video CTA |
|----------|-------------|-----------|
| Background | `#2563eb` (solid) | `transparent` |
| Border | none | `1px solid #d1d5db` |
| Text | White | `#374151` |
| Hover | `#1d4ed8` | `bg-gray-50` |

**Copy Options** (A/B test candidates):
- "▶ Watch 90s Demo"
- "▶ See how in 90 seconds"
- "▶ Watch Demo"

---

### Touchpoint 2: Hero Product Image Overlay

**Location**: On top of existing Hero product screenshot

**Design**:
```html
<div class="hero-image-container relative cursor-pointer" data-video-modal>
  <!-- Existing product screenshot -->
  <img src="..." alt="AI Resume Advisor Dashboard" />

  <!-- Play button overlay -->
  <div class="play-overlay">
    <div class="play-button">
      <svg><!-- Play icon --></svg>
    </div>
    <span class="play-label">Watch Demo</span>
  </div>
</div>
```

**Styling**:
```css
.hero-image-container {
  position: relative;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-image-container:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.hero-image-container:hover .play-button {
  transform: scale(1.1);
}

.play-label {
  margin-top: 8px;
  color: white;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
```

**Mobile Behavior**:
- Always show play button (no hover state on mobile)
- Reduce play button size to 48px

---

### Touchpoint 3: HowItWorks Section (Updated)

**Location**: Existing HowItWorks section (replace placeholder)

**Content Update**:
```html
<section id="how-it-works" class="bg-background py-16 md:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        See AI Resume Advisor in Action
      </h2>
      <p class="mt-4 text-lg text-text-body max-w-2xl mx-auto">
        Watch how we help you identify skill gaps and tailor your resume in 90 seconds.
      </p>
    </div>

    <!-- Video Container -->
    <div class="max-w-4xl mx-auto">
      <div class="video-container relative rounded-2xl overflow-hidden shadow-2xl">
        <!-- Video thumbnail or iframe -->
        <div class="aspect-video bg-gray-900">
          <!-- Video embed here -->
        </div>
      </div>

      <!-- CTA below video -->
      <div class="mt-8 text-center">
        <a href="..." class="btn-primary">
          Get Your Match Score →
        </a>
      </div>
    </div>
  </div>
</section>
```

**Copy Options**:
- Heading: "See AI Resume Advisor in Action"
- Subheading: "Watch how we help you identify skill gaps and tailor your resume in 90 seconds."
- Alternative: "Still not sure? See how it works in 90 seconds."

---

## Video Modal Component

### Requirements

Create a reusable video modal component for Touchpoints 1 & 2.

**Features**:
- [ ] Trigger from any element with `data-video-modal` attribute
- [ ] Keyboard accessible (Escape to close)
- [ ] Click outside to close
- [ ] Pause video on close
- [ ] Responsive sizing
- [ ] Loading state

**Component Structure**:
```html
<!-- VideoModal.astro -->
<div id="video-modal" class="video-modal" aria-hidden="true">
  <div class="video-modal-backdrop"></div>
  <div class="video-modal-content">
    <button class="video-modal-close" aria-label="Close video">
      <svg><!-- X icon --></svg>
    </button>
    <div class="video-modal-player">
      <!-- YouTube/Vimeo iframe or video element -->
    </div>
  </div>
</div>
```

**Styling**:
```css
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.video-modal[aria-hidden="false"] {
  opacity: 1;
  visibility: visible;
}

.video-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.video-modal-content {
  position: relative;
  width: 90%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
}

.video-modal-close {
  position: absolute;
  top: -48px;
  right: 0;
  color: white;
  padding: 8px;
}
```

---

## Video Hosting Options

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **YouTube** | Free, reliable CDN, SEO benefits | Ads, related videos | ✅ Recommended |
| **Vimeo** | No ads, cleaner player | Paid for custom player | Good alternative |
| **Self-hosted** | Full control | CDN costs, maintenance | Not recommended |

**YouTube Embed Settings**:
```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1&autoplay=1"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  allowfullscreen
></iframe>
```

Parameters:
- `rel=0`: Don't show related videos
- `modestbranding=1`: Minimal YouTube branding
- `autoplay=1`: Start playing when modal opens

---

## Implementation Plan

### Phase 1: Video Modal Component (Day 1)

**Files to create/modify**:
- [ ] `src/components/VideoModal.astro` - New component
- [ ] `src/styles/video-modal.css` - Modal styles (or inline in component)

**Tasks**:
1. Create VideoModal component with backdrop and close button
2. Add JavaScript for open/close logic
3. Implement keyboard accessibility (Escape key)
4. Add loading state for video

### Phase 2: Hero Integration (Day 1-2)

**Files to modify**:
- [ ] `src/components/Hero.astro` - Add video CTA button and image overlay

**Tasks**:
1. Add "Watch Demo" button next to Sign Up Free
2. Add play button overlay on product screenshot
3. Wire up `data-video-modal` triggers
4. Test responsive behavior

### Phase 3: HowItWorks Update (Day 2)

**Files to modify**:
- [ ] `src/components/HowItWorks.astro` - Replace placeholder with actual video

**Tasks**:
1. Update section heading and copy
2. Remove browser window mockup placeholder
3. Add video embed (or thumbnail + modal trigger)
4. Add CTA below video

### Phase 4: Testing & Polish (Day 3)

**Tasks**:
- [ ] Test all three touchpoints on desktop/tablet/mobile
- [ ] Test video loading and playback
- [ ] Test modal accessibility
- [ ] Lighthouse performance check
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)

---

## Acceptance Criteria

### Functional Requirements

- [ ] Video plays when clicking Hero "Watch Demo" button
- [ ] Video plays when clicking Hero product image
- [ ] Video plays in HowItWorks section
- [ ] Modal closes on Escape key press
- [ ] Modal closes on backdrop click
- [ ] Video pauses when modal closes
- [ ] All touchpoints trigger the same video

### Non-Functional Requirements

- [ ] Lighthouse Performance score > 90
- [ ] No layout shift when video loads
- [ ] Modal animation is smooth (60fps)
- [ ] Works on mobile devices
- [ ] Accessible (keyboard navigation, ARIA labels)

---

## Analytics Tracking

Track video engagement for optimization:

```javascript
// Video interaction events
analytics.track('video_modal_opened', {
  touchpoint: 'hero_button' | 'hero_image' | 'how_it_works',
  page: 'landing'
});

analytics.track('video_played', {
  touchpoint: string,
  duration: number
});

analytics.track('video_completed', {
  touchpoint: string
});
```

---

## Future Considerations

1. **A/B Testing**: Test different CTA copy for video button
2. **Video Thumbnail**: Create custom thumbnail for better CTR
3. **Short Preview**: Add 10-15s auto-play preview on Hero (muted)
4. **Localization**: Subtitles or localized versions

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Explainer Video | 🟡 In Production | ETA: 7-10 days from brief submission |
| YouTube/Vimeo Account | 🟢 Ready | Use existing account |
| Video Thumbnail | 🔴 Not Started | Extract from video or create custom |

---

## Related Documents

- Video Brief: `/Users/yuwenhao/GitHub/airesumeadvisor-app/docs/marketing/VIDEO_BRIEF.md`
- Design Tokens: `.claude/skills/frontend-design/resources/design-tokens.md`
- Links Config: `src/config/links.ts`

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-26 | Initial planning document |
