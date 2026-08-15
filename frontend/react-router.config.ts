import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./src/content/siteRoutes";

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
   * Routes come from content/siteRoutes.ts, the single list the sitemap
   * generator also reads — so the two cannot drift.
   *
   * "/404" is extra: it is rendered by the splat route, and
   * scripts/emit-404.mjs moves the output to build/client/404.html, which
   * Vercel serves for unmatched paths.
   */
  prerender: () => [...prerenderPaths, "/404"],
} satisfies Config;
