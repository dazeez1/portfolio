import { Helmet } from "react-helmet-async";
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
 * statements about the page, and Helmet appends rather than replacing them.
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
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(person)}</script>
    </Helmet>
  );
}
