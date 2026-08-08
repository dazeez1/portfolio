import type { ComponentType } from "react";
import {
  ApiIcon,
  CodeIcon,
  type IconProps,
  MonitorIcon,
  WrenchIcon,
} from "../components/icons";

export const meta = {
  title: "Web Development Services & Pricing — Azeez Damilare Gbenga",
  path: "/services",
};

export const hero = {
  eyebrow: "Services",
  headline: "What I can build for you.",
  intro:
    "Clear scope, honest timelines, and software you can maintain after I hand it over. Every engagement starts with a free discovery call.",
};

export interface ServiceCard {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
  youGet: string[];
  builtWith: string;
  timeline: string;
}

export const serviceCardLabels = {
  youGet: "You get",
  builtWith: "Built with",
  timeline: "Typical timeline",
  cta: "Start with a call →",
  ctaHref: "/contact",
};

export const serviceCards: ServiceCard[] = [
  {
    Icon: CodeIcon,
    title: "Full-stack web development",
    description:
      "End-to-end development of complex web applications. From database architecture to intuitive user interfaces.",
    youGet: [
      "Working app, deployed and live",
      "Source code and documentation",
      "Handover walkthrough",
    ],
    builtWith: "React · Node.js · Express · MongoDB",
    timeline: "4–12 weeks, scoped together",
  },
  {
    Icon: ApiIcon,
    title: "Backend and API development",
    description:
      "Robust server-side solutions, RESTful API design, and real-time features integration.",
    youGet: [
      "Documented, tested API",
      "Auth and user roles",
      "Database schema",
    ],
    builtWith: "Node.js · Express · MongoDB · Socket.io",
    timeline: "2–6 weeks",
  },
  {
    Icon: MonitorIcon,
    title: "Frontend development",
    description:
      "Converting designs into pixel-perfect, responsive, and high-performance interfaces with modern frameworks.",
    youGet: [
      "Pixel-accurate build",
      "Responsive on all devices",
      "Accessibility pass",
    ],
    builtWith: "React · TypeScript · Tailwind CSS",
    timeline: "1–4 weeks",
  },
  {
    Icon: WrenchIcon,
    title: "Fixes, maintenance, and improvements",
    description:
      "Optimizing existing codebases, squash persistent bugs, or building new features for production apps.",
    youGet: [
      "Diagnosed and fixed issues",
      "Performance report",
      "Clean, documented commits",
    ],
    builtWith: "Your existing stack, respected",
    timeline: "Days to ongoing",
  },
];

export interface PricingPackage {
  /** Small uppercase tier label above the name. */
  tier: string;
  name: string;
  pricePrefix: string;
  price: string;
  /** Numeric price for JSON-LD Offer markup — must match `price`. */
  priceValue: number;
  description: string;
  /** Muted line under the price. Maintenance is stated here only, never also as a feature bullet. */
  maintenance: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  emphasized?: boolean;
}

export const packagesSection = {
  heading: "Packages and Pricing",
  subline: "Pre-defined scopes for common project types.",
  /** Stated once below the whole grid, not repeated per card. */
  maintenanceClarifier:
    "Ongoing updates, support, and maintenance are available through a monthly maintenance plan after the included period ends.",
};

export const packages: PricingPackage[] = [
  {
    tier: "Starter",
    name: "Starter Website",
    pricePrefix: "Starting from",
    price: "$200",
    priceValue: 200,
    description: "Perfect for a small business site",
    maintenance: "Includes 1 month of post-launch maintenance",
    features: [
      "Up to 5 pages, responsive",
      "Basic SEO optimization",
      "Contact form integration",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact?package=starter-website#get-in-touch",
  },
  {
    tier: "Business",
    name: "Business web app",
    pricePrefix: "Starting from",
    price: "$665",
    priceValue: 550,
    description: "Custom web application with backend",
    maintenance: "Includes 3 months of post-launch maintenance",
    features: [
      "Up to 15 pages, responsive",
      "Advanced SEO optimization",
      "Custom Integration + Database",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact?package=business-web-app#get-in-touch",
    badge: "Most popular",
    emphasized: true,
  },
  {
    tier: "Platform",
    name: "Enterprise System",
    pricePrefix: "Starting from",
    price: "$1,500",
    priceValue: 850,
    description: "Enterprise solution",
    maintenance: "Includes 6 months of post-launch maintenance",
    features: [
      "Unlimited pages",
      "Full SEO optimization",
      "Everything in Business",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact?package=full-platform#get-in-touch",
  },
];

/** true → check, false → cross, string → literal text. */
export type CompareValue = boolean | string;

export interface CompareRow {
  feature: string;
  /** Omitted on group-divider rows, which span the full table width. */
  starter?: CompareValue;
  business?: CompareValue;
  platform?: CompareValue;
  /** Renders as a full-width group divider row instead of a data row. */
  groupLabel?: boolean;
  /** Emphasises the winning cell, per the approved design. */
  emphasize?: "starter" | "business" | "platform";
}

export const compareSection = {
  heading: "Compare Packages",
  featureColumnLabel: "Feature",
  columnLabels: ["Starter", "Business", "Platform"] as const,
  includedLabel: "Included",
  notIncludedLabel: "Not included",
};

export const compareRows: CompareRow[] = [
  {
    feature: "Pages",
    starter: "5 pages",
    business: "15 pages",
    platform: "Unlimited",
    emphasize: "business",
  },
  { feature: "Responsive design", starter: true, business: true, platform: true },
  {
    feature: "Custom integration + database",
    starter: false,
    business: true,
    platform: true,
  },
  { feature: "Contact form", starter: true, business: true, platform: true },
  { feature: "Performance optimization", groupLabel: true },
  {
    feature: "SEO optimization",
    starter: "Basic",
    business: "Advanced",
    platform: "Full",
  },
  {
    feature: "Performance optimization",
    starter: true,
    business: true,
    platform: true,
  },
  { feature: "Analytics setup", starter: false, business: true, platform: true },
  {
    feature: "Post-launch maintenance",
    starter: "1 month",
    business: "3 months",
    platform: "6 months",
    emphasize: "platform",
  },
  { feature: "Documentation", starter: true, business: true, platform: true },
];

export const customBand = {
  title: "Have something that doesn't fit a package?",
  subline: "I handle complex custom requirements and long-term contracts.",
  ctaLabel: "Let's talk",
  ctaHref: "/contact?package=custom#get-in-touch",
};

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSection = {
  heading: "How it works",
  subline: "My process is built for clarity and speed.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery call",
    description:
      "We meet to discuss your goals, target audience, and functional requirements in detail.",
  },
  {
    number: "02",
    title: "Scope & plan",
    description:
      "I provide a detailed technical specification, wireframes, and a firm timeline for delivery.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Development begins. You get regular check-in video updates and access to a staging environment.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Rigorous testing, server deployment, and handover of all assets and documentation.",
  },
];

export const closingCard = {
  title: "Not sure which one you need?",
  subline:
    "Let's hop on a 30-minute call to figure out the right path for your project.",
  ctaLabel: "Book a discovery call",
  loadingLabel: "Opening calendar…",
};