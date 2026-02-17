import { ui, type TranslationKey } from './ui';
import { defaultLocale, type Locale } from './types';

/**
 * Extract locale from URL pathname.
 * Returns 'zh-TW' for paths starting with /zh-TW/, 'en' otherwise.
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh-TW') return 'zh-TW';
  return defaultLocale;
}

/**
 * Returns a translation function for the given locale.
 * Falls back to EN when a ZH-TW key is missing or empty.
 */
export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey): string {
    const value = ui[lang]?.[key];
    if (value) return value;
    return ui[defaultLocale][key];
  };
}

/**
 * Build a locale-prefixed path.
 * EN (default) paths have no prefix; ZH-TW paths get /zh-TW prefix.
 *
 * Handles anchor links:
 *   getLocalizedPath('/#features', 'zh-TW') => '/zh-TW/#features'
 *   getLocalizedPath('/#features', 'en')    => '/#features'
 *
 * Handles absolute paths:
 *   getLocalizedPath('/blog/', 'zh-TW')     => '/zh-TW/blog/'
 *   getLocalizedPath('/terms', 'zh-TW')     => '/zh-TW/terms'
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;

  // Handle anchor-only links like '#features' (without leading /)
  if (path.startsWith('#')) return `/${locale}/${path}`;

  // Handle paths starting with /
  if (path.startsWith('/')) return `/${locale}${path}`;

  // Handle paths like 'blog/' (no leading slash)
  return `/${locale}/${path}`;
}

/**
 * Get the alternate URL for hreflang tags.
 * Given a URL and target locale, returns the full URL in that locale.
 */
export function getAlternateUrl(
  currentUrl: URL,
  targetLocale: Locale,
  site: URL
): URL {
  const pathname = currentUrl.pathname;

  // Strip existing locale prefix if present
  const strippedPath = pathname.startsWith('/zh-TW/')
    ? pathname.replace('/zh-TW/', '/')
    : pathname.startsWith('/zh-TW')
      ? pathname.replace('/zh-TW', '/')
      : pathname;

  const localizedPath = getLocalizedPath(strippedPath, targetLocale);
  return new URL(localizedPath, site);
}

/**
 * Format a date according to locale conventions.
 * EN: "January 15, 2026"
 * ZH-TW: "2026年1月15日"
 */
export function formatDate(date: Date, locale: Locale): string {
  const dateLocale = locale === 'zh-TW' ? 'zh-TW' : 'en-US';
  return date.toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
