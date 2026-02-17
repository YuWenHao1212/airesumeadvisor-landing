# Full-Site i18n Implementation Plan (v2)

**Created**: 2026-02-17
**Version**: 2.0 (incorporates audit feedback + codebase verification)
**Status**: Backlog
**Priority**: Medium
**Project**: airesumeadvisor-landing
**Estimate**: 18-25 hr (total, 4 phases)

---

## Why

### Business Goals

1. **ZH-TW Market Penetration**: Landing page is English-only; Chinese-speaking visitors bounce without localized experience
2. **SEO Improvement**: Blog listing uses `?lang=zh-TW` query parameter, which Google does not index as a separate page — Chinese blog content is effectively invisible to search engines
3. **Conversion Rate**: Localized landing page in ZH-TW expected to improve Taiwan market conversion
4. **Content Strategy**: Enable the existing EN/ZH blog content pairing to be fully leveraged with proper URL routing

### Current State

| Aspect | Status | Detail |
|--------|--------|--------|
| i18n Library | None | No `astro-i18n`, `i18next`, etc. |
| Blog Language Support | Partial | `lang` + `alternateSlug` in frontmatter, `LangSwitch.astro` component |
| Blog SEO | Partial | `BlogLayout.astro` has hreflang tags, but listing page uses `?lang=zh-TW` (not indexed) |
| Landing Page | EN only | ~200+ hardcoded English strings across 12 components |
| URL Routing | None | No `/en/` or `/zh-TW/` prefixes |
| Translation Files | None | All strings hardcoded in components |
| Legal Pages | EN only | `terms.astro` (516 lines), `privacy.astro` (810 lines) of legal text |

### Decision: Why This Approach

Evaluated 5 options:

| Option | Verdict | Reason |
|--------|---------|--------|
| Astro Built-in i18n | **Selected** | Core team maintained, SSG compatible, zero deps for routing |
| Manual Translation System | **Selected** | TypeScript type-safe, zero deps, full control |
| astro-i18n-aut | Rejected | Low maintenance (197 stars, last release ~1yr ago) |
| astro-i18next | Rejected | Abandoned (3yr no update), incompatible with Astro 5 |
| Paraglide.js | Rejected | No SSG support, requires `output: "server"`, conflicts with Azure App Service |

**Final approach: Astro Built-in i18n Routing + Manual TypeScript Translation System**

### Deployment Context

- **Hosting**: Azure App Service (NOT Azure Static Web Apps)
- **Serving**: `serve` package (v14.2.5) via `npx serve dist -l 8080`
- **Config**: `public/serve.json` (currently has cache headers only, no redirects)
- **CI/CD**: `.github/workflows/azure-webapp.yml`
- **Build**: Astro SSG (`output: 'static'`), deploys `dist/` directory
- **No `staticwebapp.config.json`** — this file does not exist

---

## What

### Target URL Structure

```
EN (default, no prefix):
  /                                    -> Landing page (EN)
  /blog/                               -> Blog listing (EN)
  /blog/how-to-tailor-resume/          -> Blog post (EN)
  /terms                               -> Terms (EN)
  /privacy                             -> Privacy (EN)
  /install-extension                   -> Extension relay (shared, see Decision #5)
  /404                                 -> Error page (shared, see Decision #4)

ZH-TW (with prefix):
  /zh-TW/                              -> Landing page (ZH-TW)
  /zh-TW/blog/                         -> Blog listing (ZH-TW)
  /zh-TW/blog/how-to-tailor-resume/    -> Blog post (ZH-TW)
  /zh-TW/terms                         -> Terms (ZH-TW)
  /zh-TW/privacy                       -> Privacy (ZH-TW)
```

### Key Decisions

**Decision #1: Blog file structure — flat with lang filter (not subfolders)**

Keep all blog files in `src/content/blog/` (flat). Filter by `lang` field in `getStaticPaths()` and `getCollection()`. Rename ZH files to remove `-zh` suffix to avoid redundant language markers in URLs.

**Decision #2: Redirects — Astro `redirects` config (primary) + `serve.json` (fallback)**

`serve` package supports `redirects` in `serve.json`. Use both:
- `astro.config.mjs` `redirects` for build-time redirect HTML files
- `serve.json` `redirects` array as server-level fallback

**Decision #3: Date formatting — locale-aware**

