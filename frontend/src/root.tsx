import { Links, Meta, Outlet, Scripts } from "react-router";
import { ScrollManager } from "./components/ScrollManager";
import { SiteStructuredData } from "./components/SiteStructuredData";
import "./index.css";

/**
 * Anti-flash. Reads the persisted theme and sets data-theme on <html> before
 * first paint, so the pre-JS/pre-stylesheet paint is ivory (or dark) rather
 * than browser-default white. Inline and blocking, so it runs during head
 * parsing — the same guarantee it had in index.html.
 *
 * It also syncs the theme-color meta declared just above it, in the same
 * branch, so the browser chrome is right on first paint instead of showing the
 * light value and correcting after hydration. Hex values match --bg light/dark
 * in styles/tokens.css.
 */
const antiFlashScript = `(function () {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.dataset.theme = "dark";
      var tc = document.querySelector('meta[name="theme-color"]');
      if (tc) tc.setAttribute("content", "#191613");
    }
  } catch (e) {}
})();`;

/**
 * Critical background, inlined so it applies before the stylesheet loads.
 * Set on html (not just body) so elastic overscroll never reveals white.
 */
const criticalCss = `html{background:#faf7f2}html[data-theme="dark"]{background:#191613}`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning because the anti-flash script adds data-theme to
      this element before React hydrates, which React would otherwise report as
      a server/client attribute mismatch.
    */
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/*
          Icons. favicon.ico is the only tab icon — the .svg that used to sit
          here was the untouched Vite scaffold logo, and because browsers prefer
          an SVG favicon it was the one actually being shown. If an ADG SVG is
          ever drawn, it goes back below this line and wins again.
        */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/*
          Mobile browser chrome tint. Must precede the anti-flash script, which
          rewrites this tag's content. One unconditional tag rather than a
          prefers-color-scheme pair: the theme is data-theme + localStorage and
          defaults to light regardless of the OS, so keying off the OS was wrong
          in 3 of 4 states. The static value is also the correct no-JS fallback.
        */}
        <meta name="theme-color" content="#faf7f2" />

        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />

        <link
          rel="preload"
          href="/fonts/inter-variable-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fraunces-variable-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <Meta />
        <Links />

        {/*
          Plausible: async, non-blocking (CLAUDE.md Section 10). Records nothing
          until azeezdamilare.com is live and a matching Plausible site exists.
        */}
        <script
          defer
          data-domain="azeezdamilare.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>
        {children}
        {/*
          No <ScrollRestoration />: ScrollManager already owns scroll on
          navigation (top on a new path, the element on a hash). Adding
          ScrollRestoration would fight it on back/forward, and omitting it
          preserves exactly the behaviour the declarative build had.
        */}
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <>
      <ScrollManager />
      <SiteStructuredData />
      <Outlet />
    </>
  );
}