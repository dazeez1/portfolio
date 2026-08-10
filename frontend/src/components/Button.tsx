import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from "react";
import { Link, type LinkProps } from "react-router";

// "accent" is the single highest-value CTA per page (CLAUDE.md 1.1) — a
// page-composition rule, not something this component enforces.
// "inverted" is for buttons sitting on an ink CTA band (CLAUDE.md 1: ink is
// used for "dark CTA bands"): it swaps the primary pair so the button always
// contrasts against the band in both themes.
// "invertedOutline" is the secondary partner to "inverted" — an outline button
// on the same ink band. It exists as a variant rather than className overrides
// because `secondary`'s own `text-ink`/`border-border-strong` are same-specificity
// utilities that silently win the cascade, rendering the label invisible.
export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "inverted"
  | "invertedOutline";

/*
 * Type size lives on each variant, not here. `accent` needs a larger, bolder
 * label than the rest (see below) and a variant cannot reliably override a
 * base `text-sm` — same-specificity utilities are resolved by generated
 * stylesheet order, not class-attribute order.
 */
const baseButtonClasses =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50";

const defaultType = "px-4 py-2 font-sans text-sm font-medium";

const variantClasses: Record<ButtonVariant, string> = {
  primary: `${defaultType} bg-button-primary-bg text-button-primary-text hover:opacity-90`,
  /*
   * The accent fill can only carry LARGE text. `bg` on `accent` is 3.52:1,
   * which never reaches 1.4.3's 4.5:1 for normal text but does satisfy the
   * 3:1 large-text threshold — so the label is locked to 1.25rem/700 here
   * (20px = 15pt bold, clearing WCAG's 14pt-bold floor). Shrinking this
   * label re-breaks contrast; see CLAUDE.md Section 1.
   */
  accent: "px-5 py-2.5 font-sans text-xl font-bold bg-accent text-button-primary-text hover:bg-accent-hover",
  secondary: `${defaultType} border border-border-strong bg-transparent text-ink hover:bg-surface-alt`,
  inverted: `${defaultType} bg-button-primary-text text-button-primary-bg hover:opacity-90`,
  invertedOutline: `${defaultType} border border-button-primary-text bg-transparent text-button-primary-text hover:opacity-80`,
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
