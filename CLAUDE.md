# Portfolio — Azeez Damilare Gbenga

Personal brand & portfolio website. Owner: Azeez Damilare Gbenga — full-stack software engineer, Kigali, Rwanda.
GitHub: **dazeez1** · Email: azeezdamilare31@gmail.com · Phone: +250 798 203 134 · WhatsApp: +234 701 505 9880

**Stack:** React 19 + Vite + TypeScript · Tailwind CSS · React Router · Vercel · Resend (form email) · Calendly (booking popup) · Plausible (analytics)

This file is the source of truth for how this project is built. Read fully before writing any code. These rules were settled during the design phase and are not open for reinterpretation during the build. When a decision isn't covered here, choose the boring, maintainable option and flag it.

---

## 0. Working agreement — how we build together

1. **We build alongside each other, step by step.** Never generate the whole site in one pass. Propose → get approval → produce. After completing each component or page, stop, summarize what was built, and wait for the owner to review on the staging URL before moving to the next item.
2. **Components first, always.** The shared component library (Section 5) is built and approved before any page is assembled. Pages are assembly, not invention.
3. **One page at a time**, in the build order of Section 12: frontend and wiring together, page done end-to-end (including responsive + accessibility) before starting the next.
4. **Figma/Stitch exports are layout references only. NEVER copy colors, hex values, or color styles from Figma or any design export.** The tokens in Section 1 of this file are the only source of color truth. If a Figma value conflicts with this file, this file wins — silently correct it.
5. **Units: rem, not px.** All spacing, font sizes, radii, and layout dimensions use rem (Tailwind's default rem-based scale). The only px exceptions: 1px hairline borders and the 2px focus ring. Root font size stays at the browser default (16px = 1rem); never set a custom root px size.
6. Work happens on the `stage` branch. Small conventional commits per meaningful change. Merge to `main` only when the owner approves a page as done (Section 13).
7. **Never amend, rebase, reset, or otherwise rewrite git history without explicit owner approval in that session.** If a commit needs fixing, propose the fix and wait.
8. **Commit messages are short and simple:** one conventional line (e.g. `feat: about page`, `fix: 404 route`), no body unless genuinely needed, and never any mention of Claude, AI, or co-authorship anywhere in the message.

---

## 1. Color system — "Terracotta editorial"

Light mode is the **default** theme. Dark mode is a user toggle, never the default.

### Light mode tokens

| Token            | Hex       | Usage                                                                     |
| ---------------- | --------- | ------------------------------------------------------------------------- |
| `bg`             | `#FAF7F2` | Page background (warm ivory)                                              |
| `surface`        | `#FFFFFF` | Cards, form containers, framed screenshots                                |
| `surface-alt`    | `#F3EEE5` | Alternate section bands, hover fills                                      |
| `ink`            | `#211D18` | Headings, primary text, primary buttons, dark CTA bands                   |
| `text-secondary` | `#5C554A` | Body text                                                                 |
| `text-muted`     | `#706A61` | Captions, labels, metadata — 4.63:1 on `surface-alt`, passes AA at 12px    |
| `accent`         | `#D95D39` | Terracotta — accent button, italic hero word, availability dot, key icons |
| `accent-hover`   | `#C24E2C` | Accent button hover                                                       |
| `accent-text`    | `#B04525` | **All accent-colored text below 18px** — links, small labels              |
| `tint`           | `#F7E7DF` | Quote backgrounds, chips, badges, selected states                         |
| `tint-border`    | `#EDD5C8` | Border on tinted elements                                                 |
| `border`         | `#EAE4DA` | Default borders, dividers                                                 |
| `border-strong`  | `#888176` | **Functional boundaries** — inputs, secondary button, filter pills, pagination and carousel controls, timeline nodes, dashed cards (3:1 per 1.4.11) |
| `border-decorative` | `#D8D0C2` | **Ornament only** — BrowserFrame dots, 404 ghost numeral. No threshold |
| `focus`          | `#D95D39` | 2px focus ring on all interactive elements                                |
| `success`        | `#4F7942` | Form success states                                                       |
| `warning`        | `#C2790F` | Warnings                                                                  |
| `error`          | `#A63B2A` | Form validation errors (never use accent for errors)                      |

### Dark mode tokens

| Token            | Hex                                                                   |
| ---------------- | --------------------------------------------------------------------- |
| `bg`             | `#191613`                                                             |
| `surface`        | `#232019`                                                             |
| `surface-alt`    | `#2B2720` (one step lighter than dark `surface`, same warm undertone) |
| `text`           | `#F0EBE3`                                                             |
| `text-secondary` | `#A89F91`                                                             |
| `text-muted`     | `#968F81` (lightened — the light-mode muted fails contrast on dark)    |
| `accent-text`    | `#E8825F` — **same as dark `accent`**, declared as `var(--accent)`     |
| `tint`           | `#31251F` (the terracotta wash rebuilt dark, just above `surface-alt`) |
| `tint-border`    | `#483A32` (subtle edge on the dark `tint`, matching the light pair)    |
| `border`         | `#33302B`                                                             |
| `border-strong`  | `#81786A` (functional boundaries only — 3:1 per 1.4.11, see note below) |
| `border-decorative` | `#3C3934` (ornament stays faint — 1.57:1 on dark `bg`, mirroring light) |
| `accent`         | `#E8825F` (brightened — light-mode terracotta fails contrast on dark) |
| `accent-hover`   | `#E3653B` (8 lightness points under `accent`, the same 1.26:1 step the light pair has) |
| `success`        | `#669D55`                                                             |
| `warning`        | `#CB7E10`                                                             |
| `error`          | `#D77363`                                                             |

Primary buttons invert in dark mode: `#F0EBE3` fill, `#191613` text.

**Every token in the light table now has a dark counterpart.** The only exceptions are deliberate: `focus`, `button-primary-bg`, and `button-primary-text` are `var()` aliases that follow `accent`, `ink`, and `bg` automatically, and the three brand icon colors are external and theme-independent by design. **A token defined only in the light block is a latent contrast bug** — if you add one to `:root`, add its dark value here in the same change.

The binding surface for light-on-dark text is `tint` (`#31251F`), a hair lighter than `surface-alt` — measure dark text values against all four dark surfaces, not just `bg`.

**Which threshold applies to which token.** WCAG 1.4.3 (4.5:1) governs text; 1.4.11 (3:1) governs UI-component boundaries and graphics. `error`, `success`, and `warning` carry text, so all three clear 4.5:1. `accent-hover` is only ever a fill, so what is measured is the button label on it (5.31:1). `border-strong` is never text, so 3:1 is its bar — `#888176` clears it on all four light surfaces (worst 3.20:1 on `tint`) and `#81786A` on all four dark ones (worst 3.41:1).

**Why `border-strong` and `border-decorative` are two tokens.** 1.4.11 applies to boundaries a user must perceive to *operate* something; it does not apply to pure ornament. Forcing one value to serve both broke the ornament: the 404 numeral is a 7–18rem watermark sitting directly behind the real heading and body copy, `aria-hidden` per Section 9, and at 3:1 it becomes a dark shape competing with the text on top of it. The BrowserFrame window dots have the same problem — they are quiet chrome and convey nothing. So functional boundaries darkened and ornament kept the old pale value. **When adding a border, pick by function:** does the user need to see it to operate a control? `border-strong`. Is it decoration? `border-decorative`. Note that the carousel dots are real `<button>`s, so they are functional despite looking ornamental.

### Brand icon colors (Footer social icons, hover only)

Not part of the theme system — these don't swap between light/dark, and don't count toward the accent-usage rules below. Icons are monochrome (`ink`) at rest; on hover, each icon shows its own official brand color.

| Icon      | Hex       |
| --------- | --------- |
| GitHub    | `#211D18` (the existing `ink` token — no new color needed) |
| LinkedIn  | `#0A66C2` |
| WhatsApp  | `#25D366` |
| Instagram | `#E4405F` |

### Color rules — non-negotiable

1. **The dark ink button is the default primary.** The terracotta accent button appears **at most once per page** — the single highest-value CTA (usually "Book a call" / "Book a discovery call").
2. **`#D95D39` never carries text below 18px.** Small accent text always uses `#B04525` (passes WCAG AA on ivory).
3. **The accent *fill* carries large text only.** `bg` on `accent` measures **3.52:1** — it can never satisfy 1.4.3's 4.5:1 for normal text, but it does satisfy the **3:1 large-text** threshold. So the `accent` button variant locks its label to **1.25rem/700** (20px bold = 15pt bold), and the accent fill must never carry a smaller or lighter label. Note the unit: WCAG large-scale text means **≥18pt (24px) regular, or ≥14pt bold (18.67px bold)** — an 18**px** regular label is only 13.5pt and still needs 4.5:1, so 18px alone does not fix this. Enforced in `Button.tsx`'s `accent` variant; shrinking that label re-breaks contrast. If a small accent-colored call to action is ever needed, use accent *text* on a neutral fill, not the accent fill.
4. **The accent appears in roughly five places per page, no more.** Neutral base + dark text does 95% of the work; the accent does 5% loudly. When everything is bold, nothing stands out.
5. The tint (`#F7E7DF`) is how terracotta shows up quietly — quotes, chips, availability badge, selected/pre-filled states.
6. Form validation uses `error` red, never the accent.
7. Implement all tokens as CSS variables / Tailwind theme extensions so dark mode is a token swap, not a rewrite.
8. **Never take colors from Figma, Stitch exports, or screenshots.** Design files are layout references; this table is the only color source. Any hex value in code must exist in this file.

---

## 2. Typography

- **Headings:** editorial serif display — Fraunces (preferred), Instrument Serif, or Newsreader. Self-host via `@fontsource` packages or local font files with `@font-face` — no Google Fonts CDN link (performance + privacy).
- **Body & UI:** clean geometric sans — Inter (or similar). Self-hosted the same way, preloaded.
- Hero headline: 4.5–5.5rem desktop (72–88px equivalent), line-height ~1.1, slight negative letter-spacing.
- Section headings: serif, 2–2.5rem. Real headlines — **not** small uppercase labels. Only genuinely minor strips (e.g. "TOOLS I WORK WITH") use the small uppercase muted-label style.
- All type sizes in rem, per the units rule in Section 0.
- Exactly **one italic accent word** in the hero ("works") and one in the final CTA ("solves"), colored accent.
- Long-form pages (case studies, legal): body max-width ~65–70ch, relaxed line-height.

---

## 3. Imagery rules — non-negotiable

1. **Real screenshots only.** No AI-generated imagery, no stock photos, no fake device renders — anywhere, ever.
2. Every product screenshot sits inside the shared **BrowserFrame** component (three dots + optional URL bar), on light backgrounds consistent with the ivory theme.
3. Every image has meaningful alt text.
4. All screenshots are pre-optimized (WebP/AVIF, correctly sized per breakpoint via `srcset`), lazy-loaded below the fold (`loading="lazy"`), with explicit width/height to prevent layout shift.

---

## 4. Honesty rules — non-negotiable

This site never claims what isn't true:

- No invented metrics, client counts, or percentage improvements. The only numbers on the site are verified ones (e.g. Sangira: 3 portals, Lighthouse 95/100/96, −82% bundle; Qure: 20+ endpoints, 4 roles).
- No placeholder testimonials rendered in production. The testimonials section does not exist until a real quote (with permission) exists.
- The SEO page shows proof from real projects only.
- "Starting from" prices are real commitments: Starter Website $200 · Business web app $665 · Enterprise System $1,500.
- Education: B.Sc. Software Engineering, African Leadership University, 2023–2026, First Class Honours, CGPA 4.22.
- **Never write, improve, or paraphrase site copy.** All copy comes from the owner-approved data files; if copy is missing, ask.
- **Voice: first-person "I" site-wide, including case studies. Sangira and Qure are the owner's own products, not client work. Never describe them as client projects.**

---

## 5. Architecture rules

1. **Components before pages.** Shared components live in `components/`: `Button`, `Card`, `SectionHeading`, `Nav` (with Resources dropdown), `Footer`, `BrowserFrame`, `TagPill`, `Accordion`, `MetricCard`, `TimelineItem`, form fields. Pages are assembly, not invention.
2. **Content lives in data, not JSX.** Projects, services, pricing tiers, FAQ entries, certifications, timeline milestones → structured files in `content/` or `data/` (TS objects or MDX). Adding a project = add one object + screenshots. Never hard-code content into page components.
3. **Case studies share one template.** One layout component renders Sangira, Qure, and every future project from their content files.
4. One `h1` per page. Semantic heading hierarchy throughout.
5. Keep dependencies minimal. No UI kit imports for things a 20-line component can do.

---

## 6. Pages & routes

| Route                | Page               | Notes                                                                                                                                                      |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Home               | Editorial hero; **no** credentials strip section (one line in hero); **no** testimonials section                                                           |
| `/portfolio`         | Portfolio index    | 2 featured case studies + paginated "More projects" grid (6/page); private client projects show "Live site", no code link                                  |
| `/portfolio/sangira` | Case study         | Content complete; repo → github.com/dazeez1/Sangira                                                                                                        |
| `/portfolio/qure`    | Case study         | Content complete; repo → github.com/dazeez1/Qure                                                                                                           |
| `/about`             | About              | Timeline: SideHustle 2021 · ALU 2023 · Vephla · IBM/DataCamp 2025 · Deep Learning Indaba Aug 2025 · graduation 2026                                        |
| `/services`          | Services + pricing | 4 service cards (2×2, bulleted lists) · 3 packages · comparison table · custom band · process steps. No "who owns the code" section, no care-plans section |
| `/contact`           | Contact            | Copy buttons, socials (GitHub, LinkedIn, Instagram), form, Calendly button, FAQ                                                                            |
| `/thank-you`         | Post-submit        | Summary card, referral card, next actions                                                                                                                  |
| `/seo`               | SEO services       | Under Resources dropdown                                                                                                                                   |
| `/referrals`         | Referral program   | Under Resources dropdown                                                                                                                                   |
| `/privacy`, `/terms` | Legal              | Shared template                                                                                                                                            |
| `404`                | Not found          | Ghost numeral, helpful-links card (rendered once)                                                                                                          |

**Nav (site-wide):** Home · Portfolio · About · Services · Resources ▾ (SEO, Referrals) · Contact + "Book a call" button.
**Footer socials everywhere:** GitHub, LinkedIn, WhatsApp, Instagram.

---

## 7. Conversion flow logic

1. **Every conversion button funnels to `/contact` with a URL parameter.** One form, one pipeline, one thank-you page:
   - Pricing "Get started" → `/contact?package=starter-website` | `business-web-app` | `full-platform`
   - SEO plans → `/contact?package=seo-starter` | `seo-growth` | `seo-premium`
   - Custom/out-of-scope work → `/contact?package=custom`
   - Referrals "Start referring now" / "Contact me to refer" → `/contact?type=referral`
2. On arrival with a parameter: show a dismissible tinted chip ("Selected: … ✕"), pre-set the "What do you need?" select, and for referrals swap the message placeholder to: _"Who are you referring, and what do they need? Include their name and how I can reach them — or just your own details and I'll follow up."_
3. "What do you need?" options: New project · Existing product help · Hiring or recruiting · I want to refer someone · Something else. Budget range is **optional**.
4. **Submission pipeline:** API route → Resend transactional email to azeezdamilare31@gmail.com. Subject format: `[Portfolio] <type> — <package if any> — <name>`. Include a honeypot field for spam. Validate inline (error red, message under field, focus first error — no toasts, no modals).
5. On success: redirect to `/thank-you` with a summary of what was sent. No toast, no modal.
6. **Booking:** "Pick a time" opens the Calendly popup widget. No embedded calendar anywhere.

---

## 8. SEO — per page, as it's built

**SPA caveat:** because this is a Vite + React SPA (not server-rendered), SEO requires deliberate mitigation — this is mandatory, not optional:

- **Pre-render every route to static HTML at build time** (e.g. `vite-plugin-ssr`/Vike prerender, or an equivalent SSG step) so crawlers and link previews receive real content, not an empty shell. If prerendering ever becomes a blocker, flag it — the fallback decision is migrating to Next.js, not shipping an unrendered SPA.
- `frontend/vercel.json` rewrites all paths to `/index.html` — the SPA fallback that makes direct loads and hard reloads of deep routes (e.g. `/dev/components`) work instead of hitting Vercel's 404. The future prerendering step must not break this: every deep-linked route still needs to resolve on a direct load/reload, whether via this rewrite serving the SPA shell or via real prerendered static HTML per route.
- Per-route `<title>`, meta description, OG + Twitter tags managed via `react-helmet-async` (and baked into the prerendered HTML).
- Unique OG image per page (minimum: site-wide default + one per case study).
- `sitemap.xml` (generated at build from the routes table) and `robots.txt`; submit to Search Console at launch.
- Structured data: `Person` site-wide (JSON-LD), `BreadcrumbList` on case studies.
- Clean URLs as in the routes table (React Router, no hash routing). Descriptive link text (no "click here").

---

## 9. Accessibility — every page

- WCAG 2.1 AA contrast. The token system passes in **both** themes only because each theme has its own values — see the dark table in Section 1 and the list of tokens that still inherit light mode.

### Contrast must be verified with a two-theme axe sweep

**Lighthouse only tests light mode.** An Accessibility score of 100 says nothing about dark mode, and it is not evidence that a page passes. Verify contrast by running axe over every route in **both** themes (toggle `data-theme="dark"` on `<html>`, scroll the full page so lazy content mounts, then run axe).

This is not hypothetical. Measured on this site: Lighthouse reported Accessibility **100** on `/seo`, `/about`, and `/portfolio` while a two-theme axe sweep found **44 dark-mode contrast violations** across 12 routes — `accent-text` had no dark value and inherited the light `#B04525` onto dark backgrounds at 2.63–3.19:1. Lighthouse could not see any of it.

A token that exists in the light block and not the dark block is a latent contrast bug, whatever Lighthouse reports.

### axe's `color-contrast` rule tests TEXT ONLY

Non-text contrast under **WCAG 1.4.11** — borders, icons, form-control boundaries, focus indicators, graphical objects — is **not covered by axe at all**, and not by Lighthouse either. A completely clean sweep says nothing about it. These must be checked **manually**: read the computed border/fill colour off the rendered element and measure it against the surface behind it, at the 3:1 threshold.

Measured evidence: light-mode `border-strong` sat at **1.53:1** on a white input — every input on the site failed 1.4.11 — through multiple green axe sweeps and three Lighthouse runs reporting Accessibility 100. Nothing flagged it, because a border is not text. It was only found by measuring by hand.

So the contrast checklist has two halves: a two-theme axe sweep for text, and a manual pass over borders, icons and control boundaries for 1.4.11.

- Full keyboard operability: nav dropdown, accordions, copy buttons, form, dismissible chip.
- Visible focus ring (2px accent) on all interactive elements.
- Real `<label>` elements on form fields (never placeholder-only). Errors programmatically associated with fields.
- `prefers-reduced-motion` respected — all scroll fade-ins and hover motion disabled under it.
- The 404 ghost numeral is decorative (`aria-hidden`); the real heading is "Page not found".

---

## 10. Performance gate

Before any page merges to `main`: Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, and SEO (mobile). Fix before merge, not after launch. Route-level code-splitting (`React.lazy`), pre-optimized images per Section 3, fonts self-hosted and preloaded, no blocking third-party scripts (Plausible is async; Calendly loads on interaction).

---

## 11. Git & environments

- **Branches:** `main` = production (custom domain). `stage` = staging, auto-deployed by Vercel to its own preview URL. Work happens on `stage` (or short-lived feature branches merged into `stage`), tested on the deployed staging URL, then merged to `main`.
- Production data and staging data never share a store. The site is static + email today; if a database is ever added, staging gets its own free-tier instance — same code, different env vars.
- Secrets live in Vercel environment variables, never in the repo.
- Commits: small, present-tense, conventional (`feat: contact form validation`, `fix: mobile nav overflow`). The repo is public — its history is part of the portfolio.

---

## 12. Build order

1. Scaffold: Vite + React 19 + TypeScript + Tailwind + React Router. Repo `dazeez1/portfolio`, branches `main` + `stage`, Vercel connected to both from the first commit.
2. Design system as code: tokens (CSS variables + Tailwind theme), self-hosted fonts, shared components — each presented for approval before pages begin.
3. Home.
4. Contact + Thank You + form pipeline + Calendly (conversion path live and testable early — every other page's buttons point here).
5. About.
6. Portfolio index → Sangira → Qure.
7. Services.
8. SEO page → Referrals page.
9. 404, Privacy, Terms.
10. Full pass: SEO metadata, analytics goals, cross-browser, mobile, Lighthouse.

Deploy from the first commit; ship page by page.

---

## 13. Definition of done — per page

A page is done when: it matches the approved wireframe and this design system · it is responsive (mobile, tablet, desktop) · all links and buttons route correctly (including URL-param pre-fills) · it passes the accessibility checklist · Lighthouse ≥ 90 on Performance, Accessibility, and Best Practices, plus SEO where the page is indexable (see the exemption below) · content comes from data files, not hard-coded JSX · it works on the deployed staging URL, not just localhost · **and it satisfies the SEO block below.**

### Lighthouse gates are measured against a PRODUCTION build, never a preview URL

Run the gate against a production build (`npm run build` + `vite preview`, or the production deployment). **A preview URL cannot measure these scores honestly**, because the preview host injects things the real page never serves:

- **The Vercel preview toolbar** (`vercel.live/_next-live/feedback/feedback.js`) is a third-party script absent from our HTML. It paints into the viewport late, inflating Speed Index and pulling Performance down.
- **`x-robots-tag: noindex`** is sent on every preview response. Lighthouse's `is-crawlable` audit therefore fails for host reasons even when the page carries no robots meta of its own, dragging SEO down.

Measured example on `/seo`: **Performance 86 · SEO 61 on the preview URL, versus Performance 95 · SEO 92 on a production build** of the identical commit — Speed Index alone went 7.5s → 1.5s. Preview scores understate Performance and SEO for reasons unrelated to the page.

A page must still *work* on the deployed staging URL (Section 13's definition of done). Verify behaviour there; measure the gate on production.

### Lighthouse SEO gate — indexable pages only

The **SEO ≥ 90 gate applies only to indexable pages.** Any page carrying `<meta name="robots" content="noindex">` is exempt, because Lighthouse's `is-crawlable` audit fails by design on a noindexed page and drags the whole SEO category down regardless of how well the page is built. The other three categories still apply in full.

`/privacy` and `/terms` are **intentionally noindexed** — legal pages should not compete with real content in search results. Their SEO score is expected to be low and that is the correct outcome, not a defect. Measured on `/privacy`: Performance 95 · Accessibility 95 · Best Practices 100 · SEO 58, where removing the noindex tag alone scores 92.

**Never remove a `noindex` tag to raise a Lighthouse score.**

### SEO block — standing requirement on every page

Every page ships with all of the following. This is not optional and not deferred to launch:

- Unique `<title>` and unique meta description, both written for real search intent (not restatements of the page name).
- `<link rel="canonical">` pointing at the page's clean production URL.
- Exactly **one** `h1`, carrying the page's keyword intent. Semantic heading order with no skipped levels (`h1` → `h2` → `h3`).
- Open Graph + Twitter card tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) — page-specific OG image where one exists, site default otherwise.
- Meaningful alt text on every image (Section 3 rule 3).
- At least one internal link to Contact or Services.
- Structured data where a schema.org type genuinely fits the page (`Service` + `Offer` on Services, `BreadcrumbList` on case studies, `Person` site-wide). Never invent ratings or review markup.
