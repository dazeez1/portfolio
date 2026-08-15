import type { ComponentType } from "react";
import {
  ExpressIcon,
  type IconProps,
  MongoDBIcon,
  NodeIcon,
  PrismaIcon,
  ReactIcon,
  SocketIOIcon,
} from "../components/icons";

export const header = {
  eyebrow: "Selected work",
  headline: "Projects built for real users, real constraints.",
  subhead:
    "Each case study covers the problem, what I built, how it's architected, and what I learned.",
};

/** Filter pill labels. "Client work" filters on the `clientWork` flag; every other label filters on `tags`. */
export const filterOptions = [
  "All",
  "Healthcare",
  "Social impact",
  "SaaS",
  "Client work",
] as const;

export const featuredSectionLabel = "Featured case studies";
export const moreProjectsSectionLabel = "More projects";
export const perPage = 6;

export const githubNote = {
  lead: "Curious how I write code?",
  href: "https://github.com/dazeez1",
  label: "github.com/dazeez1",
};

/** Maps stack names (used in Project.stack) to their icon, for the featured cards' tech byline. */
export const stackIcons: Record<string, ComponentType<IconProps>> = {
  "Node.js": NodeIcon,
  React: ReactIcon,
  "Socket.io": SocketIOIcon,
  Express: ExpressIcon,
  Prisma: PrismaIcon,
  MongoDB: MongoDBIcon,
};

export interface ProjectLinks {
  caseStudy?: string;
  github?: string;
  live?: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  tags: string[];
  /** Names looked up in stackIcons — only rendered on featured cards. */
  stack: string[];
  /*
   * Declared inline rather than imported from BrowserFrame, deliberately.
   * vite.config.ts reads siteRoutes -> caseStudies -> this file, so projects.ts
   * is compiled under tsconfig.node.json, which has no DOM lib. Importing a
   * component's types here pulls .tsx and DOM globals into that project and
   * breaks typecheck. Content files must not import from components/.
   *
   * Structurally assignable to BrowserFrameImage, which is what consumes it.
   */
  screenshot: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    /** Width-descriptor candidates; generate the files with `npm run images`. */
    srcSet?: string;
    /** Rendered width per breakpoint — required for srcSet to pick sensibly. */
    sizes?: string;
  };
  links: ProjectLinks;
  featured: boolean;
  clientWork: boolean;
  /** True for the seed placeholder entries — styles the one-liner as a quiet annotation instead of body copy. */
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    slug: "sangira",
    title: "Sangira",
    oneLiner:
      "Verified surplus-food handoffs between donors and NGOs in Kigali.",
    tags: ["Social impact", "Real-time"],
    stack: ["Node.js", "React", "Socket.io", "MongoDB"],
    screenshot: {
      src: "/images/sangira-card.webp",
      srcSet:
        "/images/sangira-card-400.webp 400w, /images/sangira-card-700.webp 700w, /images/sangira-card-1050.webp 1050w, /images/sangira-card.webp 1400w",
      sizes:
        "(min-width: 1200px) 560px, (min-width: 768px) 45vw, calc(100vw - 3rem)",
      alt: "Sangira dashboard showing active food donation listings",
      width: 1400,
      height: 730,
    },
    links: {
      caseStudy: "/portfolio/sangira",
      github: "https://github.com/dazeez1/Sangira",
      // Placeholder until the owner confirms the exact URL string.
      live: "https://gusangira.com",
    },
    featured: true,
    clientWork: false,
  },
  {
    slug: "qure",
    title: "Qure",
    oneLiner: "Multi-hospital queue and patient flow management platform.",
    tags: ["Healthcare", "SaaS"],
    stack: ["Node.js", "Express", "Prisma", "MongoDB"],
    screenshot: {
      src: "/images/qure-patient-portal.webp",
      srcSet:
        "/images/qure-patient-portal-400.webp 400w, /images/qure-patient-portal-700.webp 700w, /images/qure-patient-portal-1050.webp 1050w, /images/qure-patient-portal.webp 1400w",
      sizes:
        "(min-width: 1200px) 560px, (min-width: 768px) 45vw, calc(100vw - 3rem)",
      alt: "Qure patient portal showing a live queue position with estimated wait time and upcoming appointments",
      width: 1400,
      height: 779,
    },
    links: {
      caseStudy: "/portfolio/qure",
      github: "https://github.com/dazeez1/Qure",
      live: "https://qurequeue.com",
    },
    featured: true,
    clientWork: false,
  },
  {
    slug: "hura",
    title: "Hura",
    oneLiner: "Hura - AI Travel Companion for Rwanda.",
    tags: ["Tourism"],
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
    screenshot: {
      src: "/images/hura.webp",
      alt: "Hura AI travel companion chat interface answering a question about Rwanda",
      width: 1400,
      height: 809,
    },
    links: {
      live: "https://hura.vercel.app/index.html",
    },
    featured: false,
    clientWork: true,
  },
  {
    slug: "zidify",
    title: "Zidify",
    oneLiner:
      "Zidify helps individuals and groups save money securely and reach their financial goals faster.",
    tags: ["Social impact", "Fintech"],
    stack: ["HTML", "CSS", "JavaScript"],
    screenshot: {
      src: "/images/zidify.webp",
      alt: "Zidify savings dashboard showing group and individual savings goals",
      width: 1400,
      height: 804,
    },
    links: {
      live: "https://www.zidify.com/",
    },
    featured: false,
    clientWork: true,
  },
  /*
    Seed placeholder entries — commented out, not deleted, so the shape is on
    hand when a real project is ready. To add one: uncomment a block, replace
    every field with real values, drop a screenshot in public/images (webp,
    ~1400px wide), and remove the `placeholder` flag so its links render.

  {
    slug: "placeholder-project-3",
    title: "PLACEHOLDER — Project 3",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["Healthcare"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-3.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: {},
    featured: false,
    clientWork: false,
    placeholder: true,
  },
  */
];
