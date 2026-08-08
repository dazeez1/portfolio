import { useRef, useState } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/**
 * Shared Calendly popup loader — the single implementation used by every
 * "book a call" trigger on the site (Contact, Services).
 *
 * The script is fetched lazily so it never blocks first paint (CLAUDE.md
 * Section 10: Calendly loads on interaction). `warmUp` starts the fetch on
 * pointerenter/touchstart so the click is near-instant; `open` awaits the
 * in-flight load and shows a transient loading label for slow connections.
 */
export function useCalendly(calendlyUrl: string) {
  const [loading, setLoading] = useState(false);
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  // Safe to call repeatedly (pointerenter fires a lot) — returns the same
  // in-flight promise once loading has started.
  function load(): Promise<void> {
    if (window.Calendly) return Promise.resolve();
    if (loadPromiseRef.current) return loadPromiseRef.current;

    loadPromiseRef.current = new Promise((resolve) => {
      if (!document.querySelector("link[data-calendly]")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.setAttribute("data-calendly", "true");
        document.head.appendChild(link);
      }
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

    return loadPromiseRef.current;
  }

  function warmUp() {
    load();
  }

  async function open() {
    const existing = window.Calendly;
    if (existing) {
      existing.initPopupWidget({ url: calendlyUrl });
      return;
    }
    setLoading(true);
    await load();
    setLoading(false);
    window.Calendly?.initPopupWidget({ url: calendlyUrl });
  }

  return { loading, warmUp, open };
}