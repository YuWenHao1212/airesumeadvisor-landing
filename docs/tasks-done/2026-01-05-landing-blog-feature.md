# Landing Page Blog 功能需求

**Created**: 2026-01-05
**Updated**: 2026-01-06
**Priority**: High
**Project**: airesumeadvisor-landing
**Estimate**: 4-5 hr

---

## Why（為什麼要做）

### 商業目標

1. **SEO 導流**：透過履歷/求職相關長尾關鍵字，吸引 Organic Traffic
2. **產品轉換**：文章內自然導入產品功能，提高註冊轉換率
3. **品牌建立**：建立專業形象，成為履歷優化領域的權威內容來源

### 現況問題

- 目前 Landing Page 沒有 `/blog` 路由
- 無法發布 SEO 導向的內容
- Growth Q1 內容策略無法執行（產品 Blog 排程 1/6 開始）

### 預期效益

| 指標 | 目標 |
|------|------|
| Organic Traffic | +500 visits/month（Q1 end）|
| Blog → Signup 轉換 | 5% |
| 文章產出 | 9 篇/月 |

---

## What（要做什麼）

### 核心功能

1. **`/blog` 列表頁**
   - 顯示所有已發布文章
   - 文章卡片：標題、摘要、發布日期、預估閱讀時間
   - 響應式設計

2. **`/blog/[slug]` 文章頁**
   - Markdown/MDX 渲染
   - 文章 metadata（標題、日期、作者、閱讀時間）
   - 目錄（Table of Contents）- optional
   - CTA 區塊（文末導向產品）

3. **語言切換功能**
   - 同一篇文章支援英文/繁體中文雙版本
   - 語言切換按鈕（LangSwitch 元件）
   - hreflang 標籤支援 SEO

4. **SEO 優化**
   - Meta tags（title、description）
   - Open Graph image
   - Sitemap 自動更新
   - Structured data（Article schema）

### 技術方案

| 項目 | 選擇 | 原因 |
|------|------|------|
| Framework | Astro（現有） | 保持一致 |
| Content | Astro Content Collections | 官方推薦，type-safe |
| 格式 | MDX | 支援 components |
| 存放位置 | `src/content/blog/` | Astro 標準 |

### 文章 Frontmatter 格式

```yaml
---
title: "文章標題"
description: "SEO 描述（150 字內）"
pubDate: 2026-01-06
author: "AI Resume Advisor"
image: "/images/blog/article-cover.webp"
tags: ["resume", "career"]
lang: "en"                              # 語言：en | zh-TW
alternateSlug: "2026-01-06-resume-guide-zh"  # 對應的另一語言版本 slug
---
```

### 目錄結構

```
src/
├── content/
│   ├── config.ts          # Content Collections 定義
│   └── blog/
│       ├── 2026-01-06-resume-guide.mdx     # 英文版
│       └── 2026-01-06-resume-guide-zh.mdx  # 中文版
├── pages/
│   └── blog/
│       ├── index.astro    # 列表頁
│       └── [...slug].astro # 文章頁
└── components/
    └── blog/
        ├── BlogCard.astro
        ├── BlogPost.astro
        ├── BlogCTA.astro
        └── LangSwitch.astro  # 語言切換按鈕
```

---

## Out of Scope（這次不做）

- 文章分類/標籤篩選
- 搜尋功能
- 留言功能
- RSS feed
- 全站多語言（i18n 框架）- 僅做文章層級語言切換

### 未來擴展：全站 i18n 遷移路徑

若未來需要全站多語言，現有設計已預留彈性：

```
現在（文章層級）              未來（全站 i18n）
─────────────────────────────────────────────────
/blog/resume-guide           /en/blog/resume-guide
/blog/resume-guide-zh        /zh-TW/blog/resume-guide

alternateSlug 互連      →    i18n 路由自動處理
```

**遷移步驟**（預估 +3-4 hr）：
1. 安裝 `astro-i18n` 或類似框架
2. 調整路由結構為 `/[lang]/...`
3. Blog 文章合併（中英版合成一個 slug，用 `lang` 參數區分）
4. Landing Page 拆分翻譯檔

**決策點**：觀察中文 Blog 流量，若中文用戶佔比 > 30% 再評估

---

## 產品 Blog 文章排程

| # | 日期 | 標題 | 關鍵字 |
|---|------|------|--------|
| 1 | 1/6 | 2026 履歷撰寫完整指南 | resume tips 2026 |
| 2 | 1/9 | 為什麼你的履歷總是石沉大海？ | resume mistakes |
| 3 | 1/12 | 轉職必讀：如何用履歷展現跨領域能力 | career change resume |

詳見：`~/Cockpit/projects/growth-q1/CONTENT_CALENDAR.md`

---

## Acceptance Criteria

- [ ] `/blog` 列表頁可正常訪問
- [ ] `/blog/[slug]` 文章頁可正常渲染 MDX
- [ ] Meta tags 正確設置
- [ ] Sitemap 包含 blog 頁面
- [ ] 響應式設計（mobile/desktop）
- [ ] Lighthouse Performance > 90
- [ ] 語言切換按鈕正常運作
- [ ] hreflang 標籤正確設置

---

## 實作計劃

### Phase 1：基礎建設（1.5 hr）

**目標**：建立 Blog 架構，確保一篇文章可正常顯示

