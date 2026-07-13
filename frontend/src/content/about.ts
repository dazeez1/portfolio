import type { ComponentType } from "react";
import {
  ChatIcon,
  type IconProps,
  LightbulbIcon,
  MonitorIcon,
  PencilRulerIcon,
  ServerIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  WrenchIcon,
} from "../components/icons";

export interface IntroContent {
  eyebrow: string;
  headline: string;
  lead: string;
  /**
   * Placeholder paragraphs — owner-supplied bio text has not been provided
   * yet. Replace both with real copy before launch (CLAUDE.md Section 4:
   * never invent or paraphrase copy).
   */
  bioParagraphs: string[];
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; to: string };
  photo: { src: string; alt: string };
}

export const intro: IntroContent = {
  eyebrow: "About me",
  headline: "Hello, I'm Azeez Damilare Gbenga.",
  lead: "I build digital experiences that are as thoughtful under the hood as they are on the surface — I started in design before engineering, so how something looks and how it works have never been separate questions for me.",
  bioParagraphs: [
    "[PLACEHOLDER — owner to replace: first bio paragraph.]",
    "[PLACEHOLDER — owner to replace: second bio paragraph.]",
  ],
  primaryButton: { label: "Download resume", href: "/resume.pdf" },
  secondaryButton: { label: "Get in touch", to: "/contact" },
  photo: { src: "/images/about-photo.jpg", alt: "Azeez Damilare Gbenga" },
};

export interface JourneyEntry {
  title: string;
  context: string;
}

export const journeyTitle = "My journey";

export const journey: JourneyEntry[] = [
  {
    title: "2021 — Graphics design internship · SideHustle / Jobberman",
    context:
      "Where the design instinct started — before writing a line of production code.",
  },
  {
    title: "2023 — Started B.Sc. Software Engineering · ALU, Kigali",
    context: "Moved to Rwanda; formal engineering foundation begins.",
  },
  {
    title: "Full-stack training · Vephla Institute",
    context: "From design and frontend into the full stack.",
  },
  {
    title: "2025 — Flutter and Dart (IBM) · Database Design (DataCamp)",
    context: "Deepening the toolkit beyond the web stack.",
  },
  {
    title: "Aug 2025 — Deep Learning Indaba · University of Rwanda, Kigali",
    context: "A week inside Africa's machine learning community.",
  },
  {
    title: "Built Qure and Sangira",
    context:
      "Two full-stack platforms — hospital queues and verified food redistribution.",
  },
  {
    title: "2026 — Graduating · First Class Honours, CGPA 4.22",
    context: "And looking for the next real problem to solve.",
  },
];

export interface ValueCard {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export const howIWorkTitle = "How I work";

export const howIWork: ValueCard[] = [
  {
    Icon: ChatIcon,
    title: "I speak human, not just code",
    description:
      "Years in customer relations taught me to explain technical things to non-technical people — clients never feel lost in jargon.",
  },
  {
    Icon: PencilRulerIcon,
    title: "Design isn't an afterthought",
    description:
      "I started in graphics design before engineering. If it works but feels clumsy to use, it's not done.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "I verify before I ship",
    description:
      "Every endpoint tested against live data before it's called done — not just when it breaks.",
  },
  {
    Icon: LightbulbIcon,
    title: "I stay curious on purpose",
    description:
      "From ML conferences to new tools like AI-assisted development — I'd rather learn early than catch up late.",
  },
];

export interface SkillCategory {
  Icon: ComponentType<IconProps>;
  title: string;
  skills: string[];
}

export const skillsTitle = "Skills";

export const skills: SkillCategory[] = [
  {
    Icon: MonitorIcon,
    title: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  },
  {
    Icon: ServerIcon,
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Prisma", "Cloudinary"],
  },
  {
    Icon: SmartphoneIcon,
    title: "Mobile and design",
    skills: ["Flutter", "Dart", "Graphics design", "UI design"],
  },
  {
    Icon: WrenchIcon,
    title: "Tools and testing",
    skills: ["Git/GitHub", "Postman", "Jest", "Socket.io"],
  },
];

export interface Certification {
  name: string;
  date: string;
}

export const educationTitle = "Education and certifications";

export const degree = {
  title: "B.Sc. Software Engineering",
  institution: "African Leadership University, Kigali",
  detail: "2023–2026 · First Class Honours · CGPA 4.22",
};

export const certifications: Certification[] = [
  { name: "Full-Stack Development · Vephla Institute", date: "—" },
  { name: "Database Design · DataCamp", date: "Jun 2025" },
  { name: "Flutter and Dart · IBM", date: "Mar 2025" },
  {
    name: "Deep Learning Indaba 2025 · University of Rwanda",
    date: "Aug 2025",
  },
  { name: "Academic Writing · Coursera–OPJGU", date: "Jun 2024" },
];

export interface BeyondTheCodeEntry {
  role: string;
  company: string;
  description: string;
}

export const beyondTheCodeTitle = "Beyond the code";

export const beyondTheCode: BeyondTheCodeEntry[] = [
  {
    role: "Virtual Assistant",
    company: "Healthertainer",
    description:
      "Content, coordination, and working directly with non-technical stakeholders.",
  },
  {
    role: "Customer Relations",
    company: "Datahub Telecom",
    description:
      "Explaining technical concepts to non-technical users, every day.",
  },
];

export interface ClosingCtaContent {
  heading: string;
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; to: string };
}

export const closingCta: ClosingCtaContent = {
  heading: "Want the full picture?",
  primaryButton: { label: "Download resume", href: "/resume.pdf" },
  secondaryButton: { label: "View my work", to: "/portfolio" },
};
