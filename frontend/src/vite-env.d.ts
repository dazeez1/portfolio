/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * GA4 measurement ID, e.g. "G-XXXXXXXXXX". Unset means analytics is off:
   * no script is rendered and no beacons are sent (see lib/analytics.ts).
   *
   * Exposed to client code by the `GA_` entry in `envPrefix` (vite.config.ts).
   * Vite inlines it at build time, so changing it in Vercel needs a redeploy,
   * not just a restart.
   */
  readonly GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * gtag.js attaches these to window. Declared rather than imported so the app
 * carries no @types/gtag dependency for two globals (CLAUDE.md Section 5.5).
 */
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}