/**
 * CTA Links Configuration
 *
 * All external links to Web App should be defined here
 * for easy maintenance and consistency.
 */

const WEB_APP_URL =
  import.meta.env.PUBLIC_WEB_APP_URL || 'https://app.airesumeadvisor.com';

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
