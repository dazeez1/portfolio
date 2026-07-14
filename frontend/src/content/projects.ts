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
  screenshot: { src: string; alt: string; width?: number; height?: number };
  links: ProjectLinks;
  featured: boolean;
  clientWork: boolean;
}

export const projects: Project[] = [
  {
    slug: "sangira",
    title: "Sangira",
    oneLiner: "Verified surplus-food handoffs between donors and NGOs in Kigali.",
    tags: ["Social impact"],
    stack: ["Node.js", "React", "Socket.io", "MongoDB"],
    screenshot: {
      src: "/images/sangira-card.png",
      alt: "Sangira dashboard showing active food donation listings",
      width: 1200,
      height: 750,
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
      src: "/images/qure-card.png",
      alt: "Qure staff dashboard screenshot",
      width: 1200,
      height: 750,
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
    slug: "placeholder-project-1",
    title: "PLACEHOLDER — Project 1",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["SaaS"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-1.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: { caseStudy: "/portfolio/placeholder-project-1", github: "#" },
    featured: false,
    clientWork: false,
  },
  {
    slug: "placeholder-project-2",
    title: "PLACEHOLDER — Project 2",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["SaaS"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-2.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: { caseStudy: "/portfolio/placeholder-project-2", live: "#" },
    featured: false,
    clientWork: true,
  },
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
    links: { caseStudy: "/portfolio/placeholder-project-3", github: "#" },
    featured: false,
    clientWork: false,
  },
  {
    slug: "placeholder-project-4",
    title: "PLACEHOLDER — Project 4",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["Healthcare"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-4.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: { caseStudy: "/portfolio/placeholder-project-4", live: "#" },
    featured: false,
    clientWork: true,
  },
  {
    slug: "placeholder-project-5",
    title: "PLACEHOLDER — Project 5",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["Social impact"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-5.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: { caseStudy: "/portfolio/placeholder-project-5", github: "#" },
    featured: false,
    clientWork: false,
  },
  {
    slug: "placeholder-project-6",
    title: "PLACEHOLDER — Project 6",
    oneLiner: "Owner to replace with a real repo — placeholder content, not shipped copy.",
    tags: ["Social impact"],
    stack: [],
    screenshot: {
      src: "/images/placeholder-project-6.png",
      alt: "PLACEHOLDER — screenshot to replace",
    },
    links: { caseStudy: "/portfolio/placeholder-project-6", live: "#" },
    featured: false,
    clientWork: true,
  },
];
