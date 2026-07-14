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
  lead: "I'm a full-stack software engineer based in Kigali, Rwanda, dedicated to building digital products that solve real-world problems. My approach combines technical precision with a deep understanding of user needs, ensuring that every line of code serves a purpose beyond just functionality.",
  bioParagraphs: [
    "Passionate about creating beautiful, functional digital experiences. I combine technical expertise with creative vision to bring ideas to life.",
  ],
  primaryButton: { label: "Download resume", href: "/resume.pdf" },
  secondaryButton: { label: "Get in touch", to: "/contact" },
  photo: { src: "/images/about-photo.jpg", alt: "Azeez Damilare Gbenga" },
};

export interface JourneyEntry {
  /** "—" where the date isn't confirmed yet (see Roadmap.md content gaps). */
  year: string;
  title: string;
  context: string;
}

export const journeyTitle = "My journey";

export const journey: JourneyEntry[] = [
  {
    year: "2021",
    title: "Graphics design internship · SideHustle / Jobberman",
    context:
      "Started my creative journey focusing on visual communication and digital aesthetics.",
  },
  {
    year: "2022",
    title: "Web Foundations",
    context:
      "Transitioned into web technologies, mastering HTML, CSS, and basic JavaScript.",
  },
  {
    year: "2023",
    title: "Full-stack training · Vephla Institute",
    context: "From design and frontend into the full stack.",
  },
  {
    year: "Aug 2025",
    title: "Deep Learning Indaba · University of Rwanda, Kigali",
    context: "A week inside Africa's machine learning community.",
  },
  {
    year: "2026",
    title: "Built Qure and Sangira",
    context:
      "Two full-stack platforms - hospital queues and verified food redistribution.",
  },
  {
    year: "2026",
    title: "Graduating at ALU · First Class Honours, CGPA 4.22",
    context: "Completing formal studies while actively contributing to the tech ecosystem.",
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
    title: "I speak human.",
    description:
      "Years in customer relations taught me to explain technical things to non-technical people, clients never feel lost in jargon.",
  },
  {
    Icon: PencilRulerIcon,
    title: "Design isn't an afterthought",
    description:
      "Aesthetics and usability are baked into the architecture from the very first line of code.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "I verify before I ship",
    description:
      "Automated testing and manual QA are integral parts of my development lifecycle.",
  },
  {
    Icon: LightbulbIcon,
    title: "I stay curious.",
    description:
      "Technology moves fast; I spend time each week researching and testing new frameworks.",
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
    skills: ["Flutter", "Figma", "Graphics design", "UI design"],
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
  title: "B.Sc. in Software Engineering",
  institution: "African Leadership University (ALU)",
  detail: "2023–2026 · First Class Honours · CGPA 4.22",
  description:
    "Specializing in full-stack architecture and scalable systems design in an entrepreneurial context."
};

export const certifications: Certification[] = [
  { name: "Full-Stack Development · Vephla Institute", date: "2024" },
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
      "Streamlining operations and digital communication for health-focused entertainment platforms, managing high-volume engagement.",
  },
  {
    role: "Customer Relations",
    company: "Datahub Telecom",
    description:
      "Bridging the gap between technical data solutions and client needs, fostering long-term professional relationships.",
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