Currently hardcoded to `'en-US'` in `BlogLayout.astro:32-42` and `BlogCard.astro:13`. Change to use `lang` prop: EN → "January 15, 2026", ZH → "2026年1月15日".

**Decision #4: 404 page — single page with client-side locale detection**

Astro SSG only generates one `404.html`. The `serve` package serves the root-level `404.html` for all missing paths. Cannot have `/zh-TW/404.html` served automatically.

Solution: Keep single `src/pages/404.astro`. Add client-side JS to detect if the URL starts with `/zh-TW/` and swap displayed text to Chinese. No separate ZH-TW 404 page.

**Decision #5: install-extension page — no ZH version needed**

This is a relay page (auto-redirects to Chrome Web Store within 100ms). Only 2 visible strings ("Redirecting..." and fallback link). Not worth a separate ZH page. Add minor locale-aware text via URL param detection if desired, but this is lowest priority.

**Decision #6: Language preference — no persistence mechanism in v1**

No `localStorage` or cookie-based language memory in initial implementation. Users navigate via explicit language switcher. Rationale: SSG cannot redirect based on stored preference without client-side JS flash. Consider adding in v2 if analytics show user demand.

**Decision #7: Terms/Privacy — defer ZH translation**

`terms.astro` (516 lines) and `privacy.astro` (810 lines) contain extensive legal text. ZH translation requires legal review. Defer to Phase 4 as optional. Create ZH pages that initially display EN content with a notice "This page is available in English only" until proper legal translation is ready.

### Files Inventory

**New Files (8-10):**

```
src/i18n/
  ui.ts              # Translation dictionary (~170 UI strings + ~30 meta strings)
  utils.ts           # getLangFromUrl(), useTranslations(), getLocalizedPath(), formatDate()
  types.ts           # Locale type, TranslationKey type
src/components/
  LanguageSwitcher.astro  # NEW: Header language switcher (globe icon, distinct from blog LangSwitch)
src/pages/zh-TW/
  index.astro        # ZH-TW landing page
  blog/
    index.astro      # ZH-TW blog listing
    [...slug].astro  # ZH-TW blog post
  terms.astro        # ZH-TW terms (initially EN with notice, see Decision #7)
  privacy.astro      # ZH-TW privacy (initially EN with notice, see Decision #7)
```

**Modified Files (~25):**

```
astro.config.mjs                        # i18n config + sitemap i18n + redirects
public/serve.json                       # Add redirects array
src/layouts/Layout.astro                 # Full <head> i18n refactor
src/layouts/BlogLayout.astro             # alternateURL logic + date formatting + BlogCTA lang prop
src/pages/index.astro                    # Pass locale to components
src/pages/blog/index.astro              # EN-only listing, remove tab switching
src/pages/blog/[...slug].astro          # Filter EN posts only in getStaticPaths
src/pages/404.astro                     # Client-side locale detection
src/config/links.ts                     # Locale-aware internal links
src/components/Header.astro             # t() translations + LanguageSwitcher + locale-aware navItems
src/components/Hero.astro               # t() translations
src/components/Features.astro           # t() translations
src/components/ExtensionPromo.astro     # t() translations
src/components/ResumeSimulator.astro    # t() translations
src/components/JobSimulator.astro       # t() translations
src/components/HowItWorks.astro         # t() translations
src/components/Pricing.astro            # t() translations
src/components/SocialProof.astro        # t() translations
src/components/BottomCTA.astro          # t() translations
src/components/ReferralBanner.astro     # t() translations
src/components/Footer.astro             # t() translations
src/components/blog/BlogCard.astro      # locale prop + locale-aware href + date formatting
src/components/blog/BlogCTA.astro       # lang prop + t() translations
src/components/blog/LangSwitch.astro    # New URL routing (/zh-TW/blog/slug)
src/content/blog/*-zh.mdx (x4)         # Rename files + update alternateSlug
src/content/blog/*.mdx (x4)            # Update alternateSlug for EN files
```

---

## How (4 Phases)

---

### Phase 1: i18n Infrastructure

**Goal**: Set up the foundation — config, translation system, utilities, Layout refactor. No visible changes to end users yet.

**Effort Estimate**: 3-4 hr

