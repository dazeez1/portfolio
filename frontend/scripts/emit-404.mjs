import { copyFileSync, existsSync, rmSync } from "node:fs";

/**
 * Emit build/client/404.html.
 *
 * Vercel serves a root-level 404.html for any path that matches no file, with a
 * real 404 status. Without it the host returns its own bare page: correct
 * status, but none of our nav, ghost numeral or helpful links — a regression
 * from the SPA build, where the catch-all rewrite rendered the branded 404 (at
 * the wrong status).
 *
 * "/404" is prerendered in react-router.config.ts. It matches the splat route,
 * so the emitted document IS the NotFound page. Copying it to the output root
 * gets the branded page AND the right status. On load, the client router
 * re-matches the real URL against the same splat and renders NotFound again, so
 * hydration is consistent whatever path the visitor actually hit.
 */
const src = "build/client/404/index.html";
const dest = "build/client/404.html";

if (!existsSync(src)) {
  console.error(
    `emit-404: ${src} is missing — is "/404" still in the prerender list?`,
  );
  process.exit(1);
}

copyFileSync(src, dest);
// Drop the directory form so /404 is not a second, indexable copy.
rmSync("build/client/404", { recursive: true, force: true });
console.log(`emit-404: ${dest} written from the prerendered splat route`);
