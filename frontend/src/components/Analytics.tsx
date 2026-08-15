import { useEffect } from "react";
import { useLocation } from "react-router";
import { gaEnabled, trackPageView } from "../lib/analytics";

/**
 * Renders nothing — sends one GA4 page_view per route.
 *
 * A prerendered SPA loads a document once and then swaps routes in the client,
 * so gtag's built-in page_view would fire on the landing route and never again.
 * It is disabled in the config snippet (see lib/analytics.ts) and replaced by
 * this effect, which covers the first route and every navigation after it with
 * the same code path — no special case for the initial load, and no double
 * count on it either.
 *
 * Keyed on the full location, not just pathname: `/contact?package=starter` is
 * a distinct entry point reached from the pricing CTAs (CLAUDE.md Section 7)
 * and is worth telling apart from a bare `/contact`.
 *
 * The title is read one frame after commit. React 19 hoists each route's
 * <title> into <head> during the commit, and reading in the same tick can
 * catch the previous route's title still in place — which would file the view
 * under the wrong page name.
 */
export function Analytics() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!gaEnabled) return;

    const frame = requestAnimationFrame(() => {
      trackPageView(window.location.href, document.title);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, search, hash]);

  return null;
}