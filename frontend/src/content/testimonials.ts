export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  /** Path under /public. Omit it — the avatar falls back to the person's initial. */
  photo?: string;
  /** External URL for the company. Renders the company name as an outbound link. */
  link?: string;
}

/**
 * Section heading, rendered only when the carousel renders.
 */
export const testimonialsSection = {
  heading: "What people say",
};

/**
 * Minimum entries before the section renders at all. Below this the whole
 * section is omitted — heading included — rather than showing a thin or
 * padded-out carousel.
 */
export const minimumToRender = 3;

/**
 * INTENTIONALLY EMPTY.
 *
 * CLAUDE.md Section 4: no placeholder testimonials in production. The section
 * does not exist until real quotes, collected with permission, are added here.
 * Do not add example entries — not even commented out — because commented
 * samples get uncommented.
 *
 * Adding a real one: append an object matching `Testimonial`. `photo` and
 * `link` are optional; a card without a photo shows the person's initial and
 * is a complete design, not a degraded one. The section stays hidden until
 * there are at least `minimumToRender` entries.
 */
export const testimonials: Testimonial[] = [];