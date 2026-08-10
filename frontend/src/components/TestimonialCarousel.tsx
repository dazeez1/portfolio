import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "./icons";
import {
  minimumToRender,
  type Testimonial,
} from "../content/testimonials";

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;

/** Cards visible at once: 3 desktop, 2 tablet, 1 mobile. */
function useCardsPerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 64rem)");
    const sm = window.matchMedia("(min-width: 40rem)");
    const update = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  return perView;
}

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
  // reads as intentional. accent-text (not accent) because `tint` does not
  // theme-swap, so the brighter dark-mode accent would fail contrast on it.
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint font-serif text-lg text-accent-text"
    >
      {testimonial.name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company, link } = testimonial;

  return (
    <Card className="flex h-full flex-col">
      <Avatar testimonial={testimonial} />

      {/* No decorative quotation glyph — the blockquote carries the meaning. */}
      <blockquote className="mt-5 flex-1 font-sans text-base leading-relaxed text-text-secondary">
        {quote}
      </blockquote>

      <figcaption className="mt-5">
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
      </figcaption>
    </Card>
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
  const perView = useCardsPerView();
  const reducedMotion = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const pageCount = Math.max(1, Math.ceil(items.length / perView));
  // Clamp when the breakpoint changes under us and shrinks the page count.
  const currentPage = Math.min(page, pageCount - 1);

  const goTo = useCallback(
    (next: number) => setPage(((next % pageCount) + pageCount) % pageCount),
    [pageCount],
  );

  // Auto-advance. Never runs under prefers-reduced-motion, and stops while the
  // pointer is over the carousel or focus is anywhere inside it.
  useEffect(() => {
    if (reducedMotion || paused || pageCount <= 1) return;
    const id = window.setInterval(
      () => setPage((p) => (p + 1) % pageCount),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, pageCount]);

  if (items.length < minimum) return null;

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

  const autoRotating = !reducedMotion && !paused && pageCount > 1;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
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
            <figure
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={
                i < currentPage * perView || i >= (currentPage + 1) * perView
              }
              className="shrink-0 px-3 first:pl-0 last:pr-0"
              style={{ width: `${100 / perView}%` }}
            >
              <TestimonialCard testimonial={item} />
            </figure>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => goTo(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-alt"
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => goTo(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-alt"
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1} of ${pageCount}`}
                aria-current={i === currentPage ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentPage
                    ? "w-6 bg-accent-text"
                    : "w-2.5 bg-border-strong hover:bg-text-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}