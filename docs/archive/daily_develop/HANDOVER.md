# AI Resume Advisor Landing Page - Handover Document

**Created**: 2025-11-27 17:30 CST
**Updated**: 2025-11-28 08:58 CST
**From**: azure_container project (Backend API)
**To**: airesumeadvisor-landing project (Landing Page)

---

## 1. Project Background

### What is this project?

**AI Resume Advisor** is an AI-powered resume optimization platform. The system consists of:

| Component        | Technology        | Purpose                                              |
| ---------------- | ----------------- | ---------------------------------------------------- |
| **Landing Page** | Astro + Tailwind  | Marketing, SEO, conversion                           |
| **Web App**      | Bubble.io         | User auth, resume editor, dashboard                  |
| **Backend API**  | FastAPI + GPT-4.1 | AI processing (keyword extraction, resume tailoring) |

### Why was this project created?

- Original plan: Use **Webflow** for landing page (SEO benefits)
- Problem: Webflow learning curve too steep
- Solution: **Vibe Coding** approach with Astro + Tailwind
- Goal: Create a professional, SEO-optimized landing page quickly

### Sprint Context

This is **Item #4** from Sprint Plan 2025W45:

- **Task**: Landing Page + Bubble Integration (Vibe Coding)
- **Priority**: Medium
- **Estimated Time**: 20-28 hours
- **Dependencies**: None

---

## 2. Architecture Overview

### Complete Azure Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      airesumeadvisorfastapi                         │
│                        (Resource Group)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────┐    ┌───────────────────────────┐   │
│  │      Container App        │    │       App Service         │   │
│  │      (Backend API)        │    │       Plan (B1/S1)        │   │
│  │                           │    │                           │   │
│  │  airesumeadvisor-api-     │    │  ┌───────────────────┐   │   │
│  │  production               │    │  │ Landing Page      │   │   │
│  │                           │    │  │ (Now)             │   │   │
│  │  • Resume Tailoring       │    │  │ airesumeadvisor   │   │   │
│  │  • Gap Analysis           │    │  │ .com              │   │   │
│  │  • Keyword Extraction     │    │  └───────────────────┘   │   │
│  │  • Course Search          │    │  ┌───────────────────┐   │   │
│  │                           │    │  │ Web App           │   │   │
│  │                           │    │  │ (Future)          │   │   │
│  │                           │    │  │ app.airesumeadvisor│  │   │
│  │                           │    │  │ .com              │   │   │
│  │                           │    │  └───────────────────┘   │   │
│  └─────────────┬─────────────┘    └─────────────┬─────────────┘   │
│                │                                │                  │
│                └────────────────┬───────────────┘                  │
│                                 ▼                                  │
│                ┌─────────────────────────┐                        │
│                │   Application Insights  │                        │
│                │   azure-container-api-  │                        │
│                │   insights-v3 (shared)  │                        │
│                └─────────────────────────┘                        │
│                                 │                                  │
│                ┌────────────────┴────────────────┐                │
│                ▼                                  ▼                │
│  ┌───────────────────────┐    ┌───────────────────────────┐      │
│  │  PostgreSQL           │    │  PostgreSQL (Future)      │      │
│  │  (courses DB)         │    │  (User/Resume DB)         │      │
│  │  airesumeadvisor-     │    │  Migrate from Bubble.io   │      │
│  │  courses-db-eastasia  │    │                           │      │
│  └───────────────────────┘    └───────────────────────────┘      │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### App Service Architecture

