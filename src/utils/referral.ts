/**
 * Referral System Utilities
 *
 * Handles referral code storage, expiry, and URL manipulation.
 * Referral codes are stored in localStorage with a 7-day expiry.
 */

const STORAGE_KEY = 'referral_code';
const TIMESTAMP_KEY = 'referral_timestamp';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Check if a referral code has expired (older than 7 days)
 */
function isExpired(timestamp: string | null): boolean {
  if (!timestamp) return true;
  const savedTime = parseInt(timestamp, 10);
  return Date.now() - savedTime > SEVEN_DAYS_MS;
}

/**
 * Get the referral code from localStorage
 * Returns null if expired or not found
 */
export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  const code = localStorage.getItem(STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);

  if (!code || isExpired(timestamp)) {
    clearReferralCode();
    return null;
  }

  return code;
}

/**
 * Save a referral code to localStorage with current timestamp
 * Uses "last touch" attribution - new codes overwrite old ones
 */
export function setReferralCode(code: string): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, code);
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

/**
 * Clear referral code and timestamp from localStorage
 */
export function clearReferralCode(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TIMESTAMP_KEY);
}

/**
 * Append referral code to a URL if one exists
 * Handles URLs that already have query parameters
 */
export function appendReferralToUrl(baseUrl: string): string {
  const code = getReferralCode();
  if (!code) return baseUrl;

  const url = new URL(baseUrl, window.location.origin);
  url.searchParams.set('ref', code);
  return url.toString();
}

/**
 * Initialize referral system on page load
 * - Reads ref parameter from URL
 * - Stores in localStorage (overwrites existing)
 * - Updates all CTA links with referral code
 * - Shows referral banner if code exists
 */
export function initReferralSystem(): void {
  if (typeof window === 'undefined') return;

  // Read ref parameter from current URL
  const searchParams = new URLSearchParams(window.location.search);
  const urlRefCode = searchParams.get('ref');

  // Store new referral code if present (last touch wins)
  if (urlRefCode) {
    setReferralCode(urlRefCode);
  }

  // Get current referral code (may be from URL or previous visit)
  const referralCode = getReferralCode();

  // Update all CTA links with referral code
  updateCtaLinks(referralCode);

  // Show/hide referral banner
  updateBannerVisibility(referralCode);

  // Show/hide discount badges on pricing cards
  updateDiscountBadges(referralCode);
}

/**
 * Update all CTA links with the referral code
 * Links should have data-cta-link="signup|login|buyDaily|buyWeekly" attribute
 */
function updateCtaLinks(referralCode: string | null): void {
  const ctaLinks = document.querySelectorAll<HTMLAnchorElement>('[data-cta-link]');

  ctaLinks.forEach((link) => {
    const originalHref = link.getAttribute('data-original-href') || link.href;

    // Store original href for future updates
    if (!link.getAttribute('data-original-href')) {
      link.setAttribute('data-original-href', originalHref);
    }

    if (referralCode) {
      const url = new URL(originalHref);
      url.searchParams.set('ref', referralCode);
      link.href = url.toString();
    } else {
      link.href = originalHref;
    }
  });
}

/**
 * Show or hide the referral banner based on code presence
 */
function updateBannerVisibility(referralCode: string | null): void {
  const banner = document.getElementById('referral-banner');
  if (!banner) return;

  if (referralCode) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

/**
 * Show or hide discount badges on pricing cards based on referral code presence
 */
function updateDiscountBadges(referralCode: string | null): void {
  const badges = document.querySelectorAll<HTMLElement>('[data-referral-badge]');

  badges.forEach((badge) => {
    if (referralCode) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  });
}
