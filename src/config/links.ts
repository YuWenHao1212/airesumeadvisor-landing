/**
 * CTA Links Configuration
 *
 * All external links to Bubble app should be defined here
 * for easy maintenance and consistency.
 */

const BUBBLE_APP_URL = import.meta.env.PUBLIC_BUBBLE_APP_URL || 'https://app.airesumeadvisor.com';

export const LINKS = {
  // Main CTAs - Bubble uses ?function parameter for auth pages
  signup: `${BUBBLE_APP_URL}?function=Signup`,
  login: `${BUBBLE_APP_URL}?function=Login`,

  // Feature CTAs
  getStarted: `${BUBBLE_APP_URL}?function=Signup`,
  tryFree: `${BUBBLE_APP_URL}?function=Signup`,
  dashboard: `${BUBBLE_APP_URL}/dashboard`,

  // Pricing CTAs
  buyDaily: `${BUBBLE_APP_URL}/pricing?plan=daily`,
  buyWeekly: `${BUBBLE_APP_URL}/pricing?plan=weekly`,
  pricing: `${BUBBLE_APP_URL}/pricing`,

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