```
┌─────────────────────────────────────────────────────┐
│           App Service Plan (B1/S1)                  │
│           (One Plan = Shared compute resources)     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────┐   ┌───────────────────┐     │
│  │  Web App 1        │   │  Web App 2        │     │
│  │  airesumeadvisor- │   │  airesumeadvisor- │     │
│  │  landing          │   │  web              │     │
│  │                   │   │                   │     │
│  │  (Landing Page)   │   │  (Replace Bubble) │     │
│  │  Astro Static     │   │  Next.js/React    │     │
│  │                   │   │                   │     │
│  │  airesumeadvisor  │   │  app.airesume     │     │
│  │  .com             │   │  advisor.com      │     │
│  └───────────────────┘   └───────────────────┘     │
│           │                       │                 │
│           └───────────┬───────────┘                 │
│                       ▼                             │
│         ┌─────────────────────────┐                │
│         │   Application Insights  │                │
│         │   (Shared monitoring)   │                │
│         └─────────────────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Why App Service?

| Feature                 | Benefit                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| **Shared compute**      | One Plan cost, multiple Apps                                     |
| **Independent deploy**  | Each App has own CI/CD, domain, settings                         |
| **Shared App Insights** | Same Instrumentation Key, unified monitoring                     |
| **Scalable**            | Upgrade Plan when needed, all Apps benefit                       |
| **Independent domains** | Landing → `airesumeadvisor.com`, Web → `app.airesumeadvisor.com` |

### Cost Estimation

| Plan              | Monthly  | Use Case                 |
| ----------------- | -------- | ------------------------ |
| **F1 (Free)**     | $0       | Testing/Development      |
| **B1 (Basic)**    | ~$13 USD | Landing Page only        |
| **S1 (Standard)** | ~$70 USD | Landing + Future Web App |

**Recommendation**: Start with **B1**, upgrade to **S1** when Web App migrates.

---

## 3. Existing Azure Deployment Info

### Core Azure Information

| Item                | Value                                   |
| ------------------- | --------------------------------------- |
| **Subscription ID** | `5396d388-8261-464e-8ee4-112770674fba`  |
| **Resource Group**  | `airesumeadvisorfastapi`                |
| **Region**          | `japaneast` (primary)                   |
| **Tenant**          | `wenhaoairesumeadvisor.onmicrosoft.com` |

### Existing Resources

| Resource                 | Type                        | Details                                       |
| ------------------------ | --------------------------- | --------------------------------------------- |
| **Container App**        | Microsoft.App/containerApps | `airesumeadvisor-api-production`              |
| **Container Registry**   | Microsoft.ContainerRegistry | `airesumeadvisorregistry.azurecr.io`          |
| **Application Insights** | Microsoft.Insights          | `azure-container-api-insights-v3` (East Asia) |
| **PostgreSQL Database**  | DBforPostgreSQL             | `airesumeadvisor-courses-db-eastasia`         |
| **Log Analytics**        | Log Analytics Workspace     | Connected to Application Insights             |

### Azure Portal Links

```
Production Container App:
https://portal.azure.com/#@wenhaoairesumeadvisor.onmicrosoft.com/resource/subscriptions/5396d388-8261-464e-8ee4-112770674fba/resourceGroups/airesumeadvisorfastapi/providers/Microsoft.App/containerApps/airesumeadvisor-api-production

Application Insights v3:
https://portal.azure.com/#@wenhaoairesumeadvisor.onmicrosoft.com/resource/subscriptions/5396d388-8261-464e-8ee4-112770674fba/resourceGroups/airesumeadvisorfastapi/providers/microsoft.insights/components/azure-container-api-insights-v3

Container Registry:
https://portal.azure.com/#@wenhaoairesumeadvisor.onmicrosoft.com/resource/subscriptions/5396d388-8261-464e-8ee4-112770674fba/resourceGroups/airesumeadvisorfastapi/providers/Microsoft.ContainerRegistry/registries/airesumeadvisorregistry
```

---

## 4. URL Strategy (Plan C: Complete Separation)

### Domain Configuration

| URL                       | Points To         | Purpose                       | Status  |
| ------------------------- | ----------------- | ----------------------------- | ------- |
| `airesumeadvisor.com`     | Azure App Service | Landing Page (Marketing, SEO) | Pending |
| `app.airesumeadvisor.com` | Bubble.io         | Web App (Login, Dashboard)    | Pending |

### Why This Approach?

1. **SEO**: Main domain for Landing Page = better Google ranking
2. **Conversion**: Visitors see marketing page first, then guided to signup
3. **Independent deployment**: Both sides can update independently
4. **Industry standard**:
   - `stripe.com` (Landing) vs `dashboard.stripe.com` (App)
   - `notion.so` (Landing) vs `notion.so/login` (App)

### DNS Configuration Steps (GoDaddy)

```
# Current (needs modification)
airesumeadvisor.com  →  A Record → Bubble.io IP

