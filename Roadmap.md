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
- [x] **Section 13 SEO block complete on all 13 routes** (14 Aug 2026). Canonical + 5 OG + 4 Twitter everywhere except 404, which carries 4 OG and no canonical by design (it renders at arbitrary URLs). `/thank-you` and 404 carry `noindex, follow`; `/privacy` and `/terms` keep theirs and now have OG too, since noindex does not stop link previews.
- [x] **`Person` JSON-LD emitted site-wide** from `components/SiteStructuredData.tsx`, rendered once in App.tsx beside ScrollManager. `sameAs` is derived from `sameAsProfiles` in content/social.ts (GitHub, LinkedIn, Instagram — WhatsApp excluded as a chat deep link, not a profile) and was verified byte-identical to the footer hrefs.
- [ ] **No per-case-study OG image.** Both case studies point at the site default. Their hero screenshots are real and near-perfect OG ratio (`sangira-card.webp` is 1400x730 = 1.91:1) but are WebP, which LinkedIn and Facebook scrapers handle unreliably — do not repoint OG at them without converting to PNG/JPEG first.
- [ ] sitemap.xml + robots.txt; submit to Google Search Console
- [x] JSON-LD: Person (site-wide), BreadcrumbList (case studies)
- [ ] Lighthouse ≥ 90 (mobile) on every page — measure on a **production build**, not a preview URL (CLAUDE.md Section 13). SEO category applies to indexable pages only; `/privacy` and `/terms` are intentionally noindexed and exempt.
- [ ] robots.txt is missing, which costs every page ~8 Lighthouse SEO points (Services scores 92 with it absent). Tracked alongside sitemap.xml above.
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge + iOS Safari, Android Chrome
- [ ] Full keyboard-only walkthrough
- [ ] Forms and booking tested end-to-end **in production**
- [x] **Brand assets supplied and wired** (14 Aug 2026). `og-default.png` 1200x630, `apple-touch-icon.png` 180x180, `favicon.ico` 32x32, all in `frontend/public/`. Icon links live in `index.html` (move to `app/root.tsx`'s head during the framework-mode migration). Verified serving as real images on the stage preview: `image/png` 638508B, `image/png` 12570B, `image/vnd.microsoft.icon` 1383B.
- [x] **`theme-color` now driven by JS — agrees with the page in 4 of 4 states** (14 Aug 2026). One unconditional `<meta name="theme-color" content="#faf7f2">` sits above the anti-flash script in index.html (it must exist before the script that rewrites it); the script overrides it to `#191613` in the same branch that sets `data-theme`, and `ThemeToggle` updates it beside its `data-theme`/localStorage writes. The static light default is also the correct no-JS fallback, since the site defaults to light. Verified: dark-state correction lands at 13.1ms against a first paint of 32.0ms — 19ms before paint, zero mutations after paint, so no wrong-chrome flash. Cold cache-disabled loads show a single background state in both themes (`rgb(250,247,242)` / `rgb(25,22,19)`), zero white or transparent frames. Moves to `app/root.tsx`'s head at the framework-mode migration with the icon links.
- [ ] **OG previews are still broken in production until `stage` merges to `main`.** Every route's `og:image` correctly points at the absolute production URL `https://azeezdamilare.com/og-default.png`, but production is `main` @ 80495f5 — **11 commits behind** — and does not contain the file, so that URL currently returns the SPA shell (`text/html`, 1968B). The asset is not missing; production is stale. Nothing to fix in code.
- [x] **Custom domain is live and connected.** `azeezdamilare.com` resolves (216.198.79.1 / 64.29.17.1) and is served by Vercel, returning the production deployment. This item was recorded as outstanding; it is not.
- [x] **`/api/contact` 500 resolved.** Diagnosed 13 Aug 2026 by black-box probing to "handler reaches Resend, Resend rejects" (both env guards passed — proven by warm-latency separation with no overlap). The owner then fixed it on the Resend side; the endpoint returned 200 on the next check. Cause was outside the code — no handler change was needed or made.
- [ ] **Merge `stage` into `main`.** Production (80495f5) predates both the `CONTACT_FROM_EMAIL` support and the api/ typecheck config, so setting that env var currently has no effect on production at all.
- [ ] **Set `CONTACT_FROM_EMAIL` in Vercel — owner action, code is ready.** azeezdamilare.com is verified in Resend and the handler now reads the sender from this env var (no longer hardcoded). Set it on **both Production and Preview**, then **redeploy** — Vercel bakes env vars in at build time, so existing builds keep the old value. Recommended value: `Portfolio Contact <hello@azeezdamilare.com>` (see the note on the display name below). Until it is set the form still works and sends from the `onboarding@resend.dev` sandbox, logging `contact api: missing env var CONTACT_FROM_EMAIL`.
- [ ] **Confirm the two contact emails in the inbox.** A valid submission now sends the owner notification *and* an acknowledgement receipt to the submitter, both from `CONTACT_FROM_EMAIL`. Check: (a) the notification's Reply-To is the submitter, (b) the acknowledgement's Reply-To is `CONTACT_TO_EMAIL` so replies reach the owner, (c) the acknowledgement renders in Gmail/Outlook/Apple Mail. **Note a 200 does not prove the acknowledgement sent** — its failures are deliberately swallowed so a broken receipt can never cost a lead. A failed one logs `contact api: acknowledgement send failed — <status>`.
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
- [x] **Testimonials live.** Two real quotes published with permission (Temilola / Hura, Nelson / Luti). Card redesigned to a single centred quote; the section switches from stacked cards to a carousel automatically at three entries.
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
