import { qure } from "./qure";
import { sangira } from "./sangira";
import type { CaseStudyContent } from "./types";

/**
 * The case-study registry: slug → content. The slug is the URL segment under
 * /portfolio/, and it matches the `slug` on the matching entry in
 * content/projects.ts.
 *
 * Adding a third case study means adding its content file and one line here.
 * No new page component and no new route — /portfolio/:slug looks it up, and
 * the prerender step reads `caseStudySlugs` (below) to decide what to emit.
 *
 * Order matters: `caseStudySlugs` preserves it, so it should stay in the same
 * order the featured cards appear in.
 */
export const caseStudies: Record<string, CaseStudyContent> = {
  sangira,
  qure,
};

/**
 * Every case-study slug, for build-time enumeration.
 *
 * This is the export a prerender config consumes — it is a plain string array
 * with no React or DOM dependency, so it can be imported from a Node-side
 * config without pulling in components.
 */
export const caseStudySlugs: string[] = Object.keys(caseStudies);

/** Content for a slug, or `undefined` when the slug is not a case study. */
export function getCaseStudy(
  slug: string | undefined,
): CaseStudyContent | undefined {
  return slug ? caseStudies[slug] : undefined;
}