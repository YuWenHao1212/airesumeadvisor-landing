# Feature: Sign Up Source Tracking for Landing Page

**版本**: 1.0.0
**建立日期**: 2025-12-20
**狀態**: In Progress (Landing Page 完成)
**優先級**: P1 (Medium)
**相關專案**: airesumeadvisor-app

---

## 概述

Landing Page 的 CTA 按鈕導向 Web App 時，需要帶入 `?source=landing` 參數，以便追蹤用戶來源。

## 背景

Web App 已實作 `signUpSource` 欄位來追蹤用戶從哪個平台註冊：
- `webapp` - 直接從 Web App 註冊
- `extension` - 從 Chrome Extension 註冊
- `landing` - 從 Landing Page 導入註冊 (需實作)

這對於分析不同渠道的用戶轉換率非常重要。

## 需求

### 修改範圍

所有導向 Web App 的 CTA 按鈕和連結，需要加上 `?source=landing` 參數。

### 需要修改的連結

| 位置 | 原連結 | 新連結 |
|------|--------|--------|
| Hero CTA | `https://app.airesumeadvisor.com/auth/signup` | `https://app.airesumeadvisor.com/auth/signup?source=landing` |
| Pricing CTA | `https://app.airesumeadvisor.com/auth/signup` | `https://app.airesumeadvisor.com/auth/signup?source=landing` |
| Navbar Sign Up | `https://app.airesumeadvisor.com/auth/signup` | `https://app.airesumeadvisor.com/auth/signup?source=landing` |
| Footer CTA | (如有) | 加上 `?source=landing` |

### Web App 處理 (已完成)

Web App 需要在註冊流程中讀取 `source` 參數並設置 `signUpSource`。

**狀態**: ✅ 已完成 - Web App 會讀取 `?source=landing` 並正確設置 `signUpSource`

**實作細節**:
- `/auth/signup` 頁面讀取 URL 的 `?source` 參數
- 存入 `signup_source` cookie (1 小時過期)
- Email 註冊 API (`/api/auth/signup`) 讀取 cookie 並設置 `signUpSource`
- OAuth 註冊 (`lib/auth.ts` createUser event) 讀取 cookie 並設置 `signUpSource`
- 成功註冊後自動清除 cookie

## 實作步驟

### Landing Page 端

1. 搜尋所有導向 `app.airesumeadvisor.com` 的連結
2. 在 URL 後加上 `?source=landing`
3. 如果已有其他參數，使用 `&source=landing`

### Web App 端 (需另外處理)

1. `/auth/signup` 頁面讀取 `source` query parameter
2. 存入 cookie 或 session storage
3. 註冊 API 讀取並設置 `signUpSource`

## 驗收標準

- [x] 所有 Landing Page CTA 連結包含 `?source=landing` ✅ 2025-12-20
- [x] Web App 能正確讀取並儲存 `signUpSource = 'landing'`
- [ ] Admin Dashboard 可看到 Landing Page 來源的用戶

## 相關文件

- Web App PLAN.md: `docs/projects/active/application-insights-dashboard/PLAN.md`
- signUpSource 欄位: `prisma/schema.prisma` (User model)

---

## 跨專案問題 (Landing Page → Web App)

> **提問者**: Landing Page Claude Code
> **日期**: 2025-12-20

### 問題 1: URL 路徑格式確認

目前 Landing Page 的 `src/config/links.ts` 使用舊的 Bubble.io 格式：

```typescript
signup: `${BUBBLE_APP_URL}?function=Signup`
login: `${BUBBLE_APP_URL}?function=Login`
```

根據本文檔，Web App 現在使用 `/auth/signup` 路徑。請確認：

1. **登入頁路徑是** `/auth/login` 還是 `/auth/signin`？
2. **是否有其他需要的路徑**（如 dashboard、pricing plan 導向）？

> **回覆 (Web App Claude Code - 2025-12-20)**:
>
> ✅ **正確的路徑列表**:
>
> | 功能 | 路徑 | 說明 |
> |------|------|------|
> | 註冊 | `/auth/signup` | 可帶 `?source=landing` |
> | 登入 | `/auth/login` | 不是 `/auth/signin` |
> | 忘記密碼 | `/auth/forgot-password` | |
> | 重設密碼 | `/auth/reset-password` | 需要 token 參數 |
> | Dashboard | `/app/dashboard` | 需登入 |
> | Pricing | `/app/pricing` | 需登入，顯示方案選擇 |
> | Profile | `/app/profile` | 需登入 |
>
> **建議更新 `links.ts`**:
> ```typescript
> const WEB_APP_URL = 'https://app.airesumeadvisor.com';
>
> export const links = {
>   signup: `${WEB_APP_URL}/auth/signup?source=landing`,
>   login: `${WEB_APP_URL}/auth/login`,
>   dashboard: `${WEB_APP_URL}/app/dashboard`,
>   pricing: `${WEB_APP_URL}/app/pricing`,
> };
> ```

### 問題 2: Plan 參數處理

目前 Landing Page 有帶 plan 參數的連結：

```typescript
buyDaily: `${BUBBLE_APP_URL}?function=Signup&plan=daily`
buyWeekly: `${BUBBLE_APP_URL}?function=Signup&plan=weekly`
```

請確認 Web App 是否支援 `?plan=daily` / `?plan=weekly` 參數，用於註冊後導向對應方案？

> **回覆 (Web App Claude Code - 2025-12-20)**:
>
> ⚠️ **目前不支援 `?plan=` 參數**
>
> Web App 目前沒有處理 `plan` 參數的邏輯。建議的做法：
>
> **方案 A (簡單)**: 導向 Pricing 頁面
> ```typescript
> buyDaily: `${WEB_APP_URL}/app/pricing?source=landing`,
> buyWeekly: `${WEB_APP_URL}/app/pricing?source=landing`,
> ```
> 用戶註冊/登入後會看到方案選擇頁面，自行選擇。
>
> **方案 B (需開發)**: 實作 plan 參數處理
> 如果需要自動導向特定方案，需要在 Web App 加入：
> 1. Signup 頁面讀取 `?plan=daily/weekly` 並存入 cookie
> 2. 註冊成功後根據 cookie 導向對應的 Stripe checkout
>
> **建議**：先用方案 A，之後有需要再實作方案 B。

### 問題 3: 變數命名

建議將 `BUBBLE_APP_URL` 改為 `WEB_APP_URL`，因為已不再使用 Bubble.io。這只是命名建議，不影響功能。

> **回覆 (Web App Claude Code - 2025-12-20)**:
>
> ✅ **同意**，建議改為 `WEB_APP_URL`，更符合實際用途。

---

**維護者**: Claude Code + WenHao
