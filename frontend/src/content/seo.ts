import type { ComponentType } from "react";
import {
  ChartIcon,
  DocumentIcon,
  GearIcon,
  type IconProps,
  LocationIcon,
  SearchIcon,
  TrendIcon,
} from "../components/icons";

export const meta = {
  title: "SEO Services & Pricing — Azeez Damilare Gbenga",
  path: "/seo",
};

export const hero = {
  badge: "SEO services",
  headline: "Get found on Google.",
  subhead:
    "Technical SEO from someone who builds websites for a living, not just audits, but the fixes implemented in the code itself.",
  primaryCta: { label: "Get a free SEO check", to: "/contact?package=seo-starter#get-in-touch" },
  secondaryCta: { label: "View pricing", to: "#pricing" },
};

export interface ServiceOffering {
  Icon: ComponentType<IconProps>;
  title: string;
  bullets: string[];
}

export const offerSection = {
  heading: "What I offer",
  subline: "Comprehensive SEO solutions tailored to your business needs.",
};

export const offerings: ServiceOffering[] = [
  {
    Icon: ChartIcon,
    title: "SEO audit & analysis",
    bullets: [
      "Technical SEO analysis",
      "Keyword research and mapping",
      "Competitor snapshot",
    ],
  },
  {
    Icon: DocumentIcon,
    title: "On-page optimization",
    bullets: [
      "Meta tags and content optimization",
      "URL and internal linking",
      "Image optimization",
    ],
  },
  {
    Icon: GearIcon,
    title: "Technical SEO",
    bullets: [
      "Site speed & Core Web Vitals",
      "Schema markup implementation",
      "XML sitemap & robots.txt",
    ],
  },
  {
    Icon: SearchIcon,
    title: "Google Search indexing",
    bullets: [
      "Google Search Console setup",
      "Sitemap submission",
      "Crawl error resolution",
    ],
  },
  {
    Icon: TrendIcon,
    title: "Analytics and reporting",
    bullets: [
      "Google Analytics setup",
      "Performance dashboards",
      "Monthly reporting",
    ],
  },
  {
    Icon: LocationIcon,
    title: "Local SEO",
    bullets: [
      "Google My Business optimization",
      "Local keyword targeting",
      "Review management",
    ],
  },
];

export interface ProofItem {
  title: string;
  caption: string;
  /**
   * Real screenshots supplied by the owner. Neither file exists yet, so
   * BrowserFrame renders its neutral empty state — no stand-in imagery is
   * generated or sourced (CLAUDE.md Section 3: real screenshots only).
   */
  screenshot: { src: string; alt: string };
  body: string;
}

export const proofSection = {
  heading: "Real results from live projects",
};

export const proofItems: ProofItem[] = [
  {
    title: "Google Search Indexing",
    caption: "Search Console coverage report",
    screenshot: {
      src: "/images/seo-search-console.png",
      alt: "Google Search Console coverage report for a client website",
    },
    body: "Client website successfully indexed with all pages showing valid status in Google Search Console.",
  },
  {
    title: "Vercel Analytics",
    caption: "Real-time traffic insights",
    screenshot: {
      src: "/images/seo-analytics.png",
      alt: "Vercel Analytics dashboard showing client website traffic",
    },
    body: "Client website traffic and performance metrics tracked through Vercel Analytics dashboard.",
  },
];

export interface SeoPlan {
  tier: string;
  description: string;
  price: string;
  /** Numeric price for JSON-LD Offer markup — must match `price`. */
  priceValue: number;
  priceSuffix: string;
  /** Muted line under the price. Maintenance is stated here only, never also as a feature bullet. */
  maintenance: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  emphasized?: boolean;
}

export const pricingSection = {
  heading: "Simple, transparent pricing",
  /** Stated once below the whole grid, not repeated per card. */
  maintenanceClarifier:
    "Ongoing updates, support, and maintenance are available through a monthly maintenance plan after the included period ends.",
};

export const plans: SeoPlan[] = [
  {
    tier: "Starter",
    description: "Perfect for new websites needing basic SEO setup",
    price: "$85",
    priceValue: 85,
    priceSuffix: "one-time",
    maintenance: "Includes 1 week of post-launch maintenance",
    features: [
      "Basic SEO audit",
      "Google Search Console setup",
      "Sitemap creation & submission",
      "Basic meta tags optimization",
    ],
    ctaLabel: "Get started",
    ctaHref: "/contact?package=seo-starter#get-in-touch",
  },
  {
    tier: "Growth",
    description: "Comprehensive SEO for growing businesses",
    price: "$250",
    priceValue: 250,
    priceSuffix: "one-time",
    maintenance: "Includes 1 month of post-launch maintenance",
    features: [
      "Full SEO audit & strategy",
      "On-page optimization (10 pages)",
      "Technical SEO fixes",
      "Analytics setup (GA + Vercel)",
      "Keyword research & mapping",
    ],
    ctaLabel: "Get started",
    ctaHref: "/contact?package=seo-growth#get-in-touch",
    badge: "Most popular",
    emphasized: true,
  },
  {
    tier: "Premium",
    description: "Enterprise-level SEO for maximum visibility",
    price: "$500",
    priceValue: 500,
    priceSuffix: "one-time",
    maintenance: "Includes 3 months of post-launch maintenance & monitoring",
    features: [
      "Everything in Growth",
      "Unlimited page optimization",
      "Local SEO setup",
      "Schema markup implementation",
      "Competitor analysis",
    ],
    ctaLabel: "Get started",
    ctaHref: "/contact?package=seo-premium#get-in-touch",
  },
];

export const ctaBand = {
  title: "Ready to rank higher?",
  subline:
    "Let's discuss your SEO needs and create a strategy that drives real results.",
  primaryCta: { label: "Get a free SEO check", to: "/contact?package=seo-starter#get-in-touch" },
  secondaryCta: { label: "View all services", to: "/services" },
};

export const faqSection = {
  heading: "Frequently asked questions",
};

export const faqItems = [
  {
    question: "How long does it take to see SEO results?",
    answer:
      "SEO is a long-term investment. While some technical improvements show results within weeks, significant ranking improvements typically take 3-6 months depending on competition and industry.",
  },
  {
    question: "Do you guarantee first page rankings?",
    answer:
      "No ethical SEO professional can guarantee specific rankings as Google's algorithm is constantly evolving. However, I follow best practices that consistently improve visibility and traffic.",
  },
  {
    question: "What's included in a technical SEO audit?",
    answer:
      "The audit covers technical SEO, on-page factors, content quality, backlink profile, competitor analysis, and keyword opportunities. You'll receive a detailed report with actionable recommendations.",
  },
  {
    question: "Do you offer ongoing SEO maintenance?",
    answer:
      "Yes. After the initial optimization, I offer monthly maintenance packages to monitor performance, fix issues, and continuously improve your rankings. Contact me for custom pricing.",
  },
];