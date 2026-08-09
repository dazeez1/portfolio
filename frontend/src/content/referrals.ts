import type { ComponentType } from "react";
import {
  ApiIcon,
  type IconProps,
  InfinityIcon,
  MonitorIcon,
  NetworkIcon,
  ServerIcon,
  UsersIcon,
  WalletIcon,
  ZapIcon,
} from "../components/icons";

export const meta = {
  title:
    "Referral Program — Earn by Referring Clients | Azeez Damilare Gbenga",
  path: "/referrals",
};

export const hero = {
  badge: "Referral program",
  headline: "Earn money by referring clients.",
  subhead:
    "Know someone who needs a website or web app? Connect us, and when the project's completed, you get paid. It's that simple.",
  primaryCta: { label: "Start referring now", to: "/contact?type=referral" },
  secondaryCta: { label: "How it works", to: "#how-it-works" },
};

export interface CommissionTier {
  Icon: ComponentType<IconProps>;
  title: string;
  amount: string;
  /** Muted qualifier after the amount, e.g. "of project value". Omitted for flat fees. */
  amountNote?: string;
  bullets: string[];
}

export const commissionSection = {
  eyebrow: "Commission structure",
  heading: "What you earn",
  subline: "Based on the project your referral turns into.",
};

export const commissionTiers: CommissionTier[] = [
  {
    Icon: MonitorIcon,
    title: "Starter website",
    amount: "$20",
    bullets: ["Portfolio and business sites", "Landing pages"],
  },
  {
    Icon: ApiIcon,
    title: "Business web app",
    amount: "5-10%",
    amountNote: "of project value",
    bullets: ["Web apps with accounts and dashboards", "Business platforms"],
  },
  {
    Icon: ServerIcon,
    title: "Enterprise system",
    amount: "10-15%",
    amountNote: "of project value",
    bullets: ["Multi-role platforms", "Custom and enterprise solutions"],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSection = {
  id: "how-it-works",
  eyebrow: "Simple process",
  heading: "How it works",
  subline: "Simple 4-step process to start earning",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Refer a client",
    description:
      "Know someone who needs a website or app? Share my contact with them.",
  },
  {
    number: "02",
    title: "Client confirms",
    description:
      "When they reach out, they mention your name. I'll confirm the referral with you.",
  },
  {
    number: "03",
    title: "Project completion",
    description:
      "Once the project is delivered and paid, your commission is calculated.",
  },
  {
    number: "04",
    title: "Get paid",
    description:
      "Receive your referral bonus via Mobile Money or bank transfer within 3-5 business days.",
  },
];

export interface Benefit {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export const benefitsSection = {
  eyebrow: "Key benefits",
  heading: "Why refer?",
  subline: "Multiple benefits for being a referral partner",
};

export const benefits: Benefit[] = [
  {
    Icon: WalletIcon,
    title: "Easy money",
    description:
      "Earn without doing any work — just connect people who need services.",
  },
  {
    Icon: InfinityIcon,
    title: "No limits",
    description: "Refer as many clients as you want — every one counts.",
  },
  {
    Icon: NetworkIcon,
    title: "Build network",
    description:
      "Help your friends and business contacts get quality services.",
  },
  {
    Icon: ZapIcon,
    title: "Fast payout",
    description:
      "Quick and reliable payment once the project is completed.",
  },
];

export const ctaBand = {
  title: "Ready to start earning?",
  subline: "Turn your network into income, one introduction at a time.",
  primaryCta: { label: "Contact me to refer", to: "/contact?type=referral" },
  secondaryCta: { label: "View pricing", to: "/services#pricing" },
};

export const faqSection = {
  heading: "Frequently asked questions",
};

export const faqItems = [
  {
    question: "When do I get paid?",
    answer:
      "You receive your commission within 3-5 business days after the client's project is completed and payment is received.",
  },
  {
    question: "Is there a limit to how many people I can refer?",
    answer:
      "There's no cap. Refer as many people as you like — each completed project earns its own commission.",
  },
  {
    question: "What if the client doesn't mention my name?",
    answer:
      "I always ask new clients how they found me. However, to be safe, you can send me a quick email when you refer someone so I can mark it in my records.",
  },
  {
    question: "How do I track my referrals?",
    answer:
      "I'll keep you updated on the status of your referrals and notify you when payments are ready.",
  },
];

/** Icon for the hero pill — separate from the card icons so nothing repeats. */
export const heroBadgeIcon = UsersIcon;