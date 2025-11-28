# AI Resume Advisor Landing Page - Claude Code 協作指南

## 🚨 對話啟動必做事項

**每次新對話或 compact 後，先讀取以下文件：**

1. **專案章程**: `docs/PROJECT_CHARTER.md` - 專案目標、範圍、里程碑
2. **交接文檔**: `.claude/HANDOVER.md` - 專案背景、技術架構、進度
3. **開發規格**: `docs/DEVELOPMENT_SPEC.md` - 完整技術規格
4. **設計系統**: `.claude/skills/frontend-design/resources/design-tokens.md`
5. **每日規劃**: `daily_develop/YYYY-MM-DD.md` - 當日開發計劃（如有）

---

## 🕐 時間處理規則 (TIME HANDLING RULE)

**任何需要日期或時間時，必須先執行**：

```bash
TZ='Asia/Taipei' date '+%Y-%m-%d %H:%M:%S %Z'
```

- 文檔命名：`[TYPE]_[MODULE]_YYYYMMDD.md`
- 日誌記錄：`YYYY-MM-DD HH:MM CST`
- **絕不使用 `<env>` 中的日期或憑空推測！**

---

## ⚡ 關鍵開發規則

### 1. 檔案建立位置規則 ⚠️

**所有新建檔案必須放在專案目錄下**，禁止使用 `/tmp/` 或其他專案外位置

**正確做法**：

```bash
# ✅ 正確 - 放在專案相關目錄
src/components/NewComponent.astro
docs/issues/responsive-fix.md
public/images/new-feature.webp

# ❌ 錯誤 - 使用專案外位置
/tmp/component.astro
/Users/shared/image.png
```

### 2. ESLint/Prettier 檢查規則

```bash
# 🚨 所有功能實作完成前必須執行並通過
npm run lint
npm run format
```

### 3. TypeScript 類型檢查

```bash
# 確保無類型錯誤
npm run check
```

### 4. Git Push 確認

推送到 main branch 需要確認：

- 手動確認：`git push origin main` (輸入 'yes')
- 自動確認：`AUTO_CONFIRM_PUSH=yes git push origin main`

### 5. 圖片優化規則 ⚠️ **重要**

- **格式**: WebP 優先，提供 PNG/JPG fallback
- **大小限制**: 每張圖片 < 200KB
- **尺寸**: Hero 圖 < 800x600, Feature 圖 < 600x400
- **Alt text**: 所有圖片必須有描述性 alt 文字

### 6. CTA 連結統一管理

**必須**使用 `src/config/links.ts`，**禁止**在組件中硬編碼 URL

```typescript
// ✅ 正確
import { LINKS } from '@config/links';
<a href={LINKS.signup}>Sign Up</a>

// ❌ 錯誤
<a href="https://app.airesumeadvisor.com/signup">Sign Up</a>
```

---

## 📚 文檔快速導航

| 主題             | 位置                                                              | 說明                       |
| ---------------- | ----------------------------------------------------------------- | -------------------------- |
| **專案章程**     | `docs/PROJECT_CHARTER.md`                                         | 專案目標、範圍、里程碑     |
| **交接文檔**     | `.claude/HANDOVER.md`                                             | 專案背景、技術架構         |
| **每日規劃**     | `daily_develop/YYYY-MM-DD.md`                                     | 每日開發計劃與任務追蹤     |
| **開發規格**     | `docs/DEVELOPMENT_SPEC.md`                                        | 完整技術規格 (900+ 行)     |
| **設計 Tokens**  | `.claude/skills/frontend-design/resources/design-tokens.md`       | 顏色、字體、間距           |
| **組件檢查清單** | `.claude/skills/frontend-design/resources/component-checklist.md` | QA 檢查項目                |
| **CTA 連結配置** | `src/config/links.ts`                                             | Bubble App 連結            |
| **CI/CD 設定**   | `.github/workflows/azure-static-web-apps.yml`                     | 部署流程                   |

---

## 🧪 測試執行指南

### 本地開發測試

