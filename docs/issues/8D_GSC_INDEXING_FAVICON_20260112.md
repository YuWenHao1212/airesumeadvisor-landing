# 8D Report: GSC Indexing & Favicon Issues

**Date**: 2026-01-12
**Reporter**: Claude Code
**Project**: airesumeadvisor-landing
**Status**: Deployed - Sitemap submitted, pending indexing

---

## D1: Team

- **Owner**: WenHao Yu
- **Support**: Claude Code (analysis & recommendations)

---

## D2: Problem Description

### Issue 1: Google Search Console Indexing

- **13 pages not indexed** (vs 7 indexed pages)
- 2 pages returning 404 errors in GSC:
  - `/reset_password_apply` (legacy route)
  - `/cmJGY5hws7hLgcV4C2zlWp5Zm0xLfAa3Kui9gx0BAM=` (expired token URL)

### Issue 2: Favicon Not Updated in Google Search Results

- Google search results display **Bubble's favicon** (`.b` icon) instead of AI Resume Advisor's favicon
- Despite page being re-crawled on **Jan 6, 2026**

### Issue 3: No Sitemap Detected

- GSC URL Inspection shows: "No referring sitemaps detected"
- Sitemap may not be submitted to GSC

### Issue 4: favicon.ico 404 (New - discovered during analysis)

- `/favicon.ico` returned 404
- Google and some browsers request `/favicon.ico` directly
- This may have contributed to Google showing Bubble's favicon

### Issue 5: hreflang Configuration Error (New - discovered during analysis)

- EN and ZH blog posts did not cross-reference each other
- Each language version only pointed to itself
- Google could not identify these as language variants of the same content

### Issue 6: Duplicate Meta Descriptions (New - discovered during audit)

- Privacy, Terms, Install-extension pages all used homepage's description
- Google may treat these as duplicate content

### Issue 7: Missing 404 Page (New - discovered during audit)

- No custom 404.astro page
- Users hitting 404 had no navigation back to site

---

## D3: Containment Actions

- [x] Verified favicon.png exists at `/public/favicon.png` (100x100 PNG)
- [x] Verified favicon is correctly referenced in Layout.astro
- [x] Confirmed page was re-crawled on Jan 6, 2026
- [x] Verified sitemap exists and is referenced in robots.txt
- [x] Performed full SEO audit to discover additional issues

---

## D4: Root Cause Analysis

### Favicon Issue

| Possible Cause | Likelihood | Evidence |
|----------------|------------|----------|
| Google favicon cache from Bubble hosting era | **High** | Site was previously hosted on Bubble |
| favicon.ico missing (404) | **High** | Google requests /favicon.ico directly |
| Google favicon update delay | **High** | Normal behavior, can take weeks/months |

### Sitemap Issue

| Possible Cause | Likelihood | Evidence |
|----------------|------------|----------|
| Sitemap not submitted to GSC | **High** | "No referring sitemaps detected" |
| ~~Sitemap not referenced in robots.txt~~ | ~~Medium~~ | Verified: Already present |

### 404 Errors

| Possible Cause | Likelihood | Evidence |
|----------------|------------|----------|
| Legacy routes from old app version | **High** | `/reset_password_apply` is old route |
| Expired token URLs indexed | **High** | Token URLs should never be indexed |

### hreflang Issue

| Possible Cause | Likelihood | Evidence |
|----------------|------------|----------|
| Missing `alternateSlug` in blog frontmatter | **Confirmed** | Blog posts lacked cross-references |

### Duplicate Description Issue

| Possible Cause | Likelihood | Evidence |
|----------------|------------|----------|
| Pages not passing description prop to Layout | **Confirmed** | Used Layout's default description |

---

## D5: Corrective Actions

### Priority 1: Submit Sitemap to GSC

```bash
# 1. Verify sitemap exists ✅
curl https://airesumeadvisor.com/sitemap-index.xml

# 2. robots.txt already has Sitemap reference ✅

# 3. Submit in GSC: Indexing > Sitemaps > Add new sitemap (Manual action needed)
```

### Priority 2: Block Legacy Routes in robots.txt ✅ DONE

```txt
# Added to robots.txt
Disallow: /reset_password*
Disallow: /version-test*
Disallow: /api/*
Disallow: /*?token=*
Disallow: /*?reset_pw_link=*
```

### Priority 3: Add favicon.ico ✅ DONE

- Generated `favicon.ico` from existing `favicon.png`
- Contains 48x48 and 32x32 sizes

### Priority 4: Fix hreflang Configuration ✅ DONE

