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
| `text-muted`     | `#8A8377` | Captions, labels, metadata                                                |
| `accent`         | `#D95D39` | Terracotta — accent button, italic hero word, availability dot, key icons |
| `accent-hover`   | `#C24E2C` | Accent button hover                                                       |
| `accent-text`    | `#B04525` | **All accent-colored text below 18px** — links, small labels              |
| `tint`           | `#F7E7DF` | Quote backgrounds, chips, badges, selected states                         |
| `tint-border`    | `#EDD5C8` | Border on tinted elements                                                 |
| `border`         | `#EAE4DA` | Default borders, dividers                                                 |
| `border-strong`  | `#D8D0C2` | Input borders                                                             |
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
| `border`         | `#33302B`                                                             |
| `accent`         | `#E8825F` (brightened — light-mode terracotta fails contrast on dark) |

Primary buttons invert in dark mode: `#F0EBE3` fill, `#191613` text.

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
3. **The accent appears in roughly five places per page, no more.** Neutral base + dark text does 95% of the work; the accent does 5% loudly. When everything is bold, nothing stands out.
4. The tint (`#F7E7DF`) is how terracotta shows up quietly — quotes, chips, availability badge, selected/pre-filled states.
5. Form validation uses `error` red, never the accent.
6. Implement all tokens as CSS variables / Tailwind theme extensions so dark mode is a token swap, not a rewrite.
7. **Never take colors from Figma, Stitch exports, or screenshots.** Design files are layout references; this table is the only color source. Any hex value in code must exist in this file.

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
- "Starting from" prices are real commitments: Starter website $600 · Business web app $2,000 · Full platform/SaaS $4,500.
- Education: B.Sc. Software Engineering, African Leadership University, 2023–2026, First Class Honours, CGPA 4.22.
- **Never write, improve, or paraphrase site copy.** All copy comes from the owner-approved data files; if copy is missing, ask.

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
   - SEO plans → `/contact?package=seo-starter` | `seo-growth` | `seo-ongoing`
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

- WCAG 2.1 AA contrast (the token system already passes if the color rules are followed).
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

A page is done when: it matches the approved wireframe and this design system · it is responsive (mobile, tablet, desktop) · all links and buttons route correctly (including URL-param pre-fills) · it passes the accessibility checklist · Lighthouse ≥ 90 across the board · meta title/description/OG are set · content comes from data files, not hard-coded JSX · it works on the deployed staging URL, not just localhost.
