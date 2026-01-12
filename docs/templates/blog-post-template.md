# Blog Post Template

## EN Version (`your-post-slug.mdx`)

```yaml
---
title: "Your Title Here"
description: "A compelling description for SEO (150-160 characters)."
pubDate: 2026-01-01
author: "AI Resume Advisor"
image: "/images/blog/your-image.webp"
tags: ["tag1", "tag2", "tag3"]
lang: "en"
alternateSlug: "your-post-slug-zh"
---

Your content here...
```

## ZH Version (`your-post-slug-zh.mdx`)

```yaml
---
title: "你的標題"
description: "吸引人的 SEO 描述（150-160 字元）"
pubDate: 2026-01-01
author: "AI Resume Advisor"
image: "/images/blog/your-image.webp"
tags: ["標籤1", "標籤2", "標籤3"]
lang: "zh-TW"
alternateSlug: "your-post-slug"
---

你的內容...
```

---

## Checklist

- [ ] EN 版本檔名：`your-post-slug.mdx`
- [ ] ZH 版本檔名：`your-post-slug-zh.mdx`
- [ ] EN `alternateSlug` 指向 ZH 版本
- [ ] ZH `alternateSlug` 指向 EN 版本
- [ ] 圖片已放入 `public/images/blog/` 且 < 200KB
- [ ] `pubDate` 使用正確日期格式 (YYYY-MM-DD)
- [ ] Description 長度 150-160 字元

---

## File Naming Convention

| Language | Filename Pattern | Example |
|----------|------------------|---------|
| English | `slug.mdx` | `resume-tips-2026.mdx` |
| 繁體中文 | `slug-zh.mdx` | `resume-tips-2026-zh.mdx` |

---

## hreflang Output (Auto-generated)

After build, the HTML will contain:

```html
<!-- EN version -->
<link rel="alternate" hreflang="en" href=".../your-post-slug/">
<link rel="alternate" hreflang="zh-TW" href=".../your-post-slug-zh/">
<link rel="alternate" hreflang="x-default" href=".../your-post-slug/">

<!-- ZH version -->
<link rel="alternate" hreflang="zh-TW" href=".../your-post-slug-zh/">
<link rel="alternate" hreflang="en" href=".../your-post-slug/">
<link rel="alternate" hreflang="x-default" href=".../your-post-slug/">
```
