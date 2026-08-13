import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "./icons";
import { minimumToRender, type Testimonial } from "../content/testimonials";

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;

/** Above this count the section becomes a carousel; at or below it, cards stack. */
const CAROUSEL_FROM = 3;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const [failed, setFailed] = useState(false);

  if (testimonial.photo && !failed) {
    return (
      <img
        src={testimonial.photo}
        alt={testimonial.name}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  // No photo is a complete state, not a degraded one: the initial on tint
  // reads as intentional. accent-text (not accent) because at this size the
  // initial is text, and accent-text is the token that passes on tint.
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint font-serif text-lg text-accent-text"
    >
      {testimonial.name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function Attribution({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, company, link } = testimonial;

  return (
    <figcaption className="relative mt-8 flex items-center justify-center gap-3">
      <Avatar testimonial={testimonial} />
      <div className="text-left">
        <p className="font-sans text-sm font-semibold text-ink">{name}</p>
        <p className="mt-0.5 font-sans text-xs text-text-muted">
          {role}
          {company && (
            <>
              {" · "}
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-text underline"
                >
                  {company}
                  <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
                </a>
              ) : (
                company
              )}
            </>
          )}
        </p>
      </div>
    </figcaption>
  );
}

/**
 * One quote, centred and given room. Built out of raw markup rather than
 * `Card` because the glyph needs a positioned ancestor and the padding here is
 * deliberately larger than Card's fixed `p-6` — and a `p-*` passed through
 * className would be same-specificity with Card's own, so which one won would
 * depend on generated stylesheet order.
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-10 sm:px-12 sm:py-14">
      {/*
        Decorative opening quotation mark. `tint` on `surface` is deliberately
        near-invisible — it should read as a watermark behind the quote, not as
        a second thing to look at. aria-hidden because the blockquote already
        carries the meaning, and a screen reader announcing a stray quotation
        mark is noise.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-2 select-none font-serif text-[7rem] leading-none text-tint sm:left-6 sm:text-[9rem]"
      >
        &ldquo;
      </span>

      <blockquote className="relative mx-auto max-w-[55ch] text-center font-serif text-xl italic leading-relaxed text-ink md:text-2xl">
        {testimonial.quote}
      </blockquote>

      <Attribution testimonial={testimonial} />
    </figure>
  );
}

export interface TestimonialCarouselProps {
  items: Testimonial[];
  /** Accessible name for the carousel region. */
  label?: string;
  /** Override the render threshold — used by the component gallery. */
  minimum?: number;
}

export function TestimonialCarousel({
  items,
  label = "Testimonials",
  minimum = minimumToRender,
}: TestimonialCarouselProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  // One card per slide at every breakpoint, so a page is an item.
  const pageCount = Math.max(1, items.length);
  const currentPage = Math.min(page, pageCount - 1);
  const isCarousel = items.length >= CAROUSEL_FROM;

  const goTo = useCallback(
    (next: number) => setPage(((next % pageCount) + pageCount) % pageCount),
    [pageCount],
  );

  // Auto-advance. Never runs under prefers-reduced-motion, never in the
  // stacked layout, and stops while the pointer is over the carousel or focus
  // is anywhere inside it.
  useEffect(() => {
    if (reducedMotion || paused || !isCarousel) return;
    const id = window.setInterval(
      () => setPage((p) => (p + 1) % pageCount),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, isCarousel, pageCount]);

  if (items.length < minimum) return null;

  /*
    Two quotes read better stacked than paged — both are visible at once, and
    there is nothing to operate, so no carousel semantics, no live region, no
    controls and no autoplay are introduced for them.
  */
  if (!isCarousel) {
    return (
      <div className="mx-auto flex max-w-[46rem] flex-col gap-6">
        {items.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    );
  }

  function handlePointerDown(e: React.PointerEvent) {
    pointerStartX.current = e.clientX;
  }

  function handlePointerUp(e: React.PointerEvent) {
    const start = pointerStartX.current;
    pointerStartX.current = null;
    if (start === null) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    goTo(currentPage + (dx < 0 ? 1 : -1));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(currentPage - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(currentPage + 1);
    }
  }

  const autoRotating = !reducedMotion && !paused;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="mx-auto max-w-[46rem]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        /*
          aria-live is "off" while the carousel is auto-rotating and "polite"
          the moment it is not (reduced motion, hover, or focus inside). A
          live region that fires every 6 seconds unprompted talks over the
          user; announcing only user-driven changes is the WAI-ARIA APG
          carousel behaviour and what AA actually needs here.
        */
        aria-live={autoRotating ? "off" : "polite"}
        aria-atomic="false"
      >
        <div
          className={`flex ${reducedMotion ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={i !== currentPage}
              className="w-full shrink-0"
            >
              <TestimonialCard testimonial={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-alt"
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to testimonial ${i + 1} of ${items.length}`}
              aria-current={i === currentPage ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentPage
                  ? "w-6 bg-accent"
                  : "w-2.5 bg-border-strong hover:bg-text-muted"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-alt"
        >
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}