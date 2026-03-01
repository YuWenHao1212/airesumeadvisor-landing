/**
 * Referral System Utilities
 *
 * Handles referral code storage, expiry, and URL manipulation.
 * Referral codes are stored in localStorage with a 7-day expiry.
 */

/**
 * Send a tracking event to Umami analytics (no-op if Umami is not loaded)
 */
function trackEvent(event: string, data?: Record<string, string>): void {
  (window as any).umami?.track(event, data);
}

const STORAGE_KEY = 'referral_code';
const TIMESTAMP_KEY = 'referral_timestamp';
const COOKIE_NAME = 'referral_code';
const COOKIE_DOMAIN = '.airesumeadvisor.com';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
const UTM_STORAGE_KEY = 'utm_params';
const UTM_TIMESTAMP_KEY = 'utm_timestamp';

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
 * Set a cookie with the referral code
 * Cookie is set on .airesumeadvisor.com domain for cross-subdomain access
 */
function setReferralCookie(code: string): void {
  if (typeof document === 'undefined') return;

  const expires = new Date(Date.now() + SEVEN_DAYS_MS);
  // Use .airesumeadvisor.com domain so app.airesumeadvisor.com can read it
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)}; Domain=${COOKIE_DOMAIN}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Save a referral code to localStorage and cookie with current timestamp
 * Uses "last touch" attribution - new codes overwrite old ones
 * Cookie is also set for cross-subdomain tracking (extension install flow)
 */
export function setReferralCode(code: string): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, code);
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());

  // Also set cookie for cross-subdomain access
  setReferralCookie(code);
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
 * Get UTM params from localStorage
 * Returns empty object if expired or not found
 */
function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const raw = localStorage.getItem(UTM_STORAGE_KEY);
  const timestamp = localStorage.getItem(UTM_TIMESTAMP_KEY);

  if (!raw || isExpired(timestamp)) {
    clearUtmParams();
    return {};
  }

  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    clearUtmParams();
    return {};
  }
}

/**
 * Save UTM params to localStorage with 7-day expiry
 * Only overwrites if the current URL actually contains UTM params
 */
function setUtmParams(params: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  localStorage.setItem(UTM_TIMESTAMP_KEY, Date.now().toString());
}

/**
 * Clear UTM params from localStorage
 */
function clearUtmParams(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(UTM_STORAGE_KEY);
  localStorage.removeItem(UTM_TIMESTAMP_KEY);
}

/**
 * Read UTM params from the current URL search params
 * Returns only the params that are present and non-empty
 */
function captureUtmFromUrl(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};

  for (const key of UTM_PARAMS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  }

  return params;
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
 * - Captures UTM params for attribution
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

  // Capture UTM params from URL and store (only if present)
  const urlUtmParams = captureUtmFromUrl(searchParams);
  if (Object.keys(urlUtmParams).length > 0) {
    setUtmParams(urlUtmParams);
  }

  // Track entry source for campaign attribution
  const referrer = document.referrer;
  const hasUtm = Object.keys(urlUtmParams).length > 0;
  const entrySource = hasUtm ? 'utm_tagged'
    : referrer.includes('google') ? 'google_organic'
    : referrer.includes('facebook') ? 'fb_referral'
    : referrer ? 'other_referral'
    : 'direct';
  trackEvent('landing_entry', { source: entrySource });

  // Get current referral code (may be from URL or previous visit)
  const referralCode = getReferralCode();

  // Get stored UTM params (may be from URL or previous visit)
  const utmParams = getUtmParams();

  // Update all CTA links with referral code and UTM params
  updateCtaLinks(referralCode, utmParams);

  // Show/hide referral banner
  updateBannerVisibility(referralCode);

  // Show/hide discount badges on pricing cards
  updateDiscountBadges(referralCode);

}

/**
 * Update all CTA links with the referral code and UTM params
 * Links should have data-cta-link="signup|login|buyDaily|buyWeekly" attribute
 */
function updateCtaLinks(referralCode: string | null, utmParams: Record<string, string>): void {
  const ctaLinks = document.querySelectorAll<HTMLAnchorElement>('[data-cta-link]');
  const hasUtm = Object.keys(utmParams).length > 0;

  ctaLinks.forEach((link) => {
    const originalHref = link.getAttribute('data-original-href') || link.href;

    // Store original href for future updates
    if (!link.getAttribute('data-original-href')) {
      link.setAttribute('data-original-href', originalHref);
    }

    if (referralCode || hasUtm) {
      const url = new URL(originalHref);

      if (referralCode) {
        url.searchParams.set('ref', referralCode);
      }

      for (const [key, value] of Object.entries(utmParams)) {
        url.searchParams.set(key, value);
      }

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
