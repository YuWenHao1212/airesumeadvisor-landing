# AI Resume Advisor Landing Page - Project Charter

**Document Version**: 1.1.0
**Created**: 2025-11-28
**Last Updated**: 2025-11-29 19:11 CST
**Status**: Completed (Live)

---

## 1. Project Overview

### 1.1 Project Name

**AI Resume Advisor Landing Page**

### 1.2 Project Description

A marketing landing page for the AI Resume Advisor platform, designed to drive user acquisition through SEO optimization and conversion-focused design. The page showcases the product's AI-powered resume tailoring capabilities and guides visitors to sign up for the web application.

### 1.3 Business Context

AI Resume Advisor is an AI-powered resume optimization platform that helps job seekers create tailored resumes for specific job postings. The platform consists of three main components:

| Component           | Technology           | Purpose                                              |
| ------------------- | -------------------- | ---------------------------------------------------- |
| **Landing Page**    | Astro + Tailwind CSS | Marketing, SEO, user acquisition                     |
| **Web Application** | Bubble.io            | User authentication, resume editing, dashboard       |
| **Backend API**     | FastAPI + GPT-4.1    | AI processing (keyword extraction, resume tailoring) |

### 1.4 Project Origin

- **Original Plan**: Webflow for landing page
- **Problem**: Webflow learning curve too steep
- **Solution**: Vibe Coding approach with Astro + Tailwind CSS
- **Sprint Reference**: Item #4 from Sprint Plan 2025W45

---

## 2. Objectives & Goals

### 2.1 Primary Objectives

| Objective                | Description                          | Success Metric                              |
| ------------------------ | ------------------------------------ | ------------------------------------------- |
| **SEO Optimization**     | Improve organic search visibility    | Google PageSpeed > 90, Core Web Vitals pass |
| **User Acquisition**     | Drive signups through effective CTAs | Track conversion rate via App Insights      |
| **Brand Consistency**    | Match Bubble.io app design language  | Design review approval                      |
| **Technical Foundation** | Prepare for future web app migration | App Service infrastructure ready            |

### 2.2 Secondary Objectives

- Establish Azure App Service infrastructure for future expansion
- Integrate Application Insights for unified monitoring
- Create scalable architecture for additional course partners
- Document technical decisions for future development

---

## 3. Scope

### 3.1 In Scope

| Category             | Items                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Pages**            | Single-page landing (10 sections)                                                              |
| **Sections**         | Header, Hero, Features, Job Simulator, Social Proof, How it Works, Pricing, Bottom CTA, Footer |
| **Functionality**    | Responsive design, mobile navigation, interactive tabs, animations                             |
| **Integration**      | CTA links to Bubble.io app, Application Insights tracking                                      |
| **Infrastructure**   | Azure App Service, GitHub Actions CI/CD, custom domain setup                                   |
| **Partners Display** | Microsoft (sponsor), Coursera (course content)                                                 |

### 3.2 Out of Scope

| Category                | Items                      | Reason                 |
| ----------------------- | -------------------------- | ---------------------- |
| **User Authentication** | Login/signup functionality | Handled by Bubble.io   |
| **Backend Integration** | Direct API calls           | Landing page is static |
| **Blog/Content**        | Blog posts, articles       | Future phase           |
| **Multilingual**        | i18n support               | Future phase           |
| **E-commerce**          | Payment processing         | Handled by Bubble.io   |

### 3.3 Future Scope (Phase 2+)

- Web application migration from Bubble.io to Azure App Service
- User database migration to Azure PostgreSQL
- Blog/content management system
- A/B testing infrastructure

---

## 4. Stakeholders

### 4.1 Project Team

| Role              | Responsibility                              |
| ----------------- | ------------------------------------------- |
| **Product Owner** | WenHao - Requirements, priorities, approval |
| **Developer**     | Claude Code - Implementation, documentation |

### 4.2 External Dependencies

| Entity        | Dependency                 | Contact               |
| ------------- | -------------------------- | --------------------- |
| **Microsoft** | Sponsor badge approval     | Partnership agreement |
| **Coursera**  | Course content partnership | Partnership agreement |
| **GoDaddy**   | DNS management             | Domain registrar      |
| **Azure**     | Hosting infrastructure     | Cloud provider        |
| **Bubble.io** | Web application            | No-code platform      |

