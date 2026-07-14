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
  metaBar: CaseStudyMetaBar;
  screenshot: CaseStudyImage;
}

export interface CaseStudyProblem {
  paragraphs: string[];
}

export interface CaseStudySubBlock {
  lead: string;
  text: string;
}

export interface CaseStudySolution {
  intro: string;
  subBlocks: CaseStudySubBlock[];
  images: { image: CaseStudyImage; label: string }[];
}

export interface CaseStudyBuild {
  paragraphs: string[];
  diagram: { image?: CaseStudyImage; label: string };
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyChallenges {
  paragraphs: string[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyResults {
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
  features: CaseStudyFeature[];
  challenges: CaseStudyChallenges;
  results: CaseStudyResults;
  projectNav: CaseStudyProjectNav;
  closingCta: CaseStudyClosingCta;
}
