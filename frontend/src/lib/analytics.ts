/**
 * GA4 wiring. Everything analytics-related reads `gaEnabled` first, so an unset
 * GA_MEASUREMENT_ID is a supported state rather than a broken one: no script
 * tag is rendered, no beacon is attempted, and every helper here is a no-op.
 */

/** Empty string when unset, so the value is always a string to compare. */
export const gaMeasurementId = import.meta.env.GA_MEASUREMENT_ID ?? "";

/**
 * Whether to load gtag.js and send anything at all.
 *
 * The ID format is checked, not just its presence: a var set to "true" or a
 * pasted stream ID would otherwise render a script tag pointing at a garbage
 * measurement ID, which fails silently in production rather than at build.
 */
export const gaEnabled = /^G-[A-Z0-9]+$/.test(gaMeasurementId);

/**
 * The inline half of the standard snippet.
 *
 * `send_page_view: false` is the load-bearing part. gtag's default fires one
 * page_view when the library loads and never again — correct for a document
 * site, wrong here: a prerendered SPA changes route without a page load, so
 * every route after the first would be invisible. Page views are sent by
 * `Analytics` instead, including the first, which is why the automatic one is
 * turned off — leaving it on would double-count the landing route.
 */
export const gaInlineScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { send_page_view: false });`;

/** Send a GA4 page_view for the current document. No-op when GA is off. */
export function trackPageView(location: string, title: string): void {
  if (!gaEnabled) return;
  window.gtag?.("event", "page_view", {
    page_location: location,
    page_title: title,
  });
}

/**
 * Send a custom GA4 event. The single choke point for everything below, so
 * "does anything fire when GA is off?" has one answer in one place.
 *
 * Parameters only reach GA4 reports once registered as custom dimensions
 * (Admin → Custom definitions); unregistered ones are collected but invisible.
 */
export function trackEvent(
  name: string,
  params: Record<string, string> = {},
): void {
  if (!gaEnabled) return;
  window.gtag?.("event", name, params);
}

/**
 * Outbound clicks and scroll depth are deliberately absent from this file.
 * Enhanced Measurement already emits `click` (with link_url/link_domain/
 * outbound) and `scroll` at 90%, both confirmed firing on this site — adding
 * our own would double-count the same action.
 */

/** Contact form submitted and the API returned 200. Real leads only. */
export function trackContactSubmit(
  requestType: string | undefined,
  packageName: string | undefined,
): void {
  trackEvent("contact_submit", {
    request_type: requestType || "unspecified",
    // "none" rather than omitting the key, so the parameter is always present
    // and GA4's reports can group on it without a null bucket.
    package: packageName || "none",
  });
}

/** Calendly popup opened. `placement` is the page the trigger sits on. */
export function trackBookingOpen(placement: string): void {
  trackEvent("booking_open", { placement });
}

/**
 * Resume PDF clicked. Custom because Enhanced Measurement's file_download did
 * not fire for this link when measured, despite the .pdf extension.
 */
export function trackResumeDownload(): void {
  trackEvent("resume_download");
}

/**
 * Pricing "Get started" clicked. The tier comes from the `package` query param
 * in the CTA's own href rather than the card's display label: the labels are
 * ambiguous across pages (both /services and /seo have a "Starter"), while the
 * package slugs are unique site-wide and already the canonical identifier in
 * the conversion flow (CLAUDE.md Section 7).
 */
export function trackPricingCta(ctaHref: string): void {
  // Strip the fragment before parsing: every pricing href ends in
  // "#get-in-touch", which would otherwise ride along inside the package
  // value as "business-web-app#get-in-touch".
  const query = ctaHref.split("#")[0].split("?")[1] ?? "";
  const tier = new URLSearchParams(query).get("package");
  if (!tier) return;
  trackEvent("pricing_cta", { tier });
}

/**
 * Case study opened, from wherever the link was clicked. Fired on the click
 * rather than on the case-study route mounting: mounting is already covered by
 * page_view, whereas the click also tells us which page drove the interest.
 *
 * The slug is derived from the href so the three link sites cannot disagree.
 */
export function trackCaseStudyOpen(caseStudyPath: string): void {
  const slug = caseStudyPath.split("/").filter(Boolean).pop();
  if (!slug) return;
  trackEvent("case_study_open", { slug });
}