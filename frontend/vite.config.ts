import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { indexablePaths } from "./src/content/siteRoutes";
import { siteUrl } from "./src/content/site";

/**
 * Writes sitemap.xml from the same route list the prerender config uses, so a
 * route can never be prerendered but missing from the sitemap (or listed in the
 * sitemap but noindexed).
 *
 * No <lastmod>. A route's rendered output depends on its page component, its
 * content module and shared components, so no single file's timestamp honestly
 * describes "when this page last changed" — and a checkout's mtimes are the
 * checkout time, not the content's. An invented or misleading lastmod is worse
 * than none: Google ignores the element when it does not trust it.
 */
function sitemap(): Plugin {
  return {
    name: "emit-sitemap",
    apply: "build",
    writeBundle(options) {
      const dir = options.dir ?? "";
      // Two builds run (client and server); only write alongside the client one.
      if (!dir.endsWith("build/client")) return;

      const urls = indexablePaths
        .map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`)
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

      writeFileSync(join(dir, "sitemap.xml"), xml, "utf8");
      console.log(`emit-sitemap: ${indexablePaths.length} URLs -> ${dir}/sitemap.xml`);
    },
  };
}

// Plugin order is not load-bearing here — the spike built this both ways and
// got a byte-identical stylesheet — but tailwind first reads more naturally.
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), sitemap()],
});
