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
  lead: string;
  text: string;
}

export interface CaseStudySolution {
  title: string;
  intro: string;
  subBlocks: CaseStudySubBlock[];
  images: { image: CaseStudyImage; label: string }[];
}

export interface CaseStudyBuild {
  title: string;
  paragraphs: string[];
  diagram: { image?: CaseStudyImage; label: string };
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyFeatures {
  title: string;
  items: CaseStudyFeature[];
}

export interface CaseStudyChallenges {
  title: string;
  paragraphs: string[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyResults {
  title: string;
  metrics: CaseStudyMetric[];
  footnote: string;
}

export interface CaseStudyProjectNav {
  prevLabel: string;
  prevHref: string;
  nextLabel: string;
  nextHref: string;
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
