import type { ElementType, ReactNode } from "react";

export interface SectionHeadingProps {
  title: string;
  /** Right-side slot, e.g. a "View all →" link. */
  action?: ReactNode;
  /**
   * "heading": real serif headline (CLAUDE.md 2 — 2–2.5rem, not a label).
   * "label": small uppercase muted strip for genuinely minor sections
   * (e.g. "TOOLS I WORK WITH") — never a substitute for a real headline.
   */
  variant?: "heading" | "label";
  /** Heading level for semantic hierarchy (CLAUDE.md 5.4). Default h2. */
  as?: ElementType;
}

export function SectionHeading({
  title,
  action,
  variant = "heading",
  as: Component = "h2",
}: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <Component
        className={
          variant === "label"
            ? "font-sans text-xs uppercase tracking-wide text-text-muted"
            : "font-serif text-4xl text-ink"
        }
      >
        {title}
      </Component>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
