import type { Config } from "@react-router/dev/config";
import { caseStudySlugs } from "./src/content/caseStudies";

/**
 * Framework mode, static output — no runtime server.
 *
 * `appDirectory: "src"` keeps the existing tree in place. The convention is
 * `app/`, but moving ~40 files would bury the migration in a rename diff and
 * break every relative import; this is one line instead.
 */
export default {
  appDirectory: "src",
  ssr: false,

  /**
   * Every route emitted as static HTML. Case-study paths come from the content
   * registry, so a third case study needs a content file and a registry line
   * and nothing here.
   *
   * /dev/components is enumerated deliberately: it is a live route today, and
   * with the SPA catch-all gone an un-enumerated route hard-404s. It is due for
   * removal in Phase 3 — delete the route, the page and this entry together.
   */
  async prerender() {
    return [
      "/",
      "/about",
      "/portfolio",
      ...caseStudySlugs.map((slug) => `/portfolio/${slug}`),
      "/services",
      "/seo",
      "/referrals",
      "/privacy",
      "/terms",
      "/contact",
      "/thank-you",
      "/dev/components",
      // Rendered by the splat route; scripts/emit-404.mjs moves the output to
      // build/client/404.html, which Vercel serves for unmatched paths.
      "/404",
    ];
  },
} satisfies Config;
