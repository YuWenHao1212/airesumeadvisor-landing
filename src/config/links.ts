/**
 * CTA Links Configuration
 *
 * All external links to Web App should be defined here
 * for easy maintenance and consistency.
 */

const WEB_APP_URL =
  import.meta.env.PUBLIC_WEB_APP_URL || 'https://app.airesumeadvisor.com';

// Chrome Web Store Extension ID (permanent, doesn't change on updates)
const CHROME_EXTENSION_ID = 'iafpieelbhhlmhgjekflneciffoonkgf';

export const LINKS = {
  // Main CTAs - source=landing tracks user acquisition from landing page
  signup: `${WEB_APP_URL}/auth/signup?source=landing`,
  login: `${WEB_APP_URL}/auth/login`,

  // Feature CTAs
  getStarted: `${WEB_APP_URL}/auth/signup?source=landing`,
  tryFree: `${WEB_APP_URL}/auth/signup?source=landing`,
  dashboard: `${WEB_APP_URL}/app/dashboard`,

  // Pricing CTAs - All pricing CTAs go to pricing page (plan param not supported yet)
  buyDaily: `${WEB_APP_URL}/auth/signup?source=landing`,
  buyWeekly: `${WEB_APP_URL}/auth/signup?source=landing`,
  pricing: `${WEB_APP_URL}/auth/signup?source=landing`,

  // Extension
  installExtension: '/install-extension',
  chromeWebStore: `https://chromewebstore.google.com/detail/${CHROME_EXTENSION_ID}`,

  // Legal (internal)
  terms: '/terms',
  privacy: '/privacy',

  // Anchors (same page)
  about: '#features',
  howItWorks: '#how-it-works',
  pricingSection: '#pricing',

  // Social (optional - add when available)
  twitter: 'https://twitter.com/airesumeadvisor',
  linkedin: 'https://linkedin.com/company/airesumeadvisor',
} as const;

export type LinkKey = keyof typeof LINKS;

/**
 * Returns a locale-aware version of a link.
 * - External links (https://) are returned as-is.
 * - Anchor links (#features) get prefixed: /zh-TW/#features
 * - Internal paths (/terms) get prefixed: /zh-TW/terms
 * - EN locale returns original link unchanged.
 */
export function getLocalizedLink(
  link: string,
  locale: 'en' | 'zh-TW'
): string {
  if (locale === 'en') return link;

  // External links — no prefix
  if (link.startsWith('http://') || link.startsWith('https://')) return link;

  // Anchor-only links like '#features'
  if (link.startsWith('#')) return `/zh-TW/${link}`;

  // Anchor links with path like '/#features'
  if (link.startsWith('/#')) return `/zh-TW${link}`;

  // Internal paths like '/terms', '/blog'
  if (link.startsWith('/')) return `/zh-TW${link}`;

  return link;
}
