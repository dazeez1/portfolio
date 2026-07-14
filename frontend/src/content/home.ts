import type { ComponentType } from "react";
import {
  ApiIcon,
  CodeIcon,
  type IconProps,
  LightbulbIcon,
} from "../components/icons";
import type { BrowserFrameImage } from "../components/BrowserFrame";

export interface AccentHeadline {
  before: string;
  accent: string;
  after: string;
}

export interface HeroContent {
  badgeText: string;
  headline: AccentHeadline;
  subhead: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  credentialLine: string;
  screenshotUrl: string;
  screenshot: BrowserFrameImage;
  liveBadgeLabel: string;
  liveCaption: string;
}

export const hero: HeroContent = {
  badgeText: "Open to new projects",
  headline: {
    before: "I build software that ",
    accent: "works",
    after: " as well as it looks.",
  },
  subhead:
    "Full-stack engineer. I care about the same things on every project, does it hold up under real conditions, and do people actually want to use it.",
  primaryCta: { label: "View my work", to: "/portfolio" },
  secondaryCta: { label: "Book a discovery call", to: "/contact" },
  credentialLine:
    "B.Sc. Software Engineering, First Class Honours · ALU certified by IBM & DataCamp",
  
  screenshotUrl: "gusangira.com",
  screenshot: {
    src: "/images/sangira-card.png",
    alt: "Sangira dashboard showing active food donation listings",
    width: 1200,
    height: 750,
    loading: "eager",
  },
  liveBadgeLabel: "Live in production",
  liveCaption: "Sangira food redistribution platform",
};

export interface ServiceItem {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    Icon: CodeIcon,
    title: "Full-stack development",
    description:
      "End-to-end web applications built with modern frameworks like React, Node.js, and robust backends.",
  },
  {
    Icon: ApiIcon,
    title: "API & Backend systems",
    description:
      "Scalable, secure, and well-documented REST APIs that power complex digital ecosystems.",
  },
  {
    Icon: LightbulbIcon,
    title: "Technical consulting",
    description:
      "Strategic advice on architecture, stack selection, and optimizing development workflows.",
  },
];

export const servicesLinkHref = "/services";

export const tools: string[] = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Prisma",
  "Socket.io",
  "Tailwind CSS",
  "Figma",
];

export interface FinalCtaContent {
  headline: AccentHeadline;
  subline: string;
  button: { label: string; to: string };
  referralLead: string;
  referralLinkLabel: string;
  referralHref: string;
}

export const finalCta: FinalCtaContent = {
  headline: {
    before: "Let's build something that ",
    accent: "solves",
    after: " a real problem.",
  },
  subline:
    "Looking to transform your vision into a real-world product? I thrive at crafting intuitive and attractive interfaces that tackle complex challenges.",
  button: { label: "Book a discovery call", to: "/contact" },
  referralLead: "Know someone who needs a developer?",
  referralLinkLabel: "Refer them and earn →",
  referralHref: "/referrals",
};
