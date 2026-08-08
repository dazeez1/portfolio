import {
  BellIcon,
  CalendarIcon,
  ChartIcon,
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardIcon,
  ClockIcon,
  DocumentIcon,
} from "../../components/icons";
import { projects } from "../projects";
import type { CaseStudyContent } from "./types";

const qureProject = projects.find((p) => p.slug === "qure")!;

export const qure: CaseStudyContent = {
  metaTitle: "Qure case study — Azeez Damilare Gbenga",
  breadcrumbCurrent: "Qure",
  hero: {
    tags: ["Healthcare", "SaaS platform", "Full-stack", "Final year project"],
    title: "Qure",
    subtitle: "Smart hospital queue & patient flow management platform",
    summary:
      "A multi-hospital queue and patient flow management platform that helps hospitals reduce waiting times, improve operational visibility, and streamline the entire outpatient journey — from appointment booking to consultation.",
    metaBar: {
      role: "Full-stack, end to end",
      timeline: "6+ months, 2026",
      stack: "Node.js · Express · Prisma · MongoDB",
      codeHref: qureProject.links.github,
      // Live link stays hidden until the owner supplies the URL.
      liveHref: undefined,
    },
    screenshot: qureProject.screenshot,
  },
  problem: {
    title: "Fragmented Systems & Long Wait Times",
    paragraphs: [
      "Many healthcare facilities still rely on manual tracking or isolated software that doesn't communicate. This leads to opaque queue lengths, overcrowded waiting areas, and a poor patient experience. Patients often face hours of unpredictable waiting without real-time updates, while hospital management lacks the data to optimize staff allocation.",
    ],
  },
  solution: {
    title: "Centralizing the Outpatient Experience",
    intro:
      "Qure creates a unified ecosystem where every step of the journey is tracked and optimized. From the moment a patient books an appointment to their final consultation, the system ensures transparency for both patients and healthcare providers.",
    journeyFlow: [
      { Icon: CalendarIcon, label: "Appointment" },
      { Icon: CheckIcon, label: "Check-in" },
      { Icon: ClockIcon, label: "Waiting area" },
      { Icon: DocumentIcon, label: "Doctor queue" },
      { Icon: ChatIcon, label: "Consultation" },
      { Icon: CheckCircleIcon, label: "Completed" },
    ],
    subBlocks: [
      {
        Icon: ClipboardIcon,
        lead: "Smart queue management",
        text: "Automated sorting based on priority, appointment type, and real-time doctor availability.",
      },
      {
        Icon: ClockIcon,
        lead: "Waiting area management",
        text: "Real-time occupancy tracking to prevent overcrowding and manage seat allocation effectively.",
      },
      {
        Icon: BellIcon,
        lead: "Hospital-wide announcements",
        text: "Centralized digital signage control for paging patients and broadcasting urgent updates.",
      },
    ],
    images: [
      {
        image: {
          src: "/images/qure-patient-queue-dashboard.png",
          alt: "Qure patient queue dashboard screenshot",
        },
        label: "Patient queue dashboard",
      },
      {
        image: {
          src: "/images/qure-waiting-room-management.png",
          alt: "Qure waiting room management screenshot",
        },
        label: "Waiting room management",
      },
    ],
  },
  build: {
    title: "Architecture and Technical Depth",
    paragraphs: [
      "The platform is built on a robust Node.js foundation, utilizing Express for a RESTful API architecture. Security is handled via JWT authentication with hierarchical role-based access control. Data integrity is maintained through Prisma ORM, ensuring consistent schemas across MongoDB.",
    ],
    diagram: {
      label: "Architecture diagram",
      chain: [
        { label: "Frontend" },
        { label: "REST API" },
        { label: "Express Controllers" },
        { label: "Business Services", highlighted: true },
        { label: "Prisma ORM" },
        { label: "MongoDB" },
      ],
    },
  },
  features: {
    title: "Precision at Every Step",
    items: [
      {
        Icon: CalendarIcon,
        title: "Appointment management",
        description:
          "Full CRUD for patient appointments with conflict detection and automated rescheduling logic.",
      },
      {
        Icon: ClipboardIcon,
        title: "Queue management",
        description:
          "Dynamic token generation and real-time status updates for outpatient flow control.",
      },
      {
        Icon: ClockIcon,
        title: "Waiting area management",
        description:
          "Intelligent seat assignment and occupancy monitoring to maintain safety protocols.",
      },
      {
        Icon: ChartIcon,
        title: "Analytics and reporting",
        description:
          "Operational dashboards visualizing peak hours, average wait times, and staff efficiency.",
      },
      {
        Icon: BellIcon,
        title: "Announcements",
        description:
          "Automated voice and visual cues to notify patients when their consultation is ready.",
      },
      {
        Icon: DocumentIcon,
        title: "Patient management",
        description:
          "Centralized patient profiles with historical visit logs and upcoming schedule integration.",
      },
    ],
  },
  challenges: {
    title: "Complexity in Real-time Systems",
    blocks: [
      {
        label: "Synchronization",
        text: "Managing state across multiple client instances (Doctors, Staff, and Public Displays) required a robust event-driven approach to ensure token numbers never desynced.",
      },
      {
        label: "Occupancy calculation",
        text: "Developing algorithms to predict and calculate actual occupancy in real-time, considering 'no-shows' and varying consultation lengths.",
      },
      {
        label: "Multi-tenancy",
        text: "Structuring the database and API to support multiple separate hospital entities on a single instance while guaranteeing total data isolation.",
      },
    ],
  },
  results: {
    title: "System Impact",
    metrics: [
      { value: "20+", label: "REST endpoints", featured: true },
      { value: "4", label: "User roles" },
      { value: "Live", label: "Real-time analytics" },
    ],
    footnote:
      "Backend validation covers hospital ownership, queue integrity, waiting area capacity, appointment lifecycle, doctor assignment, and duplicate prevention.",
  },
  projectNav: {
    left: {
      caption: "← Previous project",
      label: "Sangira",
      href: "/portfolio/sangira",
    },
    right: {
      caption: "Back to portfolio →",
      label: "All projects",
      href: "/portfolio",
    },
  },
  closingCta: {
    heading: "Have a problem like this one?",
    subline:
      "We help social enterprises and modern startups build robust, real-time digital solutions that scale.",
    buttonLabel: "Book a discovery call",
    buttonHref: "/contact",
  },
};