- Added `alternateSlug` to all 4 blog posts
- Fixed trailing slash in BlogLayout.astro
- EN and ZH versions now properly cross-reference each other

### Priority 5: Add Unique Meta Descriptions ✅ DONE

- Privacy: "Learn how AI Resume Advisor protects your data..."
- Terms: "Review the terms and conditions for using AI Resume Advisor..."
- Install-extension: "Install the AI Resume Advisor Chrome extension..."

### Priority 6: Create Custom 404 Page ✅ DONE

- Created `src/pages/404.astro` with:
  - Friendly error message
  - "Back to Home" button
  - "Read Our Blog" button
  - Helpful links section

### Priority 7: Request Re-indexing (After deploy)

1. Go to GSC > URL Inspection
2. Enter `https://airesumeadvisor.com/`
3. Click "Request Indexing"

---

## D6: Verification

| Action | Verification Method | Expected Result | Status |
|--------|---------------------|-----------------|--------|
| Sitemap submitted | GSC > Sitemaps | Status: Success, 9 URLs discovered | ✅ Done |
| robots.txt updated | `curl .../robots.txt` | Contains Disallow rules | ✅ Deployed |
| favicon.ico added | `curl -I .../favicon.ico` | HTTP 200 | ✅ Deployed |
| favicon.ico in HTML | Check HTML source | `<link rel="icon" href="/favicon.ico">` | ✅ Deployed |
| hreflang fixed | Check HTML source | EN/ZH cross-reference | ✅ Deployed |
| Unique descriptions | Check HTML source | Each page has unique desc | ✅ Deployed |
| 404 page | Visit invalid URL | Shows custom 404 page | ✅ Deployed |
| Favicon updated in Google | Google Search | Shows correct icon | Pending (weeks/months) |
| 404 errors resolved | GSC > Pages | No new 404 errors | Pending |

---

## D7: Preventive Actions

1. **Sitemap Automation**: Ensure sitemap is auto-generated and always up-to-date ✅
2. **robots.txt Best Practices**: Block all dynamic/token URLs from indexing ✅
3. **Favicon Checklist**: Include ICO format for browser compatibility ✅
4. **hreflang Rule**: Added to CLAUDE.md - all blog posts must include `alternateSlug` ✅
5. **Blog Template**: Created `docs/templates/blog-post-template.md` ✅
6. **Unique Descriptions**: Each page must have its own meta description ✅
7. **404 Page**: Custom 404 page with navigation links ✅
8. **Regular GSC Monitoring**: Check GSC weekly for indexing issues

---

## D8: Team Recognition

- Analysis completed with Claude Code assistance
- Issue identified during routine SEO audit on 2026-01-12
- Additional issues discovered during comprehensive audit:
  - favicon.ico 404
  - hreflang configuration
  - Duplicate meta descriptions
  - Missing 404 page

---

## Action Items

| # | Task | Priority | Status | Due Date |
|---|------|----------|--------|----------|
| 1 | ~~Update robots.txt with Sitemap reference~~ | ~~High~~ | ✅ Already present | - |
| 2 | Add Disallow rules for legacy routes | High | ✅ DEPLOYED | 2026-01-12 |
| 3 | Add favicon.ico | High | ✅ DEPLOYED | 2026-01-12 |
| 4 | Fix hreflang configuration | High | ✅ DEPLOYED | 2026-01-12 |
| 5 | Add blog post template & CLAUDE.md rule | Medium | ✅ DEPLOYED | 2026-01-12 |
| 6 | Add unique meta descriptions | High | ✅ DEPLOYED | 2026-01-12 |
| 7 | Create custom 404 page | Medium | ✅ DEPLOYED | 2026-01-12 |
| 8 | Submit sitemap to GSC manually | High | ✅ DONE | 2026-01-12 |
| 9 | Request re-indexing in GSC | Medium | ✅ DONE | 2026-01-12 |
| 10 | Monitor favicon update in Google | Low | TODO | 2026-02-12 |

---

## Commits

1. `b7b0e5d` - fix(seo): add hreflang cross-references, favicon.ico, and robots.txt rules
2. `32eafc7` - fix(seo): add unique meta descriptions and 404 page
3. `00a6d73` - fix(seo): add explicit favicon.ico reference for faster Google favicon update

---

## References

- [Google Favicon Guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [GSC Sitemap Report](https://search.google.com/search-console/sitemaps?resource_id=sc-domain:airesumeadvisor.com)
- [robots.txt Best Practices](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Meta Description Best Practices](https://developers.google.com/search/docs/appearance/snippet)