# Change to
airesumeadvisor.com      →  A Record / CNAME → Azure App Service
app.airesumeadvisor.com  →  CNAME            → Bubble.io
```

### Bubble.io Configuration

1. Go to Bubble Editor → Settings → Domain
2. Change custom domain from `airesumeadvisor.com` to `app.airesumeadvisor.com`

### Landing Page CTA Links

```typescript
// src/config/links.ts
const BUBBLE_APP_URL = 'https://app.airesumeadvisor.com';

export const LINKS = {
  signup: `${BUBBLE_APP_URL}/signup`,
  login: `${BUBBLE_APP_URL}/login`,
  getStarted: `${BUBBLE_APP_URL}/signup`,
  buyDaily: `${BUBBLE_APP_URL}/pricing?plan=daily`,
  buyWeekly: `${BUBBLE_APP_URL}/pricing?plan=weekly`,
};
```

---

## 5. Database Strategy (Future)

### Current State

| Data Type                | Location         | Notes                                 |
| ------------------------ | ---------------- | ------------------------------------- |
| **Courses**              | Azure PostgreSQL | `airesumeadvisor-courses-db-eastasia` |
| **Users, Resumes, etc.** | Bubble.io        | To be migrated                        |

### Recommended: Two Independent PostgreSQL (Plan B)

```
PostgreSQL 1 (Existing)           PostgreSQL 2 (New - Future)
├── courses                       ├── users
├── course_categories             ├── resumes
└── course_embeddings             ├── job_descriptions
                                  ├── analysis_history
                                  └── transactions
```

**Benefits**:

- Separation of concerns (course data vs user data)
- Independent scaling, backup
- Better security (user data isolation)

### Migration Timeline

| Phase       | Action                                | Timeline |
| ----------- | ------------------------------------- | -------- |
| **Phase 1** | Landing Page on App Service           | Now      |
| **Phase 2** | Keep Bubble.io for Web App            | Current  |
| **Phase 3** | Create new PostgreSQL for User/Resume | Future   |
| **Phase 4** | Migrate Bubble → App Service          | Future   |

---

## 6. Current Progress

### Completed

| Item                    | Status | Notes                                  |
| ----------------------- | ------ | -------------------------------------- |
| Project structure       | Done   | Astro + Tailwind setup                 |
| Design system           | Done   | Colors match Bubble app                |
| All 9 components        | Done   | Header, Hero, Features, etc.           |
| Sponsor badges          | Done   | Microsoft + Coursera                   |
| CTA links config        | Done   | `src/config/links.ts`                  |
| GitHub repo             | Done   | `YuWenHao1212/airesumeadvisor-landing` |
| GitHub Actions workflow | Done   | Azure deployment ready                 |

### Pending

| Item                       | Priority | Notes                             |
| -------------------------- | -------- | --------------------------------- |
| Create Azure App Service   | High     | Next step                         |
| Configure App Insights     | High     | Connect to existing `insights-v3` |
| DNS configuration          | High     | After App Service setup           |
| Replace placeholder images | Medium   | Waiting for PNG files             |
| Commit current changes     | Medium   | After Azure setup                 |

---

## 7. Azure App Service Setup Steps

### Step 1: Create App Service Plan

```bash
az appservice plan create \
  --name airesumeadvisor-plan \
  --resource-group airesumeadvisorfastapi \
  --location japaneast \
  --sku B1
