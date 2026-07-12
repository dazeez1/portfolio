import type { ReactNode } from "react";

export interface BrowserFrameProps {
  /** Shown in the top bar, e.g. "sangira.vercel.app". Omit for no URL bar. */
  url?: string;
  /**
   * The screenshot. Pass a single real <img> with explicit width/height
   * and meaningful alt text (CLAUDE.md Section 3) — this component fills
   * it edge-to-edge without cropping. Omit to show the neutral placeholder.
   */
  children?: ReactNode;
  className?: string;
}

// Three neutral dots — deliberately not traffic-light red/yellow/green,
// since only hex values from CLAUDE.md Section 1 may appear anywhere.
function Dots({ invisible = false }: { invisible?: boolean }) {
  return (
    <span
      className={`flex gap-1.5 ${invisible ? "invisible" : ""}`}
      aria-hidden="true"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
      <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
      <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
    </span>
  );
}

export function BrowserFrame({ url, children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-surface ${className}`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-border bg-surface-alt px-4 py-3">
        <Dots />
        {url ? (
          <span className="truncate rounded-full bg-bg px-3 py-1 text-center font-sans text-xs text-text-muted">
            {url}
          </span>
        ) : (
          <span />
        )}
        {/* Mirrors the real dots at matching width so the URL bar centers
            in the middle column regardless of dot sizing changes. */}
        <Dots invisible />
      </div>

      {children ? (
        <div className="bg-surface-alt [&>img]:block [&>img]:h-auto [&>img]:w-full">
          {children}
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-surface-alt">
          <span className="font-sans text-xs text-text-muted">
            No screenshot yet
          </span>
        </div>
      )}
    </div>
  );
}
