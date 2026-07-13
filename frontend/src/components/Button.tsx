import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from "react";
import { Link, type LinkProps } from "react-router";

// "accent" is the single highest-value CTA per page (CLAUDE.md 1.1) — a
// page-composition rule, not something this component enforces.
export type ButtonVariant = "primary" | "accent" | "secondary";

const baseButtonClasses =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 font-sans text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-button-primary-bg text-button-primary-text hover:opacity-90",
  accent: "bg-accent text-button-primary-text hover:bg-accent-hover",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:bg-surface-alt",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${baseButtonClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

/** Same visual treatment as Button, but a real <a> via react-router Link — for CTAs that navigate (e.g. Nav's "Book a call"). */
export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseButtonClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

/** Same visual treatment as Button, but a real external <a> — for links that leave the site (e.g. Google Maps, WhatsApp, social profiles). */
export interface ButtonAnchorProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  ref?: Ref<HTMLAnchorElement>;
}

export function ButtonAnchor({
  variant = "primary",
  className = "",
  ref,
  ...props
}: ButtonAnchorProps) {
  return (
    <a
      ref={ref}
      className={`${baseButtonClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