---

## 5. Architecture

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      airesumeadvisorfastapi                         │
│                        (Azure Resource Group)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────┐    ┌───────────────────────────┐   │
│  │      Container App        │    │       App Service         │   │
│  │      (Backend API)        │    │       Plan (B1/S1)        │   │
│  │                           │    │                           │   │
│  │  airesumeadvisor-api-     │    │  ┌───────────────────┐   │   │
│  │  production               │    │  │ Landing Page      │   │   │
│  │                           │    │  │ (Current)         │   │   │
│  │  FastAPI + GPT-4.1        │    │  └───────────────────┘   │   │
│  │                           │    │  ┌───────────────────┐   │   │
│  │                           │    │  │ Web App (Future)  │   │   │
│  │                           │    │  └───────────────────┘   │   │
│  └───────────────────────────┘    └───────────────────────────┘   │
│                                                                     │
│              ┌─────────────────────────┐                           │
│              │   Application Insights  │                           │
│              │   (Shared Monitoring)   │                           │
│              └─────────────────────────┘                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 URL Strategy

| Domain                    | Target            | Purpose         |
| ------------------------- | ----------------- | --------------- |
| `airesumeadvisor.com`     | Azure App Service | Landing Page    |
| `app.airesumeadvisor.com` | Bubble.io         | Web Application |

### 5.3 Technology Stack

| Layer      | Technology           | Version |
| ---------- | -------------------- | ------- |
| Framework  | Astro                | 4.x     |
| Styling    | Tailwind CSS         | 3.x     |
| Hosting    | Azure App Service    | B1 tier |
| CI/CD      | GitHub Actions       | -       |
| Monitoring | Application Insights | v3      |
| DNS        | GoDaddy              | -       |

---

## 6. Timeline & Milestones

### 6.1 Project Phases

| Phase       | Description                  | Status    |
| ----------- | ---------------------------- | --------- |
| **Phase 1** | Project setup, design system | Completed |
| **Phase 2** | Component development        | Completed |
| **Phase 3** | Azure deployment             | Completed |
| **Phase 4** | DNS & domain configuration   | Completed |
| **Phase 5** | Testing & verification       | Completed |
| **Phase 6** | Go-live                      | Completed |

### 6.2 Milestone Details

| Milestone           | Target Date | Deliverables                                  | Status |
| ------------------- | ----------- | --------------------------------------------- | ------ |
| **M1: Foundation**  | 2025-11-27  | Project structure, design tokens, base layout | Done   |
| **M2: Components**  | 2025-11-28  | All 9 landing page sections                   | Done   |
| **M3: Azure Setup** | 2025-11-28  | App Service, App Insights integration         | Done   |
| **M4: CI/CD**       | 2025-11-28  | GitHub Actions deployment pipeline            | Done   |
| **M5: DNS**         | 2025-11-29  | Custom domain, SSL certificate                | Done   |
| **M6: Go-Live**     | 2025-11-29  | Production deployment, monitoring active      | Done   |

---

## 7. Budget & Resources

### 7.1 Azure Cost Estimation

| Resource             | Tier                | Monthly Cost (USD) |
| -------------------- | ------------------- | ------------------ |
| App Service Plan     | B1 (Basic)          | ~$13               |
| Application Insights | Shared (existing)   | $0 (included)      |
| Custom Domain SSL    | App Service Managed | $0 (included)      |
| **Total**            |                     | **~$13/month**     |

### 7.2 Future Cost (with Web App migration)

| Resource             | Tier          | Monthly Cost (USD) |
| -------------------- | ------------- | ------------------ |
| App Service Plan     | S1 (Standard) | ~$70               |
| PostgreSQL (User DB) | Basic         | ~$25               |
| **Total**            |               | **~$95/month**     |

---

## 8. Risks & Mitigation

### 8.1 Risk Register

