/**
 * Site-wide SEO constants. CLAUDE.md Section 13's SEO block requires a
 * canonical URL and OG/Twitter tags on every page, so the base URL and
 * default social image live here rather than being repeated per page.
 */

/**
 * Production origin — the domain in CLAUDE.md Section 11 and the Plausible
 * data-domain. Canonical URLs must point at production even while the site
 * is only reachable on Vercel preview URLs, so search engines never index a
 * preview host.
 */
export const siteUrl = "https://azeezdamilare.com";

/**
 * Site-wide social share image. Not yet created — tracked in Roadmap.md's
 * launch phase ("Favicon + site-wide OG image"). Until the real asset is
 * added to /public, crawlers will simply find no image at this path rather
 * than the wrong image.
 */
export const defaultOgImage = `${siteUrl}/og-default.png`;

export const twitterCardType = "summary_large_image";

export function canonicalUrl(path: string) {
  return `${siteUrl}${path}`;
}