| # | Task | Files | Detail |
|---|------|-------|--------|
| 1.1 | Add Astro i18n config | `astro.config.mjs` | Add `i18n: { locales: ['en', 'zh-TW'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } }` |
| 1.2 | Configure sitemap i18n | `astro.config.mjs` | Update sitemap integration: `sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US', 'zh-TW': 'zh-Hant-TW' } } })`. Must be in Phase 1 so all subsequent pages are correctly included. |
| 1.3 | Create type definitions | `src/i18n/types.ts` | `Locale = 'en' \| 'zh-TW'`, `TranslationKey` type. Ensure type safety with `as const` + `satisfies`. |
| 1.4 | Create translation dictionary | `src/i18n/ui.ts` | Extract all EN strings from components (~170 UI strings + ~30 meta strings = ~200 total). Organize by namespace: `header.*`, `hero.*`, `features.*`, `pricing.*`, `blog.*`, `meta.*`, `404.*`. ZH-TW values stubbed as empty string (falls back to EN). |
| 1.5 | Create i18n utilities | `src/i18n/utils.ts` | `getLangFromUrl(url)`: extract locale from URL path. `useTranslations(lang)`: returns `t(key)` function with EN fallback. `getLocalizedPath(path, locale)`: builds locale-prefixed path (e.g., `/blog/` → `/zh-TW/blog/`). `getAlternateUrl(url, locale)`: for hreflang tags. `formatDate(date, locale)`: locale-aware date formatting (EN: 'en-US', ZH: 'zh-TW'). |
| 1.6 | Refactor Layout.astro | `src/layouts/Layout.astro` | **Full `<head>` refactoring.** Current state: `lang="en"` hardcoded, `og:locale="en_US"` hardcoded, no hreflang tags, JSON-LD `description` hardcoded EN, no `inLanguage` field. Changes: Accept `lang` prop (default `'en'`). Dynamic `<html lang>`. Dynamic `og:locale`. Dynamic default `description` per locale. Add hreflang `<link>` tags (self + alternate + x-default). Add `inLanguage` to JSON-LD structured data. Dynamic `og:image:alt`. |
| 1.7 | Add locale-aware link helper | `src/config/links.ts` | Add `getLocalizedLink(key, locale)` function. For internal links (terms, privacy, blog), prefix with locale. For anchor links (`#features`, `#how-it-works`, `#pricing`), prefix with locale path: `/#features` → `/zh-TW/#features`. For external links (signup, login, Chrome store), return as-is. Critical: Header `navItems` currently hardcode `'/#features'` etc. — when on `/zh-TW/blog/...`, clicking "About" must go to `/zh-TW/#features`, not `/#features` (which is the EN homepage). |

**Deliverable**: `npm run build` passes. No visible changes on site. Translation system ready to use. Layout supports locale.

**Acceptance Criteria**:
- [ ] `astro.config.mjs` has `i18n` configuration
- [ ] `@astrojs/sitemap` has `i18n` locale mapping configured
- [ ] `src/i18n/types.ts` exports `Locale` type
- [ ] `src/i18n/ui.ts` has all EN strings extracted (~200 keys), ZH-TW stubbed
- [ ] `useTranslations('en')` returns correct strings
- [ ] `useTranslations('zh-TW')` falls back to EN for unstubbed keys
- [ ] TypeScript: missing translation keys produce compile error
- [ ] `formatDate(date, 'zh-TW')` returns "2026年1月15日" format
- [ ] `getLocalizedPath('/blog/', 'zh-TW')` returns `/zh-TW/blog/`
- [ ] `getLocalizedPath('/#features', 'zh-TW')` returns `/zh-TW/#features`
- [ ] `Layout.astro` accepts `lang` prop and renders dynamic `<html lang>`, `og:locale`, JSON-LD `inLanguage`, hreflang tags
- [ ] `npm run build` passes
- [ ] `npm run lint` passes

---

### Phase 2: Blog Migration

**Goal**: Migrate blog from `?lang=zh-TW` query parameter to `/zh-TW/blog/` URL routing. Fix the most critical SEO problem. Eliminate duplicate content.

**Effort Estimate**: 5-7 hr

