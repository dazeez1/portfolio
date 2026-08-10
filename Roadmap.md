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

## Contrast

- [x] **Dark-mode token gap closed.** Every token in the light block now has a dark counterpart (or is a documented `var()` alias). Two-theme axe sweep over all 13 routes, including `/contact` with validation errors triggered: **0 violations**.
- [x] **Accent button resolved by constraining usage, not by changing the brand colour.** `#FAF7F2` on `#D95D39` is 3.52:1, which clears the 3:1 large-text threshold. The `accent` variant now locks its label to 1.25rem/700 (20px bold = 15pt bold, above WCAG's 14pt-bold floor). `/services` Accessibility went 96 → 100.
- [x] **Light-mode `border-strong` fixed by splitting the token.** It was 1.53:1 on a white input, failing 1.4.11's 3:1. `border-strong` is now `#888176` (light, worst 3.20:1 on `tint`) / `#81786A` (dark) and carries the 11 functional boundaries; a new `border-decorative` keeps the old pale `#D8D0C2` (light) / `#3C3934` (dark) for the two ornamental uses — the BrowserFrame dots and the 404 ghost numeral — which 3:1 would have wrecked. Verified by a manual 1.4.11 pass: every functional boundary reads 3.34:1 or better in both themes.
- [x] **Dark 404 ghost numeral fixed as a side effect.** It had inherited `border-strong` at 4.14:1, against light mode's 1.43:1 — loud enough that it obscured "This page doesn't exist or has been moved." It now sits at 1.57:1 and matches light mode.

## Content gaps (owner tasks — not launch-blocking to start, blocking to finish)

- [x] **Sangira datastore conflict resolved — MongoDB is correct.** Owner confirmed 10 Aug 2026. A full search found **no incorrect text anywhere**: every text occurrence in the repo already said MongoDB (meta bar `stack: "React · Node · MongoDB · Socket.io"`, the "modern MERN stack" build paragraph, and the challenge paragraph's "locking mechanism in MongoDB"). No content, alt text, JSON-LD, or card copy needed changing. `/portfolio/qure` was checked at the same time and is correct — Prisma ORM over MongoDB is a valid pairing, and its diagram chain already ends `Prisma ORM → MongoDB`.
- [ ] **The PostgreSQL + Redis Cache claim survives only inside the image** `public/images/sangira-architecture-diagram.webp` (data layer: "PostgreSQL — Primary relational DB, UUID keys · ACID compliant" and "Redis Cache"). Owner is replacing the image. Until then the diagram contradicts the copy for any sighted reader. Its alt text deliberately says "a data layer for the database, cache, and file storage" without naming a datastore, so the page never asserts the wrong one — **once the corrected image lands, update that alt text to name MongoDB.**
- [ ] Real light-mode screenshots: Sangira (dashboard, listing flow, PIN confirmation) and Qure (staff dashboard, queue mgmt, waiting areas, analytics) — listing flow, PIN confirmation, architecture diagram, and both Qure screenshots now supplied; Sangira dashboard and Qure analytics still outstanding
- [x] Qure live demo URL (confirmed: qurequeue.com)
- [x] Professional photo for About — supplied, at `/images/about-photo.webp`
- [x] Resume PDF — supplied by owner, at frontend/public/resume.pdf (2 pages, serves application/pdf)
- [x] SEO proof screenshots — /seo now shows search-result proof from the owner's own platforms (Qure, Sangira), not client work
- [ ] **Search Console + analytics proof — expected around Oct–Nov 2026.** A third proof card sits commented out in `content/seo.ts` with the shape ready to fill; nothing renders until real data exists. Drop the screenshot as `/images/seo-proof-search-console.webp`.
- [ ] Re-shoot the two /seo proof screenshots in **light mode** if the dark Google captures bother you — they read as dark blocks against the ivory theme (CLAUDE.md §3.2 wants light backgrounds). Legibility is also limited at half-card width; a tighter crop around the result itself would read better. Left as supplied — proof screenshots should not be doctored.
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
