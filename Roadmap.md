# Roadmap

Build order is sequential — a phase starts only when the previous one is approved by the owner on the staging URL. Check items off as they're completed. Full definition of done per page: `CLAUDE.md` Section 13.

---

## Phase 0 — Scaffold & foundations

- [x] Vite + React 19 + TypeScript + Tailwind + React Router scaffold inside `frontend/`
- [x] Repo structure: `frontend/`, `backend/` (`.gitkeep` only), docs at root
- [ ] Branches: `main` (production) + `stage` (staging) pushed to `origin`; not yet connected to Vercel (blocked on Vercel auth — see owner to-dos)
- [x] Design tokens as CSS variables + Tailwind theme (light + dark) — Terracotta editorial, per CLAUDE.md Section 1
- [x] Self-hosted fonts: serif display (Fraunces) + sans (Inter), preloaded
- [x] Plausible analytics script wired (data-domain="azeezdamilare.com" — won't record real data until that domain is live and a matching Plausible site/account exists)

## Phase 1 — Component library (approve each before pages begin)

- [x] Button (primary ink / accent terracotta / secondary outline)
- [x] Card
- [x] SectionHeading (serif)
- [x] Nav (with Resources dropdown, mobile hamburger)
- [x] Footer
- [x] BrowserFrame (screenshot frame: dots + optional URL bar)
- [x] TagPill
- [x] Accordion (FAQ)
- [x] MetricCard
- [x] TimelineItem
- [x] Form fields (input, select, textarea, inline error state)

## Phase 2 — Pages (one at a time, in this order)

- [x] Revisit Resources dropdown visual design when building SEO/Referrals pages
- [x] Home
- [x] Contact (incl. pre-filled chip state, validation state, Calendly popup)
- [x] Thank You + form pipeline (serverless → Resend → redirect)
- [x] About
- [x] Portfolio index (pagination-ready grid)
- [x] Case study: Sangira
- [x] Case study: Qure
- [x] Services + Pricing
- [x] SEO page (Resources)
- [x] Referrals page (Resources)
- [x] 404
- [x] Privacy (shared `LegalLayout` template built — sticky TOC, mobile accordion, block-based content model)
- [x] Terms (reuses `LegalLayout` + the `LegalDocument` shape in content/legal.ts)

## Phase 3 — Launch pass

- [ ] Per-page meta titles/descriptions + OG images; prerendered HTML verified per route
- [ ] Backfill the CLAUDE.md Section 13 SEO block onto pages built before it existed — Home, About, Portfolio, Contact, Thank You, 404, and both case studies currently have only title + description; they still need canonical, OG/Twitter tags, and (where a type fits) JSON-LD. `/services` is the reference implementation.
- [ ] sitemap.xml + robots.txt; submit to Google Search Console
- [ ] JSON-LD: Person (site-wide), BreadcrumbList (case studies)
- [ ] Lighthouse ≥ 90 (mobile) on every page — SEO category applies to indexable pages only; `/privacy` and `/terms` are intentionally noindexed and exempt. See CLAUDE.md Section 13, "Lighthouse SEO gate".
- [ ] **Owner decision — `text-muted` fails WCAG AA at 12px and 14px.** `#8A8377` on `bg`/`surface`/`surface-alt` measures 3.2–3.8:1, under the 4.5:1 AA minimum for normal-weight body text — at both `text-xs` and `text-sm`. This affects every small uppercase label/caption site-wide (10 files, incl. shared `SectionHeading`, `MetricCard`, `BrowserFrame`, and the Footer's Privacy/Terms links), so CLAUDE.md Section 9's "the token system already passes" is not currently accurate. Fix is a doc-level choice: darken `--text-muted` in CLAUDE.md Section 1 + tokens.css, or switch small labels to `text-secondary` (#5C554A, passes). Not changed unilaterally — Section 1 rule 7 forbids introducing hexes that aren't in the doc.
- [ ] **Owner decision — accent button text contrast.** `#FAF7F2` on `accent` `#D95D39` measures 3.52:1 at 14px, under AA. Currently only used by the Services page's "Book a discovery call". `accent-hover` `#C24E2C` would pass (~4.6:1) but Section 1 designates `#D95D39` as the accent-button fill, so this needs a doc decision rather than a silent swap.
- [ ] robots.txt is missing, which costs every page ~8 Lighthouse SEO points (Services scores 92 with it absent). Tracked alongside sitemap.xml above.
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge + iOS Safari, Android Chrome
- [ ] Full keyboard-only walkthrough
- [ ] Forms and booking tested end-to-end **in production**
- [ ] Favicon + site-wide OG image — `/og-default.png` is already referenced by every page's OG/Twitter tags (see content/site.ts); the asset itself still needs creating and dropping into `frontend/public/`
- [ ] Custom domain purchased (on Vercel) and connected — target: end of month
- [ ] Verify azeezdamilare.com in Resend, then switch frontend/api/contact.ts's FROM_ADDRESS from the onboarding@resend.dev sandbox sender to the custom-domain sender
- [ ] Announce on LinkedIn / X / WhatsApp
- [ ] Remove `/dev/components` route and the `/` → `/dev/components` redirect once Home exists

## Content gaps (owner tasks — not launch-blocking to start, blocking to finish)

- [ ] Real light-mode screenshots: Sangira (dashboard, listing flow, PIN confirmation) and Qure (staff dashboard, queue mgmt, waiting areas, analytics)
- [x] Qure live demo URL (confirmed: qurequeue.com)
- [ ] Professional photo for About
- [x] Resume PDF — supplied by owner, at frontend/public/resume.pdf (2 pages, serves application/pdf)
- [ ] SEO proof screenshots from past project (Search Console + analytics)
- [ ] Vephla training year for the About timeline
- [ ] About bio paragraphs (2 placeholder paragraphs currently in content/about.ts, marked for replacement)
- [x] Referral fixed-reward amount ($) for Starter tier — confirmed $20 (see content/referrals.ts)
- [x] Real LinkedIn and Instagram profile URLs — supplied by owner, now set once in content/social.ts (Footer + Contact both read from it)
- [x] Privacy Policy text — written from a live audit of the deployed site (cookies, storage, third-party hosts, Resend payload), not a template
- [x] Terms of Service text
- [ ] Confirm Contact page budget-range select options — currently derived from the approved package prices (Section 4), not owner-specified; see content/contact.ts
- [ ] Contact FAQ answer copy (5 questions currently show a placeholder string — see content/contact.ts)
- [ ] Confirm Calendly URL is correct: https://calendly.com/azeezdamilare31/30mins (owner-supplied, not independently verified)
- [ ] Confirm Sangira live URL (gusangira.com is a placeholder pending confirmation — see content/projects.ts)
- [ ] 6 placeholder projects in content/projects.ts ("PLACEHOLDER — Project 1" through 6) need real repos, screenshots, and case study links
- [ ] Sangira architecture diagram image (placeholder slot in content/caseStudies/sangira.ts, section 03)
- [ ] SEO page proof screenshots: `/images/seo-search-console.png` (Search Console coverage) and `/images/seo-analytics.png` (Vercel Analytics). Both slots currently render BrowserFrame's neutral "No screenshot yet" placeholder — no stand-in imagery was generated (CLAUDE.md Section 3).
- [ ] Qure case study screenshots: patient queue dashboard, waiting room management (placeholder slots in content/caseStudies/qure.ts, section 02)
- [ ] Qure case study Live link is intentionally hidden pending the owner-supplied URL (content/caseStudies/qure.ts) — note projects.ts already has qurequeue.com confirmed for the portfolio card; confirm whether that URL should also populate the case study's Live link

## Post-launch (v2 candidates — not now)

- [ ] Testimonials section (only when real quotes with permission exist)
- [ ] Third case study / first client project added to Portfolio
- [ ] SEO page proof section expanded with new client results
- [ ] `backend/` comes alive if referral tracking or an admin area is needed
- [ ] Consider migrating to Next.js if SPA prerendering ever becomes a limitation
- [ ] Raise prices after first 3–5 client projects (Starter → $800–1,000, Business → $3,000+)
