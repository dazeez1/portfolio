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

export function Card({
  hoverLift = false,
  tone = "surface",
  className = "",
  ...props
}: CardProps) {
  const hoverClasses = hoverLift
    ? "transition-shadow duration-150 hover:shadow-md motion-safe:transition-transform motion-safe:hover:-translate-y-1"
    : "";
  const toneClass = tone === "alt" ? "bg-surface-alt" : "bg-surface";

  return (
    <div
      className={`rounded-lg border border-border ${toneClass} p-6 ${hoverClasses} ${className}`}
      {...props}
    />
  );
}
