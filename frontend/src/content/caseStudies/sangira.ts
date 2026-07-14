import { projects } from "../projects";
import type { CaseStudyContent } from "./types";

const sangiraProject = projects.find((p) => p.slug === "sangira")!;

export const sangira: CaseStudyContent = {
  metaTitle: "Sangira case study — Azeez Damilare Gbenga",
  breadcrumbCurrent: "Sangira",
  hero: {
    tags: ["Social impact", "Real-time", "Full-stack"],
    title: "Sangira",
    summary:
      "A verified food-redistribution platform that connects surplus-food donors with humanitarian organisations in Kigali, with dual-party confirmation on every handover so no transfer goes unaccounted for.",
    metaBar: {
      role: "Full-stack, end to end",
      timeline: "Capstone project, 2026",
      stack: "React · Node · MongoDB · Socket.io",
      codeHref: sangiraProject.links.github,
      liveHref: sangiraProject.links.live,
    },
    screenshot: sangiraProject.screenshot,
  },
  problem: {
    paragraphs: [
      "In Kigali, hotels, caterers, and supermarkets throw away good surplus food every day while shelters and orphanages nearby struggle to feed the people in their care. The food and the need exist at the same time, in the same city — what's missing is a reliable way to connect them.",
      "The few informal channels that do exist run on phone calls and personal contacts, and they share three weaknesses. First, there's no way to know whether the organisation on the other end is real — a donor handing over food has no way to verify that the 'NGO' collecting it is legitimate, and an NGO has no assurance the food is safe. Second, there's no dependable record that a handover actually happened; once food leaves the kitchen, it disappears from any system. Third, there's no accountability if something goes wrong — no shared record of what was given, received, and in what condition.",
      "For food donors, that uncertainty is enough to make them not bother — it's easier to bin the surplus than risk giving it to someone they can't trust. The result is waste on one side and hunger on the other, separated by a trust gap that nobody had built infrastructure to close.",
    ],
  },
  solution: {
    intro:
      "Sangira is a three-sided web platform — donors, recipient organisations (NGOs), and administrators — built around one core idea: every organisation is verified before it can participate, and every completed transfer is confirmed independently by both sides.",
    subBlocks: [
      {
        lead: "Verification first.",
        text: "No organisation can post or request food until an administrator has reviewed its registration documents and approved it. This turns 'some stranger online' into 'a verified, accountable organisation.'",
      },
      {
        lead: "A clear listing-and-request flow.",
        text: "Donors post surplus food with quantity, type, storage condition, expiry, and pickup location. NGOs browse what's available, see how far each listing is from them, and request the food they can use.",
      },
      {
        lead: "Dual-party pickup confirmation — the heart of the system.",
        text: "The donor holds a PIN; the NGO enters it at pickup and files a short condition report. Only when both sides confirm does the transfer complete and count toward impact.",
      },
      {
        lead: "Impact you can see.",
        text: "Every completed transfer records meals redistributed, waste prevented, and items moved — surfaced in dashboards and on a public landing page, all from real data.",
      },
    ],
    images: [
      {
        image: {
          src: "/images/sangira-listing-flow.png",
          alt: "Sangira listing flow screenshot",
        },
        label: "Listing flow",
      },
      {
        image: {
          src: "/images/sangira-pin-confirmation.png",
          alt: "Sangira PIN confirmation screenshot",
        },
        label: "PIN confirmation",
      },
    ],
  },
  build: {
    paragraphs: [
      "In plain terms: a React single-page app talks to an Express REST API, which stores everything in MongoDB. Users are authenticated with JWT cookies and sorted into three roles — donor, NGO, admin — each with its own portal and its own permissions. A Socket.io layer pushes live updates without the user refreshing. Images and documents live in Cloudinary; addresses are turned into map coordinates through Google's geocoding service; email notifications go out through Brevo.",
      "Why these choices: the document model fits organisations whose profile, verification status, and history are read together as one unit. The dual-confirmation evidence lives embedded inside each transfer record, so the complete, auditable story of a handover sits in one place. Access is gated at the API, not just hidden in the interface. Deployment is split — frontend on Vercel's CDN, backend on Render, database on MongoDB Atlas — each layer on the infrastructure it's best suited to.",
    ],
    diagram: {
      label: "Architecture diagram",
    },
  },
  features: [
    {
      title: "Organisation verification",
      description:
        "Admins review registration documents and approve, reject, revoke, or reinstate — no one transacts unverified.",
    },
    {
      title: "Dual-party pickup confirmation",
      description:
        "Donor and NGO each confirm independently (PIN + condition report); the transfer only completes when both agree.",
    },
    {
      title: "Real-time notifications",
      description:
        "Live in-app alerts via Socket.io, plus email for new listings, accepted requests, and completed transfers.",
    },
    {
      title: "Location and distance",
      description:
        "Addresses are geocoded; NGOs see how far each listing is and can view listings on an interactive map.",
    },
    {
      title: "Impact dashboards",
      description:
        "Real meals-redistributed, waste-prevented, and transfer figures — with CSV/PDF export.",
    },
    {
      title: "Admin governance",
      description:
        "Flag, suspend, revoke, and restore organisations, with a full audit trail and SLA tracking on the verification queue.",
    },
  ],
  challenges: {
    paragraphs: [
      "The hardest part was proving the dual-confirmation flow held up against real, live behaviour — not the happy path. In theory, 'both parties confirm and the transfer completes' is simple. In practice, I had to handle every way it could go wrong: what happens when a listing expires while a request is still pending, when two NGOs request the same food, when a donor never accepts anyone, when the PIN is entered wrong repeatedly. Each of those was a real bug I found by actually running the two-sided flow in two browsers, watching it break, and tracing why.",
      "A recurring, humbling lesson: when a fix 'didn't work,' the code was often right and something else was stale. More than once I chased a phantom bug in application logic when the real cause was a stale process, a caching layer, or a database read-consistency issue where a long-lived connection was reading slightly outdated data. Learning to suspect state and environment before assuming the logic was wrong changed how I debug.",
      "Deployment taught me that 'works on my machine' hides a lot. The app ran flawlessly locally and then surfaced a string of production-only issues: cross-domain cookies that desktop browsers accept but mobile Safari blocks, WebSocket auth that failed silently, short-lived tokens expiring mid-session, stale code chunks after redeploys. Each one was a lesson in how the real internet — CORS, cookie policies, proxies, mobile privacy rules — is stricter than a laptop.",
      "What I'd do differently: I'd design the auth and hosting topology for cross-site and mobile constraints from day one — same parent domain, first-party cookies — rather than discovering those limits at deployment. And I'd build the real-time and expiry-handling paths earlier, because they turned out to be where most of the genuinely hard logic lived.",
    ],
  },
  results: {
    metrics: [
      { value: "3 portals", label: "Donor, NGO, admin — full role-based access" },
      {
        value: "95 / 100 / 96",
        label: "Lighthouse: performance, accessibility, best practices (production)",
      },
      { value: "−82% bundle", label: "1.85 MB → 340 KB via route-level code-splitting" },
    ],
    footnote:
      "Live redistribution figures — meals, waste prevented, transfers — grow with real platform use and are shown live on the app.",
  },
  projectNav: {
    prevLabel: "All projects",
    prevHref: "/portfolio",
    nextLabel: "Qure",
    nextHref: "/portfolio/qure",
  },
  closingCta: {
    heading: "Have a problem like this one?",
    buttonLabel: "Book a discovery call",
    buttonHref: "/contact",
  },
};
