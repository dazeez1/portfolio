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
  eyebrow: "Contact - GET IN TOUCH",
  headline: "Tell me what you're building.",
  subhead:
    "Have a project in mind? Want to collaborate? Or just want to say hello? I'm here to help turn your ideas into reality.",
  trustChips: [
    { Icon: ClockIcon, label: "Fast Response Time" },
    { Icon: PhoneIcon, label: "Free discovery call" },
    { Icon: DocumentIcon, label: "Flexible schedules" },
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
    value: "+234 701 505 9880",
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
    "Acknowledgement & simple vetting of requirements.",
    "Introductory call to align on technical goals and budget.",
    "Detailed proposal with timeline, stack, and deliverables.",
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

export const namePlaceholder = "Full Name";
export const emailPlaceholder = "your@email.com";

export const messageLabel = "Your message";
export const defaultMessagePlaceholder =
  "Describe your project, goals, and any specific question, or just say hello...";
// Approved verbatim in CLAUDE.md Section 7.
export const referralMessagePlaceholder =
  "Who are you referring, and what do they need? Include their name and how I can reach them — or just your own details and I'll follow up.";

export const submitLabel = "Send message";
export const submitMicrocopy =
  "By clicking send, you agree to my basic processing of your contact info. No spam, ever.";
export const submitFailureMessage =
  "Something went wrong sending your message. Email me directly at azeezdamilare31@gmail.com";

export const booking = {
  title: "Prefer to talk it through?",
  subline: "Free 30-minute discovery call - no commitment, no prep needed.",
  buttonLabel: "Pick a time",
  // Placeholder until the owner supplies the real scheduling link.
  calendlyUrl: "https://calendly.com/azeezdamilare31/30min",
};

export const faqSectionLabel = "Before you ask";

// $200 here does not match CLAUDE.md Section 4's approved "Starter
// website $600" — flagged for owner confirmation, not silently changed.
export const faqItems = [
  {
    question: "How much does a project cost?",
    answer:
      "Projects are priced based on scope and complexity. Starter sites begin at $200, while complex web applications are custom-quoted after our discovery call.",
  },
  {
    question: "How long does a typical build take?",
    answer:
      "A standard landing page takes 1-2 weeks. Full-stack applications typically range from 4 to 12 weeks depending on the feature set.",
  },
  {
    question: "Do I own the finished product?",
    answer:
      "Yes. Once the final payment is made, you own the full source code and intellectual property for your project.",
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer:
      "Absolutely. I often collaborate with existing engineering teams to build new features, fix legacy bugs, or improve performance.",
  },
  {
    question: "Are you available for full-time roles?",
    answer:
      "I primarily work on a contract/project basis, but I'm always open to discussing long-term partnerships or lead roles for the right mission.",
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
