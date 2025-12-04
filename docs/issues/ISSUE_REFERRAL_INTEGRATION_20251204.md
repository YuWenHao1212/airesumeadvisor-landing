# Issue Report: Referral System Integration

**Issue ID**: REFERRAL-001
**Created**: 2025-12-04
**Completed**: 2025-12-04
**Priority**: High
**Status**: Completed
**Requested by**: AI Resume Advisor Web App

---

## 1. Background

The AI Resume Advisor Web App has implemented a referral/ambassador system. When ambassadors share their referral links (format: `https://app.airesumeadvisor.com/ref/CODE`), users are redirected to the Landing Page with a `?ref=CODE` query parameter.

The Landing Page needs to handle this referral flow to:

1. Display referral-specific messaging
2. Pass the referral code to the Web App when users click "Get Started"

---

## 2. Implementation Summary

### 2.1 Files Created

| File | Purpose |
|------|---------|
| `src/utils/referral.ts` | Referral utility module - handles localStorage, expiry, URL manipulation |
| `src/components/ReferralBanner.astro` | Top banner component showing "20% OFF" message |

### 2.2 Files Modified

| File | Changes |
|------|---------|
| `src/components/Header.astro` | Added `data-cta-link` attributes to 4 CTA links |
| `src/components/Hero.astro` | Added `data-cta-link` attribute to signup button |
| `src/components/Pricing.astro` | Added `data-cta-link` attributes, discount badges, card layout fixes |
| `src/components/BottomCTA.astro` | Added `data-cta-link` attribute to CTA button |
| `src/pages/index.astro` | Added ReferralBanner component and init script |
| `eslint.config.js` | Added browser globals support |

### 2.3 Features Implemented

1. **Query Parameter Handling**
   - Reads `?ref=CODE` from URL on page load
   - Stores in localStorage with timestamp
   - 7-day expiry mechanism
   - Last Touch Attribution (new codes overwrite old)

2. **CTA Link Updates**
   - All CTA buttons dynamically append `?ref=CODE` when referral is active
   - Uses `data-cta-link` attribute for JavaScript targeting

3. **Referral Banner**
   - Purple/indigo gradient top bar
   - Shows "You've been invited! Sign up for 20% OFF your first purchase"
   - Hidden by default, shown via JavaScript when referral code exists

4. **Pricing Card Discount Badges**
   - "20% OFF" badge on Daily Pass and Weekly Pass cards
   - Hidden by default, shown when referral code is active
   - Fixed-height badge area ensures price alignment across all cards

---

## 3. Technical Specifications

### 3.1 URL Format

| Type | Example |
|------|---------|
| Referral Link | `https://app.airesumeadvisor.com/ref/WEN123` |
| Landing Page URL | `https://airesumeadvisor.com/?ref=WEN123` |
| Signup URL | `https://app.airesumeadvisor.com?function=Signup&ref=WEN123` |

### 3.2 Referral Code Format

- 6-9 characters
- Format: 3-6 uppercase letters + 3 digits
- Examples: `WEN123`, `JOHN456`, `WENHAO789`

### 3.3 Storage Mechanism

```typescript
// localStorage keys
const STORAGE_KEY = 'referral_code';
const TIMESTAMP_KEY = 'referral_timestamp';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
```

### 3.4 Referral Utility Functions

| Function | Purpose |
|----------|---------|
| `getReferralCode()` | Get code from localStorage (returns null if expired) |
| `setReferralCode(code)` | Save code with current timestamp |
| `clearReferralCode()` | Remove code and timestamp |
| `appendReferralToUrl(url)` | Add ref parameter to URL |
| `initReferralSystem()` | Initialize on page load |

---

## 4. User Flow

```
1. Ambassador shares: app.airesumeadvisor.com/ref/WEN123
                      ↓
2. Web App sets cookie and redirects to: airesumeadvisor.com/?ref=WEN123
                      ↓
3. Landing Page stores referral code in localStorage
                      ↓
4. User browses Landing Page (referral banner + discount badges shown)
                      ↓
5. User clicks "Get Started" or "Buy Now"
                      ↓
6. Redirected to: app.airesumeadvisor.com?function=Signup&ref=WEN123
                      ↓
7. Web App reads URL param, applies referral discount
```

---

## 5. Testing Checklist

- [x] `?ref=WEN123` parameter is correctly read from URL
- [x] Referral code persists in localStorage after page navigation
- [x] All CTA buttons include `?ref=` parameter when referral is active
- [x] Referral banner displays correctly at top of page
- [x] Referral code expires/clears after 7 days
- [x] "20% OFF" badges show on Daily Pass and Weekly Pass cards
- [x] Price alignment is consistent across all pricing cards
- [x] Works on both desktop and mobile

### How to Test

1. **Without referral code**: Visit `http://localhost:4321/`
   - No banner, no discount badges

2. **With referral code**: Visit `http://localhost:4321/?ref=TEST123`
   - Purple banner appears at top
   - "20% OFF" badges on Daily/Weekly Pass cards
   - All CTA links include `?ref=TEST123`

3. **Clear localStorage for fresh test**:
   ```javascript
   localStorage.removeItem('referral_code');
   localStorage.removeItem('referral_timestamp');
   location.reload();
   ```

---

## 6. Design Decisions Made

| Question | Decision | Rationale |
|----------|----------|-----------|
| Banner placement | Top bar (above Header) | More visible, consistent with Web App |
| Referral code expiry | 7 days | Matches Web App cookie expiry |
| Multiple referrals | Last Touch Attribution | Simpler implementation, rewards the referrer who finally convinced the user |

---

## 7. Related Files

### Landing Page (this repo)

| File | Purpose |
|------|---------|
| `src/utils/referral.ts` | Core referral logic |
| `src/components/ReferralBanner.astro` | Banner UI |
| `src/components/Pricing.astro` | Discount badges |

### Web App

| File | Purpose |
|------|---------|
| `src/app/ref/[code]/page.tsx` | Redirects to Landing Page |
| `src/app/api/auth/signup/route.ts` | Reads referral from cookie/param |
| `src/components/auth/ReferralBanner.tsx` | Signup page banner |

---

## 8. Contact

For questions about this integration, please refer to the Web App codebase or contact the development team.

**Web App Repository**: `airesumeadvisor-app`
**Related Feature Spec**: `docs/features/FEATURE_REFERRAL_MINERVA.md`