```

### Step 2: Create Web App

```bash
az webapp create \
  --name airesumeadvisor-landing \
  --resource-group airesumeadvisorfastapi \
  --plan airesumeadvisor-plan
```

### Step 3: Connect Application Insights

```bash
az webapp config appsettings set \
  --name airesumeadvisor-landing \
  --resource-group airesumeadvisorfastapi \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=<your-key-from-insights-v3>
```

### Step 4: Configure GitHub Deployment

```bash
az webapp deployment source config \
  --name airesumeadvisor-landing \
  --resource-group airesumeadvisorfastapi \
  --repo-url https://github.com/YuWenHao1212/airesumeadvisor-landing \
  --branch main \
  --manual-integration
```

### Step 5: Configure Custom Domain

1. Get App Service default URL: `airesumeadvisor-landing.azurewebsites.net`
2. Add custom domain in Azure Portal
3. Configure DNS in GoDaddy
4. Enable HTTPS

---

## 8. Partners & Sponsors

### Current Sponsors Display (Hero Section)

```
Sponsored by Microsoft | Course content by Coursera
```

### Partner Logos

| Partner   | Logo Location                      | Usage                  |
| --------- | ---------------------------------- | ---------------------- |
| Microsoft | Inline SVG                         | Sponsor badge          |
| Coursera  | `/public/images/coursera-logo.svg` | Course content partner |

### Future Expansion

When more course platforms join (within 6 months):

1. Change "Course content by" to "Course Partners"
2. Consider moving to separate Partners section
3. Use data-driven logo grid for scalability

---

## 9. Tech Stack Summary

| Layer          | Technology           | Purpose                       |
| -------------- | -------------------- | ----------------------------- |
| **Framework**  | Astro 4.x            | Static Site Generation        |
| **Styling**    | Tailwind CSS 3.x     | Utility-first CSS             |
| **Hosting**    | Azure App Service    | Web hosting with App Insights |
| **CI/CD**      | GitHub Actions       | Auto-deploy on push           |
| **Monitoring** | Application Insights | Performance & usage tracking  |
| **DNS**        | GoDaddy              | Domain management             |

---

## 10. Important File Locations

### Configuration

```
├── astro.config.mjs          # Astro settings
├── tailwind.config.mjs       # Tailwind theme (Bubble colors)
├── tsconfig.json             # TypeScript paths
├── package.json              # Dependencies
└── .github/workflows/
    └── azure-static-web-apps.yml  # CI/CD (needs update for App Service)
```

### Components

```
src/components/
├── Header.astro       # Sticky nav, mobile menu
├── Hero.astro         # Headline, CTA, sponsor badges
├── Features.astro     # 3-tab interactive component
├── JobSimulator.astro # Product showcase
├── SocialProof.astro  # Testimonials
├── HowItWorks.astro   # Video section
├── Pricing.astro      # Free/Daily/Weekly plans
├── BottomCTA.astro    # Gradient CTA banner
└── Footer.astro       # Copyright, legal links
```

### Assets

```
public/images/
├── logo.png           # AI Resume Advisor logo
├── logo-full.png      # Full logo with text
└── coursera-logo.svg  # Coursera partner logo
```

---

## 11. Related Projects

| Project          | Path                                                       | Purpose                 |
| ---------------- | ---------------------------------------------------------- | ----------------------- |
| **Backend API**  | `/Users/yuwenhao/Documents/GitHub/azure_container`         | FastAPI + GPT-4.1       |
| **Landing Page** | `/Users/yuwenhao/Documents/GitHub/airesumeadvisor-landing` | This project            |
| **Web App**      | Bubble.io (`app.airesumeadvisor.com`)                      | User-facing application |

---

**Document Version**: 2.0.0
**Last Updated**: 2025-11-28 08:58 CST
**Author**: Claude Code
