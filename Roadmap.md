# Roadmap

Build order is sequential — a phase starts only when the previous one is approved by the owner on the staging URL. Check items off as they're completed. Full definition of done per page: `CLAUDE.md` Section 13.

---

## Phase 0 — Scaffold & foundations

- [x] Vite + React 19 + TypeScript + Tailwind + React Router scaffold inside `frontend/`
- [x] Repo structure: `frontend/`, `backend/` (`.gitkeep` only), docs at root
- [ ] Branches: `main` (production) + `stage` (staging) created locally; not yet pushed to `origin` or connected to Vercel
- [x] Design tokens as CSS variables + Tailwind theme (light + dark) — Terracotta editorial, per CLAUDE.md Section 1
- [x] Self-hosted fonts: serif display (Fraunces) + sans (Inter), preloaded
- [ ] Plausible analytics script wired

## Phase 1 — Component library (approve each before pages begin)

- [x] Button (primary ink / accent terracotta / secondary outline)
- [x] Card
- [ ] SectionHeading (serif)
- [ ] Nav (with Resources dropdown, mobile hamburger)
- [ ] Footer
- [ ] BrowserFrame (screenshot frame: dots + optional URL bar)
- [ ] TagPill
- [ ] Accordion (FAQ)
- [ ] MetricCard
- [ ] TimelineItem
- [ ] Form fields (input, select, textarea, inline error state)

## Phase 2 — Pages (one at a time, in this order)

- [ ] Home
- [ ] Contact (incl. pre-filled chip state, validation state, Calendly popup)
- [ ] Thank You + form pipeline (serverless → Brevo → redirect)
- [ ] About
- [ ] Portfolio index (pagination-ready grid)
- [ ] Case study: Sangira
- [ ] Case study: Qure
- [ ] Services + Pricing
- [ ] SEO page (Resources)
- [ ] Referrals page (Resources)
- [ ] 404
- [ ] Privacy · Terms (shared legal template)

## Phase 3 — Launch pass

- [ ] Per-page meta titles/descriptions + OG images; prerendered HTML verified per route
- [ ] sitemap.xml + robots.txt; submit to Google Search Console
- [ ] JSON-LD: Person (site-wide), BreadcrumbList (case studies)
- [ ] Lighthouse ≥ 90 (mobile) on every page
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge + iOS Safari, Android Chrome
- [ ] Full keyboard-only walkthrough
- [ ] Forms and booking tested end-to-end **in production**
- [ ] Favicon + site-wide OG image
- [ ] Custom domain purchased (on Vercel) and connected — target: end of month
- [ ] Announce on LinkedIn / X / WhatsApp

## Content gaps (owner tasks — not launch-blocking to start, blocking to finish)

- [ ] Real light-mode screenshots: Sangira (dashboard, listing flow, PIN confirmation) and Qure (staff dashboard, queue mgmt, waiting areas, analytics)
- [ ] Qure live demo URL
- [ ] Professional photo for About
- [ ] Resume PDF matching site content
- [ ] SEO proof screenshots from past project (Search Console + analytics)
- [ ] Vephla training year for the About timeline
- [ ] Referral fixed-reward amount ($) for Starter tier
- [ ] Privacy Policy + Terms text (template-based is fine)

## Post-launch (v2 candidates — not now)

- [ ] Testimonials section (only when real quotes with permission exist)
- [ ] Third case study / first client project added to Portfolio
- [ ] SEO page proof section expanded with new client results
- [ ] `backend/` comes alive if referral tracking or an admin area is needed
- [ ] Consider migrating to Next.js if SPA prerendering ever becomes a limitation
- [ ] Raise prices after first 3–5 client projects (Starter → $800–1,000, Business → $3,000+)
