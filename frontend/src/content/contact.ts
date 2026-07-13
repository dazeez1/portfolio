import type { ComponentType } from "react";
import {
  ClockIcon,
  DocumentIcon,
  type IconProps,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../components/icons";

export interface TrustChip {
  Icon: ComponentType<IconProps>;
  label: string;
}

export interface HeaderContent {
  eyebrow: string;
  headline: string;
  subhead: string;
  trustChips: TrustChip[];
}

export const header: HeaderContent = {
  eyebrow: "Contact",
  headline: "Tell me what you're building.",
  subhead:
    "A short message is enough — I'll reply within 24–48 hours and we'll take it from there.",
  trustChips: [
    { Icon: ClockIcon, label: "Replies in 24–48h" },
    { Icon: PhoneIcon, label: "Free discovery call" },
    { Icon: DocumentIcon, label: "Written scope before code" },
  ],
};

export interface ConnectMethod {
  Icon: ComponentType<IconProps>;
  label: string;
  value: string;
  action:
    | { type: "copy" }
    | { type: "link"; label: string; href: string };
}

export const connectTitle = "Other ways to connect";
export const connectSubline = "Choose whatever's most convenient.";

export const connectMethods: ConnectMethod[] = [
  {
    Icon: MailIcon,
    label: "Email",
    value: "azeezdamilare31@gmail.com",
    action: { type: "copy" },
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp · fastest reply",
    value: "+250 798 203 134",
    action: { type: "copy" },
  },
  {
    Icon: LocationIcon,
    label: "Location",
    value: "Kigali, Rwanda",
    action: {
      type: "link",
      label: "Open maps",
      href: "https://www.google.com/maps/search/?api=1&query=Kigali%2C+Rwanda",
    },
  },
];

export const socialLabel = "Find me on social media";

// TODO: real LinkedIn/Instagram profile URLs — see Roadmap.md content gaps.
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/dazeez1" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export const afterYouWrite = {
  title: "What happens after you write",
  // Minimal phrasing of the owner's own three-step description — not
  // expanded into new marketing copy (CLAUDE.md Section 4).
  steps: [
    "Reply within 24–48 hours",
    "Free discovery call",
    "Written scope and price before any code",
  ],
};

export const formHeader = {
  title: "Get in touch",
  subtitle: "Fill this out and I'll get back to you as soon as possible.",
};

export const needOptions = [
  { value: "new-project", label: "New project" },
  { value: "existing-product", label: "Existing product help" },
  { value: "hiring", label: "Hiring or recruiting" },
  { value: "referral", label: "I want to refer someone" },
  { value: "other", label: "Something else" },
];

// Budget brackets are not specified anywhere in CLAUDE.md — derived
// directly from the already-approved package prices (Section 4) rather
// than invented figures. Flagged for owner confirmation.
export const budgetOptions = [
  { value: "starter", label: "Around Starter website ($600)" },
  { value: "business", label: "Around Business web app ($2,000)" },
  { value: "platform", label: "Around Full platform/SaaS ($4,500+)" },
  { value: "not-sure", label: "Not sure yet" },
];

export const messageLabel = "Your message";
export const defaultMessagePlaceholder =
  "Tell me about what you're building.";
// Approved verbatim in CLAUDE.md Section 7.
export const referralMessagePlaceholder =
  "Who are you referring, and what do they need? Include their name and how I can reach them — or just your own details and I'll follow up.";

export const submitLabel = "Send message";
export const submitMicrocopy =
  "Goes straight to my inbox — no bots, no mailing list.";

export const booking = {
  title: "Prefer to talk it through?",
  subline: "Free 30-minute discovery call — no commitment, no prep needed.",
  buttonLabel: "Pick a time",
  // Placeholder until the owner supplies the real scheduling link.
  calendlyUrl: "https://calendly.com/azeezdamilare31/30mins",
};

export const faqSectionLabel = "Before you ask";

const faqPlaceholderAnswer = "[Placeholder — answer copy pending from owner]";

export const faqItems = [
  {
    question: "How much does a project cost?",
    answer: faqPlaceholderAnswer,
  },
  {
    question: "How long does a typical build take?",
    answer: faqPlaceholderAnswer,
  },
  {
    question: "Do I own the finished product?",
    answer: faqPlaceholderAnswer,
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer: faqPlaceholderAnswer,
  },
  {
    question: "Are you available for full-time roles?",
    answer: faqPlaceholderAnswer,
  },
];

// Section 7 URL-param pre-fill.
export const packageLabels: Record<string, string> = {
  "starter-website": "Starter website",
  "business-web-app": "Business web app",
  "full-platform": "Full platform/SaaS",
  "seo-starter": "SEO starter",
  "seo-growth": "SEO growth",
  "seo-ongoing": "SEO ongoing",
};
