/**
 * Single source of truth for the owner's social profiles and outbound
 * contact URLs. Footer and /contact both read from here — these URLs are
 * not to be repeated inside components.
 */

export type SocialLabel = "GitHub" | "LinkedIn" | "WhatsApp" | "Instagram";

export interface SocialProfile {
  label: SocialLabel;
  href: string;
  /**
   * Official brand colour on hover, per CLAUDE.md Section 1 "Brand icon
   * colors" — hover only, outside the theme system. GitHub reuses `ink`.
   */
  hoverClass: string;
}

export const socialProfiles: Record<SocialLabel, SocialProfile> = {
  GitHub: {
    label: "GitHub",
    href: "https://github.com/dazeez1",
    hoverClass: "hover:text-ink",
  },
  LinkedIn: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/azeez-damilare-gbenga-b05b7a17a/",
    hoverClass: "hover:text-brand-linkedin",
  },
  WhatsApp: {
    label: "WhatsApp",
    href: "https://wa.me/2347015059880",
    hoverClass: "hover:text-brand-whatsapp",
  },
  Instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/drdreyofficial/",
    hoverClass: "hover:text-brand-instagram",
  },
};

/** Footer order (CLAUDE.md Section 6: GitHub, LinkedIn, WhatsApp, Instagram). */
export const footerSocials: SocialProfile[] = [
  socialProfiles.GitHub,
  socialProfiles.LinkedIn,
  socialProfiles.WhatsApp,
  socialProfiles.Instagram,
];

/** /contact "Find me on social media" row — no WhatsApp, it has its own copy row. */
export const contactSocials: SocialProfile[] = [
  socialProfiles.GitHub,
  socialProfiles.LinkedIn,
  socialProfiles.Instagram,
];

/**
 * Every `target="_blank"` link must carry this. `noreferrer` alone was the
 * previous state; `noopener` is included explicitly rather than relying on
 * modern browsers implying it for `_blank`.
 */
export const externalRel = "noopener noreferrer";
/**
 * Profiles asserted as `sameAs` in the site-wide Person JSON-LD — the signal
 * that ties this site to the same real person as those accounts, which is the
 * mechanism for ranking on the owner's own name.
 *
 * WhatsApp is deliberately excluded: `wa.me/…` is a chat deep link, not a
 * profile page, so it is not a `sameAs` identity for the Person.
 */
export const sameAsProfiles: SocialProfile[] = [
  socialProfiles.GitHub,
  socialProfiles.LinkedIn,
  socialProfiles.Instagram,
];
