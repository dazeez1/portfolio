PROJECT CONTEXT — Portfolio, Azeez Damilare Gbenga

WHO
Azeez Damilare Gbenga — full-stack software engineer (MERN), Kigali, Rwanda.
B.Sc. Software Engineering, African Leadership University, 2023–2026, First Class Honours, CGPA 4.22.
GitHub: dazeez1 · Email: azeezdamilare31@gmail.com · WhatsApp: +250 798 203 134.
Certifications: Full-Stack Dev (Vephla), DB Design (DataCamp, Jun 2025), Flutter & Dart (IBM, Mar 2025), Deep Learning Indaba 2025 (Univ. of Rwanda, Aug 2025), Academic Writing (Coursera/OPJGU, Jun 2024). Past: graphics design internship (SideHustle, 2021), customer relations (Datahub), virtual assistant (Healthertainer).

WHAT
Personal brand + portfolio site to convert recruiters, founders, CTOs, agencies, healthcare orgs, and NGOs into inquiries, interviews, and consulting work. Positioning: "solves real business problems through software."

FEATURED PROJECTS (only verified ones — 2)

- Sangira: verified food redistribution platform, MERN + Socket.io, dual-party PIN handover confirmation. Live: sangira.vercel.app · github.com/dazeez1/Sangira. Verified metrics: 3 portals, Lighthouse 95/100/96, −82% bundle (1.85MB→340KB).
- Qure: multi-hospital queue & patient flow SaaS, Node/Express/Prisma/MongoDB, 4 roles, hospital-scoped data. github.com/dazeez1/Qure. Verified metrics: 20+ endpoints, 4 user roles, real-time analytics + CSV export.
  ExpatHomes was dropped from scope (not on CV). Case study content for both projects is written and final.

DESIGN (phase complete — all pages wireframed, approved, and Stitch-prompted)

- System: "Terracotta editorial" — ivory #FAF7F2 bg, ink #211D18 text/primary buttons, terracotta #D95D39 accent (max ~5 uses/page; small accent text uses #B04525), tint #F7E7DF, error #A63B2A. Dark mode = toggle (bg #191613, accent #E8825F).
- Type: serif display headings (Fraunces), Inter body. One italic accent word in hero ("works") and CTA ("solves").
- Imagery: real screenshots only, in a BrowserFrame component. No AI/stock imagery ever.
- Honesty rules: no invented metrics, no placeholder testimonials in production.
- Pages: Home (editorial hero, no credentials strip, no testimonials) · Portfolio (2 featured + paginated grid, 6/page; private client projects get "Live site", no code link) · Sangira + Qure case studies (shared template, 6 numbered sections) · About (timeline, values, skills, certs) · Services+Pricing (4 service cards 2×2 with bulleted lists; 3 packages: Starter website $600 / Business web app $2,000 / Full platform $4,500 "starting from"; comparison table; custom band; no code-ownership or care-plan sections) · Contact (copy buttons, socials GitHub/LinkedIn/Instagram, form, Calendly popup via "Pick a time" — no embedded calendar, FAQ) · Thank You (summary card + referral card) · SEO + Referrals (under Resources ▾ dropdown; commissions: fixed $ / 5–10% / 10–15%) · 404 · Privacy/Terms. Blog was cut (no time to maintain).
- Nav: Home · Portfolio · About · Services · Resources ▾ (SEO, Referrals) · Contact + "Book a call". Footer socials: GitHub, LinkedIn, WhatsApp, Instagram.

CONVERSION LOGIC
Every CTA funnels to /contact with URL params (?package=…, ?type=referral) → pre-filled dismissible chip + pre-set select. Form options: New project / Existing product help / Hiring or recruiting / I want to refer someone / Something else; budget optional. Submit → serverless fn → Resend email to owner's Gmail (subject: [Portfolio] type — package — name) → redirect to /thank-you. Inline validation only (no toasts/modals).

BUILD (current phase — starting now)

- Stack: React 19 + Vite + TypeScript + Tailwind + React Router (owner's choice over Next.js; SEO mitigations mandatory: build-time prerendering of all routes, react-helmet-async, generated sitemap).
- Repo: dazeez1/portfolio. Structure: docs at root (CLAUDE.md = rules, PROJECT.md = overview, ROADMAP.md = phase checklists) · frontend/ = the app · backend/ = .gitkeep only. Vercel root dir = frontend/.
- Branches: stage (work + staging deploy) → main (production) on owner approval. Staging never shares a data store with production.
- Rules: rem not px (except 1px borders / 2px focus ring); never take colors from Figma — CLAUDE.md tokens only; components before pages; content in data files not JSX; Lighthouse ≥ 90 gate before merging to main.
- Workflow: build alongside — Claude Code proposes → owner approves → produce; stop after each component/page for review on staging URL.
- Build order: Phase 0 scaffold+tokens+fonts → Phase 1 component library → Phase 2 pages (Home → Contact/Thank You/pipeline → About → Portfolio → case studies → Services → SEO/Referrals → utilities) → Phase 3 launch pass.

STATUS / OPEN ITEMS
Currently at: Phase 0 (scaffold). Owner reviews each step and reports back for the next.
Owner to-dos: real light-mode screenshots (both projects), Qure live URL, photo for About, resume PDF, SEO proof screenshots, Vephla year, referral fixed $ amount, legal text, domain purchase on Vercel at end of month (name preference: azeezdamilare.com), analytics from day one (Plausible).
V2 parking lot: testimonials (when real), third project, backend/ activation, possible Next.js migration, price raises after 3–5 projects.
