import type { ElementType, HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/**
 * The one shared horizontal alignment wrapper (max-width + padding).
 * Used directly inside Nav, Footer, and every Home section so content
 * edges line up exactly — no section should build its own max-w/px-6
 * combination.
 */
export function Container({
  as: Component = "div",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Component className={`mx-auto max-w-6xl px-6 ${className}`} {...props} />
  );
}
