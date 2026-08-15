import { caseStudySlugs } from "./caseStudies";

export interface SiteRoute {
  /** Path under the site root, no trailing slash (except "/"). */
  path: string;
  /**
   * Whether the URL belongs in sitemap.xml.
   *
   * false means the page carries `noindex` or is not a search destination.
   * A sitemap that lists a noindexed URL sends search engines two contradictory
   * instructions, so the two must agree — see the note on each entry below.
   */
  indexable: boolean;
}

/**
 * THE route list. Both the prerender config and the sitemap generator read it,
 * so they cannot drift: a route added here is prerendered and, if indexable,
 * appears in the sitemap automatically.
 *
 * Case-study paths are derived from the content registry, so a third case study
 * needs a content file and a registry line and nothing here.
 */
export const siteRoutes: SiteRoute[] = [
  { path: "/", indexable: true },
  { path: "/about", indexable: true },
  { path: "/portfolio", indexable: true },
  ...caseStudySlugs.map((slug) => ({
    path: `/portfolio/${slug}`,
    indexable: true,
  })),
  { path: "/services", indexable: true },
  { path: "/seo", indexable: true },
  { path: "/referrals", indexable: true },
  { path: "/contact", indexable: true },

  // noindex, follow — legal pages should not compete with real content.
  { path: "/privacy", indexable: false },
  { path: "/terms", indexable: false },
  // noindex, follow — a post-submission receipt is not a search destination.
  { path: "/thank-you", indexable: false },
  // Internal component gallery, due for removal in Phase 3.
  { path: "/dev/components", indexable: false },
];

/** Everything to prerender. The 404 is added separately in the router config. */
export const prerenderPaths: string[] = siteRoutes.map((route) => route.path);

/** The subset that belongs in sitemap.xml. */
export const indexablePaths: string[] = siteRoutes
  .filter((route) => route.indexable)
  .map((route) => route.path);