| # | Task | Files | Detail |
|---|------|-------|--------|
| 2.1 | Rename ZH blog files (remove `-zh` suffix) | `src/content/blog/` | Rename 4 files: `resume-diagnosis-2026-zh.mdx` → `resume-diagnosis-2026.mdx` (will conflict — see note), etc. **Note**: Cannot have two files with the same name. Use a distinguishing convention: rename ZH files to match EN slug but keep them differentiated by a `zh-` prefix or use a subdirectory. **Revised decision**: Move ZH files to `src/content/blog/zh/` subfolder. File names match EN slugs exactly. Astro content collection `slug` will be `zh/resume-diagnosis-2026`. The `getStaticPaths()` in `/zh-TW/blog/[...slug].astro` strips the `zh/` prefix. |
| 2.2 | Update alternateSlug in all blog frontmatter | `src/content/blog/*.mdx` (8 files) | EN files: `alternateSlug` points to slug without `zh/` prefix (used for hreflang URL construction). ZH files: `alternateSlug` points to EN slug. Both sets must be consistent. |
| 2.3 | Filter EN route to EN posts only | `src/pages/blog/[...slug].astro` | Update `getStaticPaths()`: filter `posts.filter(p => p.data.lang !== 'zh-TW')`. Currently returns ALL posts (EN+ZH), which would cause ZH posts to be accessible at both `/blog/xxx-zh` and `/zh-TW/blog/xxx` = duplicate content. |
| 2.4 | Create ZH-TW blog listing | `src/pages/zh-TW/blog/index.astro` | New page. Filters `lang === 'zh-TW'` posts. Uses `t()` for all UI strings. Translated page-level `<Layout title>` and `description` via `t('blog.meta.title')`, `t('blog.meta.description')`. Add hreflang tags: self (`/zh-TW/blog/`) + alternate (`/blog/`) + x-default (`/blog/`). |
| 2.5 | Create ZH-TW blog post route | `src/pages/zh-TW/blog/[...slug].astro` | `getStaticPaths()` filters `lang === 'zh-TW'` only. Strips `zh/` prefix from Astro slug to produce clean URL. Passes `lang='zh-TW'` to BlogLayout. |
| 2.6 | Refactor EN blog listing | `src/pages/blog/index.astro` | **Remove entirely**: client-side tab switching script (lines 124-169), `#posts-zh` container (lines 89-117), ZH tab button (lines 44-50), `chinesePosts` variable (line 14-15). Show EN posts only. Add cross-link to `/zh-TW/blog/` ("View Chinese posts" or similar). Add hreflang tags: self (`/blog/`) + alternate (`/zh-TW/blog/`). Translate page-level meta via `t()`. |
| 2.7 | Update BlogLayout.astro | `src/layouts/BlogLayout.astro` | **3 changes**: (a) Fix `alternateURL` logic (line 47): currently `new URL(\`/blog/${alternateSlug}/\`, Astro.site)` — wrong for ZH posts. EN posts should link to `/zh-TW/blog/{alternateSlug}/`, ZH posts to `/blog/{alternateSlug}/`. (b) Fix date formatting (lines 32-42): replace hardcoded `'en-US'` with `formatDate(pubDate, lang)` from i18n utils. (c) Pass `lang` prop to `<BlogCTA />` (line 192): currently `<BlogCTA />` with no props. Change to `<BlogCTA lang={lang} />`. |
| 2.8 | Update LangSwitch.astro | `src/components/blog/LangSwitch.astro` | Update `href` (line 14): currently `/blog/${alternateSlug}`. Change: if `currentLang === 'en'`, link to `/zh-TW/blog/${alternateSlug}`. If `currentLang === 'zh-TW'`, link to `/blog/${alternateSlug}`. |
| 2.9 | Update BlogCard.astro | `src/components/blog/BlogCard.astro` | **3 breaking changes**: (a) Accept `locale` prop. Build `href` with locale prefix: EN → `/blog/${slug}`, ZH → `/zh-TW/blog/${slug}` (line 50 currently hardcoded). (b) Fix date formatting (line 13): `'en-US'` → `formatDate(pubDate, locale)`. (c) Translate "Read article" text (line 62) via `t()`. |
| 2.10 | Update BlogCTA.astro | `src/components/blog/BlogCTA.astro` | Accept `lang` prop (currently no props). Use `t()` for 3 strings: "Ready to Optimize Your Resume?", description text, "Get Your Match Score Free". |
| 2.11 | Add 301 redirects | `astro.config.mjs`, `public/serve.json` | **Both layers needed.** Astro `redirects` config generates redirect HTML files at build time. `serve.json` `redirects` array provides server-level redirects. Map all 4 old ZH blog URLs + `?lang=zh-TW` blog listing: `/blog/resume-diagnosis-2026-zh` → `/zh-TW/blog/resume-diagnosis-2026` (301), `/blog/best-jobscan-alternatives-2026-zh` → `/zh-TW/blog/best-jobscan-alternatives-2026` (301), `/blog/best-linkedin-chrome-extensions-job-seekers-2026-zh` → `/zh-TW/blog/best-linkedin-chrome-extensions-job-seekers-2026` (301), `/blog/how-to-tailor-resume-to-job-description-zh` → `/zh-TW/blog/how-to-tailor-resume-to-job-description` (301). Note: `?lang=zh-TW` redirect cannot be done via Astro config (query params not supported). Add client-side redirect in EN blog listing: if `?lang=zh-TW` detected, redirect to `/zh-TW/blog/`. |

