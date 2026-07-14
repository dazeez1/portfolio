export interface HelpfulLink {
  label: string;
  to: string;
}

export const ghostNumeral = "404";
export const heading = "Page not found";
export const subline = "This page doesn't exist or has been moved.";
export const helperLine = "Let's get you back on track.";

export const primaryButton = { label: "Back to home", to: "/" };
export const secondaryButtons: HelpfulLink[] = [
  { label: "View portfolio", to: "/portfolio" },
  { label: "Contact me", to: "/contact" },
];

export const helpfulLinksTitle = "You might be looking for:";
export const helpfulLinks: HelpfulLink[] = [
  { label: "My portfolio projects", to: "/portfolio" },
  { label: "Services I offer", to: "/services" },
  { label: "My resume and experience", to: "/about" },
  { label: "Contact information", to: "/contact" },
];
