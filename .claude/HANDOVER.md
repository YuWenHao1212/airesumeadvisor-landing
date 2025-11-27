# AI Resume Advisor Landing Page - Handover Document

**Created**: 2025-11-27 17:30 CST
**From**: azure_container project (Backend API)
**To**: airesumeadvisor-landing project (Landing Page)

---

## 1. Project Background

### What is this project?

**AI Resume Advisor** is an AI-powered resume optimization platform. The system consists of:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Landing Page** | Astro + Tailwind | Marketing, SEO, conversion |
| **Web App** | Bubble.io | User auth, resume editor, dashboard |
| **Backend API** | FastAPI + GPT-4.1 | AI processing (keyword extraction, resume tailoring) |

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

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Production Architecture                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   DNS (GoDaddy)                                                     │
│   ├── airesumeadvisor.com      → Azure Static Web Apps (Landing)   │
│   ├── app.airesumeadvisor.com  → Bubble.io (Web App)               │
│   └── (API uses existing Azure URL)                                 │
│                                                                     │
│   User Flow:                                                        │
│   Landing Page → CTA Click → Bubble App → Uses Backend API          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Domain Configuration

| Domain | Points To | Status |
|--------|-----------|--------|
| `airesumeadvisor.com` | Azure Static Web Apps | ⏳ Pending DNS setup |
| `app.airesumeadvisor.com` | Bubble.io | ⏳ Pending DNS setup |
| GoDaddy DNS | Already owned | ✅ Ready |

---

## 3. Current Progress

### ✅ Completed

| Item | Status | Notes |
|------|--------|-------|
| Project structure | ✅ Done | Astro + Tailwind setup |
| `package.json` | ✅ Done | Dependencies defined |
| `astro.config.mjs` | ✅ Done | SSG, sitemap, Tailwind |
| `tailwind.config.mjs` | ✅ Done | Design system colors |
| `tsconfig.json` | ✅ Done | Path aliases configured |
| `CLAUDE.md` | ✅ Done | Project guide |
| `docs/DEVELOPMENT_SPEC.md` | ✅ Done | Full specification (900+ lines) |
| `README.md` | ✅ Done | Quick start guide |
| Base Layout (`Layout.astro`) | ✅ Done | SEO meta tags, structured data |
| Index page skeleton | ✅ Done | Placeholder sections |
| GitHub Actions workflow | ✅ Done | Azure Static Web Apps CI/CD |
| Frontend Design Skill | ✅ Done | `.claude/skills/frontend-design/` |
| Design tokens | ✅ Done | Colors, typography, spacing |
| CTA links config | ✅ Done | `src/config/links.ts` |

### ⏳ Pending

| Item | Priority | Notes |
|------|----------|-------|
| `npm install` | High | Dependencies not yet installed |
| Git init & GitHub repo | High | Not yet initialized |
| Azure Static Web Apps resource | High | Need to create in Azure Portal |
| Component development | High | Header, Hero, Features, etc. |
| Image assets | Medium | Need to export from Figma/design |
| DNS configuration | Medium | After Azure SWA setup |

---

## 4. Design Reference

The landing page design comes from Figma mockups. Key sections:

1. **Header** (sticky)
   - Logo + Nav + CTA buttons

2. **Hero Section**
   - Headline: "Land Your Dream Job with AI-Powered Resumes"
   - CTA: "Sign Up Free"
   - Product mockup screenshot

3. **Features (Tab Component)**
   - "Unlock Dream Career with AI Hub"
   - 3 tabs: Alignment Assessment, Tailored Resume, Self-Development

4. **Job Alignment Simulator**
   - "Find the Fastest Path to Your Ideal Job"

5. **Social Proof**
   - "Join Thousands of Happy Job Seekers"
   - Testimonial images

6. **How it Works**
   - Video embed section

7. **Pricing**
   - Daily Pass: $10
   - Weekly Pass: $20 (Popular)
   - Free features list

8. **Bottom CTA**
   - "Start Building Your Perfect Resume Today!"

9. **Footer**
   - Copyright + Terms + Privacy

---

## 5. Tech Stack Details

### Framework: Astro 4.x
- **Why**: Static Site Generation for SEO, fast performance
- **Output**: Pure HTML/CSS with minimal JS
- **Build**: `npm run build` → `dist/` folder

### Styling: Tailwind CSS 3.x
- **Config**: `tailwind.config.mjs`
- **Custom classes**: See `src/styles/global.css`
- **Design tokens**: See `.claude/skills/frontend-design/resources/design-tokens.md`

### Deployment: Azure Static Web Apps
- **Why**: Integration with existing Azure infrastructure
- **CI/CD**: GitHub Actions (auto-deploy on push to main)
- **Region**: East Asia (closest to users)

---

## 6. Important Files