**Deliverable**: Blog has proper locale-based URLs. Old URLs redirect. SEO-correct hreflang on all blog pages. No duplicate content.

**Acceptance Criteria**:
- [ ] ZH blog files moved to `src/content/blog/zh/` with matching EN slugs
- [ ] `alternateSlug` values updated and consistent in all 8 blog files
- [ ] `/blog/` shows EN posts only (no ZH posts visible)
- [ ] `/zh-TW/blog/` shows ZH-TW posts only
- [ ] EN `[...slug].astro` `getStaticPaths()` filters out ZH posts — no ZH posts accessible under `/blog/`
- [ ] ZH `[...slug].astro` `getStaticPaths()` filters ZH posts only, strips `zh/` prefix from URL
- [ ] Each blog post has correct hreflang tags (EN→`/zh-TW/blog/xxx`, ZH→`/blog/xxx`)
- [ ] Blog listing pages have hreflang tags (`/blog/` ↔ `/zh-TW/blog/`)
- [ ] LangSwitch navigates between `/blog/slug` ↔ `/zh-TW/blog/slug`
- [ ] Old URLs (`/blog/xxx-zh`) return 301 redirect to `/zh-TW/blog/xxx`
- [ ] `/blog?lang=zh-TW` client-side redirects to `/zh-TW/blog/`
- [ ] Date formatting: EN shows "January 15, 2026", ZH shows "2026年1月15日"
- [ ] BlogCTA receives `lang` prop and shows translated text
- [ ] BlogCard `href` uses locale prefix
- [ ] Sitemap includes both language blog URLs with hreflang
- [ ] `npm run build` passes
- [ ] `npm run lint` passes

**SEO Note**: This phase fixes the most critical SEO issue — Chinese blog content not being independently indexed by Google.

---

### Phase 3: Landing Page Localization

**Goal**: Translate all 12 landing page components. Create ZH-TW landing page. Add global language switcher.

**Effort Estimate**: 6-8 hr

