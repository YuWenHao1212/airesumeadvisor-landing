---
name: gsc-assistant
description: Google Search Console indexing assistant. Use when the user wants to track page indexing status, compare sitemap against GSC indexed pages, manage submission tracking, or move false positives (pages indexed per URL Inspection but not yet in GSC export) to the indexed list. Maintains two tracking files (indexed.md, to-index.md) with prioritization support.
---

# GSC Assistant Skill

## 用途

此 Skill 透過維護兩個 markdown 追蹤檔案，協助管理 Google Search Console 索引狀態：

1. **indexed.md** - 所有已索引頁面，分為兩個表格：
   - "Indexed Public" - 在 GSC 匯出資料中確認的 URL
   - "Indexed With Lag" - 透過 URL Inspection 確認的 URL（尚未出現在匯出資料中）

2. **to-index.md** - 等待索引的頁面：
   - sitemap 與已索引 URL 的差集
   - 依類別優先順序排列（可設定）
   - 追蹤提交日期

## 何時使用此 Skill

- 使用者詢問「索引狀態」或「GSC 索引」
- 使用者想要「比較 sitemap 與已索引頁面」
- 使用者提到「URL Inspection」或「false positive」
- 使用者需要「追蹤提交」或「索引進度」
- 使用者要求「移動已索引頁面」或「更新索引狀態」
- 使用者想要「產生索引報告」

## 核心概念

### GSC 資料延遲

Google Search Console 匯出資料大約有 2 週的延遲。在 URL Inspection 中顯示為已索引的頁面，可能尚未出現在匯出資料中。這些會被單獨追蹤為 "Indexed With Lag"。

### False Positive

透過 URL Inspection 檢查 to-index 頁面時：
- 若已索引：在 Submitted 欄位標記為 "false positive - indexed"
- 預處理時會將這些移至 indexed.md（Indexed With Lag 表格）
- "Detected" 日期從該筆記錄加入 to-index 的時間推算

### 優先順序分類

to-index.md 依優先順序組織頁面：
- Priority 1：高價值內容系列
- Priority 2：近期內容（當年/前一年）
- Priority 3：特定內容集合
- 較低優先順序：封存頁面、分頁等

## 檔案結構

### indexed.md

```markdown
# Indexed Pages

## Indexed Public (GSC Export)

*Last updated: YYYY-MM-DD*
*Source: gsc-export.csv*

| # | URL | Last Crawled |
|---|-----|--------------|
| 1 | https://example.com/page-1/ | 2025-12-01 |
| 2 | https://example.com/page-2/ | 2025-12-02 |

## Indexed With Lag (URL Inspection Confirmed)

*Pages confirmed indexed via URL Inspection but not yet in GSC export*

| # | URL | Detected | Confirmed |
|---|-----|----------|-----------|
| 1 | https://example.com/new-page/ | 12 Dec 2025 | 12 Dec 2025 |
```

### to-index.md

```markdown
# Pages To Index

*Generated: YYYY-MM-DD*
*Total: X pages*

## Priority 1: [Category Name]

| # | URL | Submitted |
|---|-----|-----------|
| 1 | https://example.com/important-page/ | 12 Dec |
| 2 | https://example.com/another-page/ | - |

## Priority 2: [Category Name]

| # | URL | Submitted |
|---|-----|-----------|
| 1 | https://example.com/recent-post/ | - |
```

## 工作流程

### 初始設定

1. 匯入 GSC 匯出 CSV 以建立 indexed.md（Indexed Public 表格）
2. 擷取 sitemap URL
3. 計算差集（sitemap - indexed = to-index）
4. 依優先順序分類 to-index 頁面
5. 產生 to-index.md

### 定期更新

1. **預處理**：掃描 to-index.md 中的 "false positive - indexed" 記錄
2. 將 false positive 移至 indexed.md（Indexed With Lag 表格）
3. 從該筆記錄在 to-index 中的時間設定 "Detected" 日期
4. 將 "Confirmed" 日期設為當天
5. 從 to-index.md 中移除
6. 更新計數與統計

### 手動操作

- 標記提交：在 "Submitted" 欄位更新日期
- 檢查狀態：使用 URL Inspection，標記結果
- 重新整理資料：匯入新的 GSC 匯出資料，重新計算

## 設定

在專案目錄中建立工作檔案：

```
project/
├── gsc-export.csv          # GSC indexed pages export
├── sitemap.xml             # Site sitemap (or use dist/sitemap.xml)
├── indexed.md              # Tracking file (generated)
└── to-index.md             # Tracking file (generated)
```

## 指令

### 產生初始檔案
```
"Generate indexing tracking files from GSC export and sitemap"
```

### 預處理 False Positive
```
"Process false positives and update indexed list"
```

### 更新提交狀態
```
"Mark [URL] as submitted on [date]"
```

### 從新匯出資料更新
```
"Update indexed list from new GSC export"
```

### 產生統計資料
```
"Show indexing progress statistics"
```

## 統計輸出範例

```
INDEXING STATUS SUMMARY
=======================

Indexed Public (GSC):     789 pages
Indexed With Lag:          12 pages
Total Indexed:            801 pages

Sitemap Total:          2,054 pages
To Index:               1,253 pages

Progress:                 39.0%

By Priority:
- Priority 1: 55 remaining (4 false positives moved)
- Priority 2: 7 remaining
- Priority 3: 290 remaining
```

## 使用範例

使用者：「我剛在 GSC URL Inspection 檢查了一些 URL，並標記為 false positive - indexed。請處理這些並更新追蹤檔案。」

Claude 會：
1. 掃描 to-index.md 中標記為 "false positive - indexed" 的記錄
2. 擷取這些 URL 及其原始偵測日期
3. 將它們加入 indexed.md 的 Indexed With Lag 表格
4. 從 to-index.md 中移除
5. 更新列號與計數
6. 回報所做的變更