### Configuration
```
├── astro.config.mjs          # Astro settings
├── tailwind.config.mjs       # Tailwind theme
├── tsconfig.json             # TypeScript paths
├── package.json              # Dependencies
└── .github/workflows/
    └── azure-static-web-apps.yml  # CI/CD
```

### Source Code
```
src/
├── config/
│   └── links.ts              # All CTA URLs (Bubble app links)
├── layouts/
│   └── Layout.astro          # Base HTML with SEO
├── pages/
│   └── index.astro           # Main landing page
└── styles/
    └── global.css            # Tailwind + custom styles
```

### Claude Code
```
.claude/
├── skills/
│   └── frontend-design/
│       ├── SKILL.md          # Frontend design guidance
│       └── resources/
│           ├── design-tokens.md
│           └── component-checklist.md
└── HANDOVER.md               # This file
```

### Documentation
```
├── CLAUDE.md                 # Project guide for Claude
├── README.md                 # Quick start
└── docs/
    └── DEVELOPMENT_SPEC.md   # Full specification
```

---

## 7. Next Steps (In Order)

### Step 1: Initialize Project
```bash
cd /Users/yuwenhao/Documents/GitHub/airesumeadvisor-landing

# Install dependencies
npm install

# Start dev server
npm run dev
# Open http://localhost:4321
```

### Step 2: Initialize Git & Push to GitHub
```bash
# Initialize git
git init
git add .
git commit -m "feat: initial project setup with Astro + Tailwind"

# Create GitHub repo and push
gh repo create airesumeadvisor-landing --public --source=. --push
```

### Step 3: Create Azure Static Web Apps
```bash
# Login to Azure (if needed)
az login

# Create Static Web App
az staticwebapp create \
  --name airesumeadvisor-landing \
  --resource-group airesumeadvisorfastapi \
  --source https://github.com/YOUR_USERNAME/airesumeadvisor-landing \
  --location "East Asia" \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

### Step 4: Configure DNS (GoDaddy)
After Azure SWA is created:
1. Get the auto-generated URL from Azure
2. Add CNAME record in GoDaddy:
   - `www` → `<your-site>.azurestaticapps.net`
3. Configure custom domain in Azure Portal

### Step 5: Develop Components
Priority order:
1. Header (sticky navigation)
2. Hero Section
3. Footer
4. Feature Tabs
5. Pricing
6. Other sections

---

## 8. CTA Links Reference

All CTA buttons should link to Bubble app:

```typescript
// src/config/links.ts
const BUBBLE_APP_URL = 'https://app.airesumeadvisor.com';

export const LINKS = {
  signup: `${BUBBLE_APP_URL}/signup`,
  login: `${BUBBLE_APP_URL}/login`,
  getStarted: `${BUBBLE_APP_URL}/signup`,
  buyDaily: `${BUBBLE_APP_URL}/pricing?plan=daily`,
  buyWeekly: `${BUBBLE_APP_URL}/pricing?plan=weekly`,
  // ...
};
```

---

## 9. Backend Integration Notes

### CORS Configuration

The backend API (azure_container) already has CORS configured to allow:
- `https://airesumeadvisor.com`
- `https://airesumeadvisor.bubbleapps.io`
- `http://localhost:3000`

**File**: `azure_container/src/core/config.py` (line ~183)

If you add a new domain, update CORS in the backend.

### API Endpoints (for reference)

The Landing Page **does not directly call** the backend API. The flow is:

```
Landing Page → Bubble App → Backend API
```

However, for context, main API endpoints are:
- `POST /api/v1/extract-keywords` - JD keyword extraction
- `POST /api/v1/analyze-resume` - Resume analysis
- `POST /api/v1/tailor-resume` - Resume customization

---

## 10. Skill Usage

The `frontend-design` skill is **model-invoked** (automatic). When you ask Claude to:
- "Build the Hero section"
- "Create a pricing component"
- "Design the feature tabs"

Claude will automatically use the skill to generate high-quality, non-generic code.

### Skill Contents
- **SKILL.md**: Main guidance (typography, colors, animations, anti-patterns)
- **design-tokens.md**: Color palette, spacing, shadows
- **component-checklist.md**: QA checklist for components

---

## 11. Contact & Resources

### Related Projects
- **Backend API**: `/Users/yuwenhao/Documents/GitHub/azure_container`
- **Sprint Plan**: `azure_container/docs/project/SPRINT_PLAN_2025W45.md`

### Azure Resources
- Resource Group: `airesumeadvisorfastapi`
- Region: Japan East (API), East Asia (Static Web)
- Subscription: `5396d388-8261-464e-8ee4-112770674fba`

### External
- GoDaddy DNS: `airesumeadvisor.com`
- Bubble App: `airesumeadvisor.bubbleapps.io`

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-27 17:30 CST
**Author**: Claude Code (from azure_container project)