| # | Task | Files | Detail |
|---|------|-------|--------|
| 3.1 | Create LanguageSwitcher component | `src/components/LanguageSwitcher.astro` | **New component** (distinct from blog `LangSwitch.astro`). Globe icon or flag toggle for Header. Uses `getLocalizedPath(currentPath, targetLocale)`. Shows current locale + link to alternate. Must work on all pages (landing, blog, legal). Depends on `getLocalizedPath()` from Phase 1. |
| 3.2 | Refactor Header for i18n | `src/components/Header.astro` | Accept `lang` prop. Replace hardcoded `navItems` labels with `t()`. Make `navItems[].href` locale-aware: `'/#features'` → `getLocalizedPath('/#features', lang)` so clicking "About" from `/zh-TW/blog/` goes to `/zh-TW/#features` not `/#features`. Add `<LanguageSwitcher />` to desktop nav and mobile menu. Logo `href`: `/` for EN, `/zh-TW/` for ZH. Pass `lang` to child CTA labels ("Log In", "Sign Up Free"). |
| 3.3 | Refactor Footer for i18n | `src/components/Footer.astro` | Accept `lang` prop. Translate link labels. Make internal links locale-aware (`/terms` → `/zh-TW/terms`). |
| 3.4 | Translate Hero | `src/components/Hero.astro` | Accept `lang` prop. ~12 strings: headlines, description, CTA button text, trust badges. |
| 3.5 | Translate Features | `src/components/Features.astro` | Accept `lang` prop. ~18 strings: section title, 3 tab titles, 3 tab descriptions, 3 feature lists. |
| 3.6 | Translate ExtensionPromo | `src/components/ExtensionPromo.astro` | Accept `lang` prop. ~12 strings: headline, description, feature list, CTAs. |
| 3.7 | Translate ResumeSimulator | `src/components/ResumeSimulator.astro` | Accept `lang` prop. ~8 strings. |
| 3.8 | Translate JobSimulator | `src/components/JobSimulator.astro` | Accept `lang` prop. ~6 strings. |
| 3.9 | Translate HowItWorks | `src/components/HowItWorks.astro` | Accept `lang` prop. ~6 strings. |
| 3.10 | Translate Pricing | `src/components/Pricing.astro` | Accept `lang` prop. ~22 strings: plan names, descriptions, feature lists, CTAs, badges ("Popular", "20% OFF"). |
| 3.11 | Translate SocialProof | `src/components/SocialProof.astro` | Accept `lang` prop. Section title, descriptions. |
| 3.12 | Translate BottomCTA | `src/components/BottomCTA.astro` | Accept `lang` prop. ~6 strings. |
| 3.13 | Translate ReferralBanner | `src/components/ReferralBanner.astro` | Accept `lang` prop. ~4 strings. |
| 3.14 | Fill ZH-TW translations | `src/i18n/ui.ts` | Complete all ZH-TW values for landing page strings (~150-170 keys). Requires copywriting effort — these should be natural Chinese, not machine-translated. |
| 3.15 | Update EN index.astro | `src/pages/index.astro` | Pass `lang='en'` to all components. Add hreflang tags pointing to `/zh-TW/`. |
| 3.16 | Create ZH-TW landing page | `src/pages/zh-TW/index.astro` | Import same components, pass `lang='zh-TW'`. Add hreflang tags pointing to `/`. |
| 3.17 | Update BlogLayout Header/Footer | `src/layouts/BlogLayout.astro` | Pass `lang` prop to `<Header lang={lang} />` and `<Footer lang={lang} />` (currently no lang prop passed, lines 129 and 195). |

**Deliverable**: Full ZH-TW landing page at `/zh-TW/`. Language switcher in header on all pages.

**Acceptance Criteria**:
- [ ] `/zh-TW/` renders complete landing page in Traditional Chinese
- [ ] All 12 components display translated text when `lang='zh-TW'`
- [ ] No English text leaking through on ZH-TW page (verify by searching for common EN strings)
- [ ] LanguageSwitcher in header works on all pages (landing, blog listing, blog post, legal)
- [ ] Header nav links are locale-aware: clicking "About" from `/zh-TW/blog/` navigates to `/zh-TW/#features`
- [ ] Logo links to `/` (EN) or `/zh-TW/` (ZH)
- [ ] Footer links are locale-aware (`/terms` ↔ `/zh-TW/terms`)
- [ ] CTAs link correctly from both locales (external links unchanged, internal links locale-prefixed)
- [ ] Blog pages show Header/Footer in correct locale
- [ ] Responsive design works on ZH-TW at all breakpoints (375px, 414px, 768px, 1024px, 1280px, 1440px)
- [ ] hreflang tags on landing pages (`/` ↔ `/zh-TW/`)
- [ ] `npm run build` passes
- [ ] `npm run lint` passes

---

### Phase 4: Remaining Pages + SEO Polish + QA

**Goal**: Handle remaining pages (404, legal, install-extension). Complete SEO verification. Final QA.

**Effort Estimate**: 4-6 hr