| Step | 任務 | 產出 |
|------|------|------|
| 1.1 | 安裝 `@astrojs/mdx` | `package.json` 更新 |
| 1.2 | 更新 `astro.config.mjs` 加入 MDX integration | config 生效 |
| 1.3 | 建立 `src/content/config.ts` 定義 blog collection schema | type-safe frontmatter |
| 1.4 | 建立 `src/content/blog/` 目錄 + 測試文章 | 可編譯通過 |
| 1.5 | 建立 `src/pages/blog/[...slug].astro` 文章頁 | 單篇文章可訪問 |
| 1.6 | 建立 `src/layouts/BlogLayout.astro` 文章版面 | 含 Header/Footer |

**驗收**：`/blog/test-article` 可正常顯示 MDX 內容

---

### Phase 2：列表頁 + 元件（1 hr）

**目標**：完成 Blog 列表頁和核心元件

| Step | 任務 | 產出 |
|------|------|------|
| 2.1 | 建立 `src/components/blog/BlogCard.astro` | 文章卡片元件 |
| 2.2 | 建立 `src/pages/blog/index.astro` 列表頁 | 顯示所有文章 |
| 2.3 | 建立 `src/components/blog/BlogCTA.astro` | 文末 CTA 區塊 |
| 2.4 | Header 加入 Blog 導航連結 | 全站可進入 Blog |

**驗收**：`/blog` 列表頁顯示文章卡片，點擊可進入文章

---

### Phase 3：語言切換功能（0.5 hr）

**目標**：實作雙語切換機制

| Step | 任務 | 產出 |
|------|------|------|
| 3.1 | 更新 `config.ts` schema 加入 `lang`, `alternateSlug` | schema 支援 |
| 3.2 | 建立 `src/components/blog/LangSwitch.astro` | 語言切換按鈕 |
| 3.3 | 文章頁整合 LangSwitch 元件 | UI 完成 |
| 3.4 | 建立測試文章的中英文版本 | 功能驗證 |

**驗收**：點擊語言切換按鈕可跳轉對應版本

---

### Phase 4：SEO 優化（1 hr）

**目標**：完善 SEO 和結構化資料

| Step | 任務 | 產出 |
|------|------|------|
| 4.1 | 文章頁加入動態 meta tags | title, description |
| 4.2 | 加入 Open Graph 圖片支援 | 社群分享預覽 |
| 4.3 | 加入 hreflang 標籤 | 多語言 SEO |
| 4.4 | 加入 Article schema（JSON-LD） | 結構化資料 |
| 4.5 | 確認 Sitemap 自動包含 blog 頁面 | sitemap.xml 更新 |

**驗收**：通過 Google Rich Results Test、hreflang 正確

---

### Phase 5：響應式 + 測試（0.5 hr）

**目標**：確保品質和效能

| Step | 任務 | 產出 |
|------|------|------|
| 5.1 | 響應式測試（375px, 768px, 1440px） | 各斷點正常 |
| 5.2 | 執行 `npm run lint && npm run check` | 無錯誤 |
| 5.3 | 執行 `npm run build` | 建置成功 |
| 5.4 | Lighthouse 測試 | Performance > 90 |
| 5.5 | 清理測試文章，準備正式內容 | Production ready |

**驗收**：所有 Acceptance Criteria 通過

---

### 依賴關係圖

```
Phase 1 ──→ Phase 2 ──→ Phase 3
    │           │           │
    └───────────┴───────────┴──→ Phase 4 ──→ Phase 5
```

- Phase 1-3 為功能開發（可部分平行）
- Phase 4 需 Phase 1-3 完成後進行
- Phase 5 為最終驗收

---

### 風險與備案

| 風險 | 影響 | 備案 |
|------|------|------|
| MDX 編譯問題 | 阻塞 Phase 1 | 改用純 Markdown |
| 閱讀時間計算複雜 | 延遲 Phase 2 | 使用 hardcoded 值 |
| hreflang 實作問題 | SEO 不完整 | 暫時跳過，後續補上 |

---

## 技術細節：語言切換實作

### LangSwitch 元件設計

```astro
<!-- src/components/blog/LangSwitch.astro -->
---
interface Props {
  currentLang: string;
  alternateSlug?: string;
}

const { currentLang, alternateSlug } = Astro.props;
const isEnglish = currentLang === 'en';
---

{alternateSlug && (
  <a
    href={`/blog/${alternateSlug}`}
    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
           border border-gray-300 rounded-lg hover:bg-gray-50 transition"
  >
    <span class="text-lg">{isEnglish ? '🇹🇼' : '🇺🇸'}</span>
    {isEnglish ? '閱讀中文版' : 'Read in English'}
  </a>
)}
```

### hreflang 標籤（加入文章頁 head）

```html
<link rel="alternate" hreflang="en" href="/blog/{englishSlug}" />
<link rel="alternate" hreflang="zh-TW" href="/blog/{chineseSlug}" />
```

### UI 位置

語言切換按鈕放置於文章 metadata 區塊下方，CTA 區塊上方。

---

## Next Steps

1. 移到 `in-progress/` 開始開發
2. 實作 Content Collections + 頁面
3. 實作 LangSwitch 元件 + hreflang
4. 發布第一篇產品 Blog 文章（雙語版本）
5. LinkedIn 公司頁面轉發
