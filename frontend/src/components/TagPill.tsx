import type { HTMLAttributes } from "react";

export type TagPillVariant = "default" | "tinted";

export interface TagPillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagPillVariant;
}

const variantClasses: Record<TagPillVariant, string> = {
  default: "border-border text-text-muted",
  tinted: "border-tint-border bg-tint text-accent-text",
};

export function TagPill({
  variant = "default",
  className = "",
  ...props
}: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
