import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
  /**
   * Background tone. A prop rather than a `className` override because
   * `bg-surface` and `bg-surface-alt` are same-specificity utilities — which
   * one wins depends on their order in the generated stylesheet, not on the
   * order they appear in the class attribute.
   */
  tone?: "surface" | "alt";
}

/**
 * The lift-on-interaction treatment, exported so a card that cannot use this
 * component still gets the identical cue from one definition rather than a
 * copy that drifts.
 *
 * `focus-within:` mirrors every `hover:` rule exactly. A card whose whole area
 * is a link (see Portfolio's grid cards) is reached by keyboard through the
 * link inside it, so without the focus-within half a keyboard user would get
 * no feedback at all where a mouse user gets a lift and a shadow.
 *
 * The transform half stays behind `motion-safe:`, so under
 * prefers-reduced-motion the shadow still changes but nothing moves
 * (CLAUDE.md Section 9).
 */
export const cardLiftClasses =
  "transition-shadow duration-150 hover:shadow-md focus-within:shadow-md motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1";

export function Card({
  hoverLift = false,
  tone = "surface",
  className = "",
  ...props
}: CardProps) {
  const hoverClasses = hoverLift ? cardLiftClasses : "";
  const toneClass = tone === "alt" ? "bg-surface-alt" : "bg-surface";

  return (
    <div
      className={`rounded-lg border border-border ${toneClass} p-6 ${hoverClasses} ${className}`}
      {...props}
    />
  );
}
