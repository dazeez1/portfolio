import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Renders nothing — owns window scroll position across client-side navigation.
 *
 * React Router does not reset scroll on navigation, so without this a click
 * from halfway down a long page (e.g. the Services pricing cards) lands on the
 * next route still holding the old offset, dumping the visitor near the bottom
 * of the new page and forcing them to scroll up.
 *
 * Behaviour:
 * - `#hash` present → scroll that element into view. Vertical offset comes from
 *   the target's own `scroll-mt-*` class, so the sticky header never covers it
 *   and there is no magic pixel constant here to drift out of sync.
 * - no hash → scroll to top, the expected behaviour for a fresh page.
 *
 * Jumps are instant rather than smooth: a long animated scroll through a page
 * the visitor has not seen yet is disorienting, and instant keeps this correct
 * under `prefers-reduced-motion` (CLAUDE.md Section 9) with no branching.
 */
export function ScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Two frames: let React commit and let layout/fonts settle, so we measure
    // the target's final position rather than a pre-layout one.
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (hash) {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
            return;
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname, search, hash]);

  return null;
}