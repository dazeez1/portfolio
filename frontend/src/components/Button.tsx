import type { ButtonHTMLAttributes } from "react";

// "accent" is the single highest-value CTA per page (CLAUDE.md 1.1) — a
// page-composition rule, not something this component enforces.
export type ButtonVariant = "primary" | "accent" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-button-primary-bg text-button-primary-text hover:opacity-90",
  accent: "bg-accent text-button-primary-text hover:bg-accent-hover",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:bg-surface-alt",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-sans text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
