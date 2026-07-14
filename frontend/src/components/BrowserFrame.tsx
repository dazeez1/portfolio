import { useRef, useState } from "react";
import type { ReactNode } from "react";

export interface BrowserFrameImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Default "lazy". Set "eager" for above-the-fold usage (e.g. the hero). */
  loading?: "lazy" | "eager";
}

export interface BrowserFrameProps {
  /** Shown in the top bar, e.g. "sangira.vercel.app". Omit for no URL bar. */
  url?: string;
  /**
   * The screenshot as a raw children slot — pass a single real <img> with
   * explicit width/height and meaningful alt text (CLAUDE.md Section 3).
   * Prefer the `image` prop instead when the path may not exist yet: it
   * falls back to the placeholder automatically on load failure, so a
   * real capture can be dropped into /public later with no code change.
   */
  children?: ReactNode;
  image?: BrowserFrameImage;
  /** False to omit this component's own border/radius — for nesting inside another bordered container. Default true. */
  bordered?: boolean;
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

export function BrowserFrame({
  url,
  children,
  image,
  bordered = true,
  className = "",
}: BrowserFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showImage = !children && image && !imageFailed;
  const showPlaceholder = !children && !showImage;

  return (
    <div
      className={`${bordered ? "overflow-hidden rounded-lg border border-border bg-surface" : ""} ${className}`}
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
      ) : showImage ? (
        <div className="relative bg-surface-alt">
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-border motion-safe:animate-pulse"
              aria-hidden="true"
            />
          )}
          <img
            ref={(node) => {
              imgRef.current = node;
              if (node?.complete) setImageLoaded(true);
            }}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={image.loading ?? "lazy"}
            className={`relative block h-auto w-full transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : null}
      {showPlaceholder && (
        <div className="flex aspect-[16/10] items-center justify-center bg-surface-alt">
          <span className="font-sans text-xs text-text-muted">
            No screenshot yet
          </span>
        </div>
      )}
    </div>
  );
}