```bash
# 啟動開發伺服器
npm run dev
# 開啟 http://localhost:4321

# 建置並預覽
npm run build && npm run preview

# 程式碼檢查
npm run lint
npm run format
```

### Pre-commit 檢查

```bash
# 提交前執行
npm run lint && npm run check && npm run build
```

### Lighthouse 測試

建置後執行 Lighthouse 檢查：

**目標分數**：

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

```bash
# 建置並測試
npm run build
npx serve dist -l 3000
# 在 Chrome DevTools 中執行 Lighthouse
```

### 響應式測試

**必測斷點**：

- Desktop: 1920px, 1440px, 1280px
- Tablet: 1024px, 768px
- Mobile: 414px, 375px

---

## 🔧 快速參考

### 專案概述

AI 履歷優化平台的行銷登陸頁面，針對 SEO 和轉換率優化。

### 技術架構

- Astro 4.x (Static Site Generation)
- Tailwind CSS 3.x
- Azure Static Web Apps
- Application Insights (監控)

### 相關專案

| 專案         | 路徑/URL                  | 用途            |
| ------------ | ------------------------- | --------------- |
| Backend API  | `azure_container` repo    | AI 處理後端     |
| Web App      | `app.airesumeadvisor.com` | Bubble 用戶應用 |
| Landing Page | 本專案                    | 行銷登陸頁      |

### 頁面結構（10 個區塊）

```
Landing Page:
├─ Header (sticky)
├─ Hero Section
├─ Features (Tab Component)
├─ Job Simulator
├─ Social Proof
├─ CTA Banner
├─ How it Works
├─ Pricing
├─ Bottom CTA
└─ Footer
```

### Azure Portal 連結

- [Static Web Apps](https://portal.azure.com/#@wenhaoairesumeadvisor.onmicrosoft.com/resource/subscriptions/5396d388-8261-464e-8ee4-112770674fba/resourceGroups/airesumeadvisorfastapi)
- [Application Insights](https://portal.azure.com/#@wenhaoairesumeadvisor.onmicrosoft.com/resource/subscriptions/5396d388-8261-464e-8ee4-112770674fba/resourceGroups/airesumeadvisorfastapi/providers/microsoft.insights/components/azure-container-api-insights-v3)

---

## 🎨 設計系統速查

### 主要顏色

```css
--primary-600: #2563eb; /* CTA 按鈕 */
--primary-700: #1d4ed8; /* Hover */
--gradient-cta: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
```

### 字體

- Display: Cabinet Grotesk, Plus Jakarta Sans
- Body: Plus Jakarta Sans, Inter (備用)

### 間距

- Section: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## Git Workflow

### Branch Naming

- Feature: `feature/hero-section`
- Fix: `fix/mobile-responsive`
- Docs: `docs/update-readme`

### Commit Convention (Conventional Commits)

```
feat: add hero section with CTA button
fix: resolve mobile navigation issue
style: update pricing card hover effect
docs: add deployment instructions
chore: update dependencies
```

---

## 部署

### Azure Static Web Apps

**Production URL**: `airesumeadvisor.com`
**Preview URLs**: PR 自動生成

### 環境變數

```bash
# .env (local development)
PUBLIC_BUBBLE_APP_URL=https://app.airesumeadvisor.com
PUBLIC_APP_INSIGHTS_KEY=<instrumentation-key>
```

### 手動部署

```bash
npm run build
az staticwebapp deploy --app-name airesumeadvisor-landing --source dist
```

---

## 常用指令

```bash
# 開發
npm run dev                    # 啟動開發伺服器
npm run build                  # 建置生產版本
npm run preview                # 預覽建置結果

# 程式碼品質
npm run lint                   # ESLint 檢查
npm run format                 # Prettier 格式化
npm run check                  # TypeScript 檢查

# 分析
npm run build -- --analyze     # Bundle 分析
```

---

**文檔版本**: 1.2.0
**更新日期**: 2025-11-28
**維護者**: Claude Code + WenHao
