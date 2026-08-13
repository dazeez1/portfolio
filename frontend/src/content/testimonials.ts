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
 * Section heading, rendered only when the section renders.
 */
export const testimonialsSection = {
  heading: "What people say",
};

/**
 * Minimum entries before the section renders at all. Below this the whole
 * section is omitted — heading included — rather than showing a lone quote.
 *
 * Layout follows from the count, in TestimonialCarousel:
 *   0-1  nothing renders
 *   2    both cards stacked, no carousel, no controls, no autoplay
 *   3+   single-slide carousel with prev/next, dots and 6s autoplay
 */
export const minimumToRender = 2;

/**
 * Real quotes only, published with the speaker's permission (CLAUDE.md
 * Section 4). Both entries below were confirmed by the owner.
 *
 * Adding one: append an object matching `Testimonial`. `photo` and `link` are
 * optional; a card without a photo shows the person's initial and is a
 * complete design, not a degraded one.
 */
export const testimonials: Testimonial[] = [
  {
    id: "temilola",
    quote:
      "His communication was great, he was very clear with what I needed and how he was going to use everything. He was/is always responsive when I need help with something. I never felt like a number working with him!",
    name: "Temilola",
    role: "Founder",
    company: "Hura",
  },
  {
    id: "nelson",
    quote:
      "I really love the service and how professional he is. I recommend him to everyone I know. He's really good, fully trustworthy.",
    name: "Nelson",
    role: "Founder",
    company: "Luti",
  },
  /*
    Slots for the next two quotes. Every field is deliberately left EMPTY
    rather than filled with a sample: if one of these is uncommented before it
    is filled in, the card must render visibly blank, never plausible-looking
    praise nobody said. Fill in from the real quote, then delete this note.

    Reaching three entries switches the section from stacked cards to the
    single-slide carousel automatically — no other change needed.

  {
    id: "",
    quote: "",
    name: "",
    role: "",
    company: "",
  },
  {
    id: "",
    quote: "",
    name: "",
    role: "",
    company: "",
  },
  */
];