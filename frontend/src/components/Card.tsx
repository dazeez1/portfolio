import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
}

export function Card({
  hoverLift = false,
  className = "",
  ...props
}: CardProps) {
  const hoverClasses = hoverLift
    ? "transition-shadow duration-150 hover:shadow-md motion-safe:transition-transform motion-safe:hover:-translate-y-1"
    : "";

  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 ${hoverClasses} ${className}`}
      {...props}
    />
  );
}
