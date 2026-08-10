import {
  BellIcon,
  ChartIcon,
  CheckIcon,
  ClipboardIcon,
  DocumentIcon,
  LocationIcon,
  MonitorIcon,
  ShieldCheckIcon,
} from "../../components/icons";
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
    summaryDetail:
      "I solved the trust gap to ensure surplus food reaches those in need safely and efficiently.",
    metaBar: {
      role: "Full-stack, end to end",
      timeline: "(2026)",
      stack: "React · Node · MongoDB · Socket.io",
      codeHref: sangiraProject.links.github,
      liveHref: sangiraProject.links.live,
    },
    screenshot: sangiraProject.screenshot,
  },
  problem: {
    title: "Bridging the Gap",
    paragraphs: [
      "In Kigali, hotels, caterers, and supermarkets throw away good surplus food every day while shelters and orphanages nearby struggle to feed the people in their care. The food and the need exist at the same time, in the same city what's missing is a reliable way to connect them.",
      "The informal channels that exist run on phone calls and personal contacts, with no way to verify the organisation on the other end, no record a handover happened, no accountability when something goes wrong. For donors, that uncertainty makes it easier to bin the surplus than risk it. Waste on one side, hunger on the other, separated by a trust gap.",
      "My challenge was to build a digital infrastructure that didn't just move food, but moved verification and accountability alongside it in real-time.",
    ],
  },
  solution: {
    title: "Automated Accountability",
    intro:
      "I built a three-portal ecosystem (Donors, NGO, Administrators) that digitizes the entire chain of custody.",
    subBlocks: [
      {
        Icon: ShieldCheckIcon,
        lead: "Verification",
        text: "Automated identity checks for every NGO and DONOR onboarded.",
      },
      {
        Icon: DocumentIcon,
        lead: "Listing Flow",
        text: "Simple 3-step process for DONOR to list surplus in under 40 seconds.",
      },
      {
        Icon: CheckIcon,
        lead: "Dual-party Confirmation",
        text: "QR-code or PIN based handshake at both pickup and drop-off points.",
      },
      {
        Icon: MonitorIcon,
        lead: "Impact Dash",
        text: "Real-time reporting on meals saved and CO2 emissions reduced.",
      },
    ],
    images: [
      {
        image: {
          src: "/images/sangira-listing-flow.webp",
          alt: "Sangira listing flow on mobile: a donor entering surplus food details and a pickup window",
          // Tall mobile capture (900×1667) — cropping it to a landscape frame
          // would leave a meaningless horizontal band.
          fit: "contain",
          aspect: "aspect-[3/4]",
        },
        label: "Listing flow",
      },
      {
        image: {
          src: "/images/sangira-pin-confirmation.webp",
          alt: "Sangira PIN confirmation screen where donor and NGO each confirm a handoff",
          fit: "contain",
          aspect: "aspect-[3/4]",
        },
        label: "PIN confirmation",
      },
    ],
  },
  build: {
    title: "Engineered for Speed",
    paragraphs: [
      "Leveraging a modern MERN stack with Socket.io allowed me to provide the real-time feedback required for logistics while maintaining a lightweight footprint for mobile users on varied network speeds.",
    ],
    diagram: {
      label: "Architecture diagram",
      image: {
        src: "/images/sangira-architecture-diagram.webp",
        alt: "Sangira's five-layer architecture: a presentation layer with donor, NGO, and admin portals; an API gateway handling REST routing, JWT authentication, rate limiting, and TLS; application services for auth, listings, matching, notifications, and impact reporting; a data layer for the database, cache, and file storage; and external integrations for SMS, WhatsApp, and maps.",
        // A diagram must be read, not cropped — contain, in a frame close to
        // its own 1.12 ratio so the letterboxing stays minimal.
        fit: "contain",
        aspect: "aspect-[4/3]",
      },
    },
  },
  features: {
    title: "Precision Utilities",
    items: [
      {
        Icon: ShieldCheckIcon,
        title: "Organisation verification",
        description:
          "Admins review registration documents and approve, reject, revoke, or reinstate, no one transacts unverified.",
      },
      {
        Icon: CheckIcon,
        title: "Dual-party pickup confirmation",
        description:
          "Donor and NGO each confirm independently (PIN + condition report); the transfer only completes when both agree.",
      },
      {
        Icon: BellIcon,
        title: "Real-time notifications",
        description:
          "Live in-app alerts via Socket.io, plus email for key events.",
      },
      {
        Icon: LocationIcon,
        title: "Location and distance",
        description:
          "Addresses are geocoded: NGOs see how far each listing is and can view listings on an interactive map.",
      },
      {
        Icon: ChartIcon,
        title: "Impact dashboards",
        description:
          "Real meals-redistributed, waste-prevented, and transfer figures, with CSV/PDF export.",
      },
      {
        Icon: ClipboardIcon,
        title: "Admin governance",
        description:
          "Flag, suspend, revoke, and restore organisations, with a full audit trail and SLA tracking on the verification queue.",
      },
    ],
  },
  challenges: {
    title: "Lessons Learned",
    paragraphs: [
      "The primary technical hurdle was handling edge cases during simultaneous pickups. I initially encountered race conditions where two drivers would attempt to claim the same donation. Solving this required implementing a locking mechanism in MongoDB with optimistic concurrency control.",
      "I also fought 'phantom bugs' related to GPS accuracy in dense urban pockets. I solved this by implementing a fallback system that used manual landmark verification if the geofence wasn't triggered reliably.",
      "On the deployment front, I learned that Rwandese users predominantly use mobile data with high latency. This forced me to ruthlessly optimize my asset delivery pipeline, stripping out heavy libraries in favor of native browser APIs.",
      "Building Sangira taught me that the most elegant code is worthless if it doesn't survive the chaos of real-world logistics. Robustness isn't a feature; it's the foundation.",
    ],
  },
  results: {
    title: "By the Numbers",
    metrics: [
      { value: "3 portals", label: "Donor, NGO, admin — full role-based access" },
      {
        value: "95 / 100 / 96",
        label: "Lighthouse: performance, accessibility, best practices (production)",
      },
      { value: "−82% bundle", label: "1.85 MB → 340 KB via route-level code-splitting" },
    ],
  },
  projectNav: {
    left: {
      caption: "← Back to portfolio",
      label: "All projects",
      href: "/portfolio",
    },
    right: {
      caption: "Next project →",
      label: "Qure",
      href: "/portfolio/qure",
    },
  },
  closingCta: {
    heading: "Have a problem like this one?",
    subline:
      "I help social enterprises and modern startups build robust, real-time digital solutions that scale.",
    buttonLabel: "Book a discovery call",
    buttonHref: "/contact",
  },
};