| # | Task | Files | Detail |
|---|------|-------|--------|
| 4.1 | Update 404 page with locale detection | `src/pages/404.astro` | Add client-side JS: if `window.location.pathname.startsWith('/zh-TW/')`, swap text to Chinese. Translate ~12 strings. Make links locale-aware (`/` → `/zh-TW/`, `/blog/` → `/zh-TW/blog/`). Keep as single `404.astro` (see Decision #4). |
| 4.2 | Create ZH-TW terms page (placeholder) | `src/pages/zh-TW/terms.astro` | Display EN content with bilingual notice: "This page is currently available in English only. / 此頁面目前僅提供英文版本。" Full legal translation deferred. Add hreflang linking to `/terms`. |
| 4.3 | Create ZH-TW privacy page (placeholder) | `src/pages/zh-TW/privacy.astro` | Same as 4.2. Display EN content with bilingual notice. Add hreflang linking to `/privacy`. |
| 4.4 | Add hreflang to EN terms/privacy | `src/pages/terms.astro`, `src/pages/privacy.astro` | Pass `lang='en'` to Layout (enables hreflang generation from Phase 1 Layout refactor). |
| 4.5 | Verify all hreflang tags | All pages | Systematic check: every EN page must have hreflang pointing to ZH-TW counterpart and vice versa. Every page must have `x-default` pointing to EN version. |
| 4.6 | Verify structured data | `src/layouts/Layout.astro`, `src/layouts/BlogLayout.astro` | JSON-LD `inLanguage` field correct per locale. Blog `ArticleSchema` already has this (line 76). Main Layout needs it added (Phase 1 task 1.6). |
| 4.7 | Verify sitemap output | Build output | Run `npm run build` and inspect `dist/sitemap-*.xml`. Confirm all pages appear with correct hreflang annotations. |
| 4.8 | Test 301 redirects | `astro.config.mjs`, `public/serve.json` | Build and verify: (a) Old blog URLs produce redirect HTML files in `dist/`. (b) `serve.json` redirects work when running `npx serve dist`. Test all 4 old ZH blog URLs. |
| 4.9 | Lighthouse audit | Manual | Run Lighthouse on both `/` and `/zh-TW/`. Targets: Performance > 90, Accessibility > 90, SEO > 95. Run on both desktop and mobile. |
| 4.10 | Cross-locale link integrity test | Manual | Navigate every page in both locales. Click every link. Verify no broken links, no locale mixing (EN content on ZH page or vice versa). Special attention: Header nav links from blog pages, Footer links, BlogCard hrefs, LangSwitch links. |
| 4.11 | Prefetch impact check | `astro.config.mjs` | Current `prefetchAll: true` will now prefetch doubled pages. Monitor build output for page count. If > 50 pages, consider switching to `prefetchAll: false` with selective prefetch. |

**Deliverable**: Complete i18n implementation. All pages available in both locales (legal pages as EN placeholder). SEO fully verified.

**Acceptance Criteria**:
- [ ] 404 page shows Chinese text when URL starts with `/zh-TW/`
- [ ] 404 page links are locale-aware
- [ ] `/zh-TW/terms` and `/zh-TW/privacy` display EN content with bilingual notice
- [ ] All pages have correct hreflang tags (spot check at least 6 pages: landing, blog listing, blog post, terms — in both locales)
- [ ] Sitemap includes all pages with hreflang annotations
- [ ] No broken links across locales (full manual walkthrough)
- [ ] Structured data `inLanguage` correct on all pages
- [ ] All 4 old blog URL redirects work (301)
- [ ] `/blog?lang=zh-TW` redirects to `/zh-TW/blog/`
- [ ] Lighthouse SEO score > 95 on both `/` and `/zh-TW/`
- [ ] Lighthouse Performance > 90 on both locales
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm run check` passes (TypeScript)

---

## Effort Summary

| Phase | Scope | Tasks | Estimate | Complexity |
|-------|-------|-------|----------|------------|
| **Phase 1** | i18n Infrastructure | 7 | 3-4 hr | Medium |
| **Phase 2** | Blog Migration | 11 | 5-7 hr | High |
| **Phase 3** | Landing Page Localization | 17 | 6-8 hr | Medium (high volume) |
| **Phase 4** | Remaining Pages + SEO + QA | 11 | 4-6 hr | Low-Medium |
| **Total** | | **46 tasks** | **18-25 hr** | |

### Effort Breakdown by Type

| Activity | Hours | % |
|----------|-------|---|
| Code architecture (config, utils, types, Layout refactor) | 4-5 hr | ~20% |
| Component refactoring (hardcoded → t()) | 5-7 hr | ~28% |
| ZH-TW translation copywriting (~200 strings) | 3-4 hr | ~16% |
| Page routing, redirects, blog restructure | 3-4 hr | ~16% |
| SEO verification, testing, QA | 3-5 hr | ~20% |

### Why Higher Than v1 Estimate

v1 estimated 14-20 hr. v2 is 18-25 hr (+4-5 hr) because:
- Layout.astro refactoring is larger than initially scoped (full `<head>` rewrite)
- Blog file restructuring is more complex (slug conflicts, `zh/` subfolder)
- Header locale-aware nav links require careful handling (anchor links from non-homepage)
- New LanguageSwitcher component not in v1
- BlogLayout needs 3 separate fixes (alternateURL, date format, BlogCTA prop)
- QA/testing phase expanded to cover cross-locale link integrity
- 404 locale detection needs client-side solution

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Blog URL change breaks existing backlinks / GSC rankings | High | Medium | 301 redirects via both Astro config + serve.json. Resubmit sitemap to GSC immediately after deploy. |
| ZH slug rename + file move causes stale internal links | Medium | Medium | Update all `alternateSlug` references. Redirect every old `/blog/xxx-zh` URL. |
| `serve` package doesn't support redirect config format | Medium | Low | Verify `serve.json` redirect syntax before Phase 2. Fallback: Astro build-time redirects alone. |
| ZH-TW translation quality (machine vs natural Chinese) | Medium | Medium | All translations should be reviewed by native speaker. Mark as draft until reviewed. |
| Component layout breaks with Chinese text | Low | Low | Chinese text is typically shorter than English. Test at all breakpoints. |
| Build time increase (~2x pages) | Low | Low | Monitor. Astro SSG handles well. Currently ~15 pages → ~25 pages. |
| Prefetch doubling network requests | Low | Low | Monitor with Lighthouse. Switch to selective prefetch if needed. |

---

## Dependencies

- **Zero new npm packages** — uses Astro built-in i18n + manual TS translation
- **ZH-TW copywriting** (~200 UI strings) — needs native speaker for natural translations
- **Legal review** (optional, deferred) — ZH-TW terms/privacy require legal translation
- **GSC resubmission** — after Phase 2 deploy, resubmit sitemap for re-indexing

---

## Success Metrics

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| ZH-TW blog pages indexed in GSC | 0 (query params not indexed) | 4 (all ZH posts) | 4 weeks post-deploy |
| ZH-TW blog listing indexed | 0 | 1 (`/zh-TW/blog/`) | 2 weeks post-deploy |
| ZH-TW organic traffic | ~0 | Measurable growth | 8 weeks post-deploy |
| ZH-TW landing page bounce rate | N/A | < 60% | 4 weeks post-deploy |
| Lighthouse SEO (both locales) | 95+ (EN only) | 95+ (both) | Immediate |
| Lighthouse Performance (both) | 90+ (EN only) | 90+ (both) | Immediate |
| Old blog URL redirect success | N/A | 100% (all 4 URLs) | Immediate |

---

## Out of Scope (v1)

Explicitly deferred to future iterations:

1. **Language persistence** (localStorage/cookie) — add if analytics show demand
2. **ZH-TW legal text translation** — requires legal review
3. **Locale-specific OG images** — current EN image used for both locales
4. **RSS feed per locale** — no RSS feed exists yet
5. **Browser language auto-detection redirect** — SSG cannot server-redirect; would need client-side JS with flash
6. **install-extension ZH version** — relay page, auto-redirects in 100ms
7. **Third language support** — architecture supports it but not planned

---

## References

- [Astro i18n Routing Docs](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Recipe](https://docs.astro.build/en/recipes/i18n/)
- [`serve` package config docs](https://github.com/vercel/serve#configuration)
- Existing blog i18n: `docs/tasks-done/2026-01-05-landing-blog-feature.md`
- Design tokens: `.claude/skills/frontend-design/resources/design-tokens.md`

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-02-17 | Initial plan |
| v2.0 | 2026-02-17 | Incorporated audit feedback. Resolved: deployment env (Azure App Service + serve, not SWA), Layout.astro full refactor scope, blog slug conflict (zh/ subfolder), sitemap i18n moved to Phase 1. Added: 7 key decisions, date formatting fix, BlogCard/BlogCTA breaking changes detail, Header locale-aware nav links, LanguageSwitcher component, 404 client-side detection, terms/privacy deferral strategy, cross-locale QA testing. Revised estimate from 16-22h to 18-25h. |
