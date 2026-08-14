import { siteUrl } from "../content/site";
import { sameAsProfiles } from "../content/social";

/**
 * The site-wide `Person` JSON-LD required by CLAUDE.md Section 8.
 *
 * Emitted ONCE, from App.tsx alongside ScrollManager — outside <Routes>, so it
 * is unconditional and every route carries it without each page repeating it.
 * A static block in index.html would also be site-wide, but it could not read
 * content/social.ts, so the profile URLs would be duplicated in two places and
 * could drift from the footer.
 *
 * Page-level JSON-LD (Service, FAQPage, WebPage, BreadcrumbList) is additive
 * rather than conflicting: schema.org treats separate blocks as separate
 * statements about the page.
 *
 * React 19 hoists <title>/<meta>/<link> into <head> but deliberately does NOT
 * hoist <script>, so this block renders in place in the body — which is fine,
 * Google reads JSON-LD anywhere in the document. dangerouslySetInnerHTML
 * rather than a text child because React escapes text children, and some of
 * the JSON-LD strings contain "&" (e.g. "Services & Pricing"), which would
 * corrupt the JSON.
 */
export function SiteStructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Azeez Damilare Gbenga",
    url: siteUrl,
    jobTitle: "Full-stack software engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    sameAs: sameAsProfiles.map((p) => p.href),
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
    </>
  );
}