| Risk                              | Probability | Impact | Mitigation                              |
| --------------------------------- | ----------- | ------ | --------------------------------------- |
| DNS propagation delays            | Medium      | Low    | Plan 48h buffer, test with nslookup     |
| Bubble.io domain change issues    | Low         | High   | Test thoroughly before switching        |
| Azure deployment failures         | Low         | Medium | GitHub Actions with rollback capability |
| SEO ranking drop during migration | Medium      | Medium | Submit sitemap, use 301 redirects       |
| Application Insights data gaps    | Low         | Low    | Verify tracking before go-live          |

### 8.2 Rollback Plan

1. Revert DNS to original Bubble.io configuration
2. Restore Bubble.io custom domain setting
3. Disable Azure App Service deployment

---

## 9. Success Criteria

### 9.1 Technical Success

| Metric                   | Target  | Measurement          |
| ------------------------ | ------- | -------------------- |
| Lighthouse Performance   | > 90    | Lighthouse audit     |
| Lighthouse Accessibility | > 90    | Lighthouse audit     |
| Lighthouse SEO           | > 95    | Lighthouse audit     |
| Page Load Time           | < 3s    | Application Insights |
| Build Success Rate       | 100%    | GitHub Actions       |
| Uptime                   | > 99.5% | Azure monitoring     |

### 9.2 Business Success

| Metric                 | Target                | Measurement           |
| ---------------------- | --------------------- | --------------------- |
| CTA Click Rate         | Track baseline        | Application Insights  |
| Bounce Rate            | < 60%                 | Application Insights  |
| Mobile Traffic         | Track %               | Application Insights  |
| Organic Search Traffic | Increase over 30 days | Google Search Console |

---

## 10. Communication Plan

### 10.1 Documentation

| Document          | Location                   | Purpose                       |
| ----------------- | -------------------------- | ----------------------------- |
| Project Charter   | `docs/PROJECT_CHARTER.md`  | Project overview & governance |
| Development Spec  | `docs/DEVELOPMENT_SPEC.md` | Technical specifications      |
| Handover Document | `.claude/HANDOVER.md`      | Context for Claude Code       |
| Daily Plans       | `daily_develop/*.md`       | Daily development tracking    |

### 10.2 Updates

- Daily development notes in `daily_develop/YYYY-MM-DD.md`
- Milestone completion updates in Project Charter
- Technical changes documented in HANDOVER.md

---

## 11. Approval & Sign-off

### 11.1 Document Approval

| Role          | Name   | Date       | Signature |
| ------------- | ------ | ---------- | --------- |
| Product Owner | WenHao | 2025-11-29 | Approved  |

### 11.2 Go-Live Checklist

- [x] All components implemented and tested
- [x] Azure App Service deployed and verified
- [x] GitHub Actions CI/CD working
- [x] DNS configured and propagated
- [x] SSL certificate active
- [x] Application Insights tracking verified
- [x] All CTA links tested
- [x] Mobile responsiveness verified
- [x] Lighthouse scores meet targets
- [x] Rollback plan documented

---

## 12. Appendices

### A. Related Documents

- [HANDOVER.md](/.claude/HANDOVER.md) - Technical handover document
- [DEVELOPMENT_SPEC.md](/docs/DEVELOPMENT_SPEC.md) - Full development specification
- [CLAUDE.md](/CLAUDE.md) - Claude Code project guide
- [Design Tokens](/.claude/skills/frontend-design/resources/design-tokens.md) - Design system

### B. Azure Resource Information

| Item            | Value                                   |
| --------------- | --------------------------------------- |
| Subscription ID | `5396d388-8261-464e-8ee4-112770674fba`  |
| Resource Group  | `airesumeadvisorfastapi`                |
| Region          | `japaneast`                             |
| Tenant          | `wenhaoairesumeadvisor.onmicrosoft.com` |

### C. Repository Information

| Item              | Value                                                      |
| ----------------- | ---------------------------------------------------------- |
| GitHub Repository | `YuWenHao1212/airesumeadvisor-landing`                     |
| Default Branch    | `main`                                                     |
| Local Path        | `/Users/yuwenhao/Documents/GitHub/airesumeadvisor-landing` |

---

**Document Control**

| Version | Date       | Author      | Changes                                |
| ------- | ---------- | ----------- | -------------------------------------- |
| 1.0.0   | 2025-11-28 | Claude Code | Initial creation                       |
| 1.1.0   | 2025-11-29 | Claude Code | All phases completed, project now live |
