import type { ComponentType } from "react";
import type { IconProps } from "../../components/icons";

export interface CaseStudyImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CaseStudyMetaBar {
  role: string;
  timeline: string;
  stack: string;
  codeHref?: string;
  liveHref?: string;
}

export interface CaseStudyHero {
  tags: string[];
  title: string;
  /** Optional descriptor line rendered directly under the serif title. */
  subtitle?: string;
  summary: string;
  /** Optional second summary line, rendered below the main summary paragraph. */
  summaryDetail?: string;
  metaBar: CaseStudyMetaBar;
  screenshot: CaseStudyImage;
}

export interface CaseStudyProblem {
  title: string;
  paragraphs: string[];
}

export interface CaseStudySubBlock {
  Icon: ComponentType<IconProps>;
  lead: string;
  text: string;
}

export interface CaseStudyJourneyStep {
  Icon: ComponentType<IconProps>;
  label: string;
}

export interface CaseStudySolution {
  title: string;
  intro: string;
  /** Optional horizontal step strip (icon chips joined by arrows) rendered above the sub-blocks. */
  journeyFlow?: CaseStudyJourneyStep[];
  subBlocks: CaseStudySubBlock[];
  images: { image: CaseStudyImage; label: string }[];
}

export interface CaseStudyDiagramStep {
  label: string;
  highlighted?: boolean;
}

export interface CaseStudyBuild {
  title: string;
  paragraphs: string[];
  diagram: {
    image?: CaseStudyImage;
    label: string;
    /** Alternative to the image/placeholder box — a light chips-and-arrows chain. */
    chain?: CaseStudyDiagramStep[];
  };
}

export interface CaseStudyFeature {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export interface CaseStudyFeatures {
  title: string;
  items: CaseStudyFeature[];
}

export interface CaseStudyChallengeBlock {
  label: string;
  text: string;
}

export interface CaseStudyChallenges {
  title: string;
  /** Plain paragraphs (Sangira's format). */
  paragraphs?: string[];
  /** Alternative: small uppercase label + paragraph per block (Qure's format). */
  blocks?: CaseStudyChallengeBlock[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  /** Ink/dark fill with light text — for the single highest-value metric in a row. */
  featured?: boolean;
}

export interface CaseStudyResults {
  title: string;
  metrics: CaseStudyMetric[];
  footnote?: string;
}

export interface CaseStudyNavLink {
  /** Small caption above the label, e.g. "← Previous project" or "Back to portfolio →". */
  caption: string;
  label: string;
  href: string;
}

export interface CaseStudyProjectNav {
  left?: CaseStudyNavLink;
  right?: CaseStudyNavLink;
}

export interface CaseStudyClosingCta {
  heading: string;
  subline?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface CaseStudyContent {
  metaTitle: string;
  breadcrumbCurrent: string;
  hero: CaseStudyHero;
  problem: CaseStudyProblem;
  solution: CaseStudySolution;
  build: CaseStudyBuild;
  features: CaseStudyFeatures;
  challenges: CaseStudyChallenges;
  results: CaseStudyResults;
  projectNav: CaseStudyProjectNav;
  closingCta: CaseStudyClosingCta;
}
