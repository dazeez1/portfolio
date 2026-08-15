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