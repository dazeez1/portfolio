import { cardLiftClasses } from "../components/Card";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { BrowserFrame } from "../components/BrowserFrame";
import { ButtonAnchor, ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { trackCaseStudyOpen } from "../lib/analytics";
import { Footer } from "../components/Footer";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  GithubIcon,
  GlobeIcon,
} from "../components/icons";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";
import {
  featuredSectionLabel,
  filterOptions,
  githubNote,
  header,
  moreProjectsSectionLabel,
  perPage,
  projects,
  type Project,
} from "../content/projects";

function matchesFilter(project: Project, filter: string) {
  if (filter === "All") return true;
  if (filter === "Client work") return project.clientWork;
  return project.tags.includes(filter);
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors ${
        active
          ? "bg-button-primary-bg text-button-primary-text"
          : "border border-border-strong text-text-secondary hover:bg-surface-alt"
      }`}
    >
      {label}
    </button>
  );
}

/*
 * Takes the whole screenshot object rather than src/alt, so a card that has
 * responsive variants actually uses them. Passing only `src` silently threw
 * `srcSet` away and made every grid card download the full 1400px master to
 * fill a ~352px slot.
 */
function GridImage({ image }: { image: Project["screenshot"] }) {
  const { src, alt, srcSet, sizes } = image;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  if (failed) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-surface-alt">
        <span className="font-sans text-xs text-text-muted">
          No screenshot yet
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
      {!loaded && (
        <div
          className="absolute inset-0 bg-border motion-safe:animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        ref={(node) => {
          imgRef.current = node;
          if (node?.complete) setLoaded(true);
        }}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        className={`relative block h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function FeaturedCard({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-border bg-surface md:flex-row md:items-start ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="overflow-hidden md:h-72 md:w-1/2">
        <BrowserFrame
          bordered={false}
          url={project.links.live?.replace(/^https?:\/\//, "")}
          image={project.screenshot}
        />
      </div>
      <div className="flex flex-col p-6 md:w-1/2 md:p-8">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag} variant="tinted">
              {tag}
            </TagPill>
          ))}
        </div>
        <h3 className="mt-4 font-serif text-2xl text-ink">{project.title}</h3>
        <p className="mt-2 font-sans text-base text-text-secondary">
          {project.oneLiner}
        </p>
        {project.stack.length > 0 && (
          <p className="mt-3 font-sans text-xs text-text-muted">
            {project.stack.join(" · ")}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.links.caseStudy && (
            <ButtonLink
              to={project.links.caseStudy}
              onClick={() => trackCaseStudyOpen(project.links.caseStudy!)}
              variant="primary"
            >
              Read case study
            </ButtonLink>
          )}
          {project.links.github && (
            <ButtonAnchor
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              Code
            </ButtonAnchor>
          )}
        </div>
      </div>
    </div>
  );
}

/*
 * The whole card is clickable, without wrapping it in an anchor.
 *
 * Wrapping would make a screen reader read every word in the card as the
 * link's name before revealing it is a link, and would flatten the heading and
 * the tag into that one string. Instead the card is `relative` and the card's
 * primary link paints a transparent `::after` across it, so the pointer target
 * is the whole card while the accessibility tree still sees one ordinary link
 * beside a real heading — and the card stays a single tab stop.
 *
 * Two consequences worth knowing before editing this:
 *  - The primary link must NOT be positioned. Its `::after` resolves against
 *    the nearest positioned ancestor, so making the link `relative` would
 *    shrink the hitbox back to the button.
 *  - Anything that must stay usable above the overlay needs `relative z-10`:
 *    the title and description so text is still selectable, and any secondary
 *    link so it stays independently clickable.
 */
function GridCard({ project }: { project: Project }) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface ${cardLiftClasses}`}
    >
      <GridImage image={project.screenshot} />
      <div className="flex flex-1 flex-col p-5">
        <div className="relative z-10 flex w-fit items-center gap-2">
          <h3 className="font-serif text-xl text-ink">{project.title}</h3>
          {project.clientWork && <TagPill>Client work</TagPill>}
        </div>
        <p
          className={
            project.placeholder
              ? "relative z-10 mt-2 font-sans text-xs text-text-muted"
              : "relative z-10 mt-2 font-sans text-base text-text-secondary"
          }
        >
          {project.oneLiner}
        </p>
        {/*
          The flex growth that used to live on the paragraph. Moved out so the
          paragraph is only as tall as its own text: it sits above the card's
          click overlay to stay selectable, and any height it did not need would
          be dead space the card could not be clicked through.
        */}
        <div className="flex-1" aria-hidden="true" />
        {/*
          Placeholder entries render no clickable links at all — no Details, no
          Code, no Live site. Their case studies do not exist and their repo/live
          URLs are unknown, and a dead or wrong link is worse than no link. The
          guard is here as well as in projects.ts so a stray link in data can
          never surface on a placeholder card.
        */}
        {!project.placeholder && (
          <div className="mt-4 flex items-center justify-between gap-4">
            {project.links.caseStudy && (
              <Link
                to={project.links.caseStudy}
                onClick={() => trackCaseStudyOpen(project.links.caseStudy!)}
                // z-10 keeps this above the card overlay so it remains its own
                // click target rather than being swallowed by the primary link.
                className="relative z-10 font-sans text-sm text-accent-text underline"
              >
                Details →
              </Link>
            )}
            {project.clientWork
              ? project.links.live && (
                  <ButtonAnchor
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    /*
                    The card's hitbox. Deliberately not `relative`: the ::after
                    must resolve against the card, not this button.
                  */
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                    Live site
                    {/*
                    Every grid card's link reads "Live site", which is useless
                    in a screen reader's link list. The project name is appended
                    visually-hidden rather than set as an aria-label, so the
                    accessible name still *starts with* the visible text —
                    WCAG 2.5.3 Label in Name — and voice-control users saying
                    "Live site" still match the control.
                  */}
                    <span className="sr-only">, {project.title}</span>
                  </ButtonAnchor>
                )
              : project.links.github && (
                  <ButtonAnchor
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    Code
                    <span className="sr-only">, {project.title}</span>
                  </ButtonAnchor>
                )}
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="More projects pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink disabled:opacity-40"
      >
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-sm ${
            n === page
              ? "bg-button-primary-bg text-button-primary-text"
              : "text-text-secondary hover:bg-surface-alt"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink disabled:opacity-40"
      >
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

const metaTitle = "Portfolio — Azeez Damilare Gbenga";
const canonical = canonicalUrl("/portfolio");

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [page, setPage] = useState(1);

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setPage(1);
  }

  const filteredFeatured = projects.filter(
    (p) => p.featured && matchesFilter(p, activeFilter),
  );
  const filteredGrid = projects.filter(
    (p) => !p.featured && matchesFilter(p, activeFilter),
  );

  const totalPages = Math.max(1, Math.ceil(filteredGrid.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredGrid.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const hasResults = filteredFeatured.length > 0 || filteredGrid.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <title>{metaTitle}</title>
        <meta name="description" content={header.subhead} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={header.subhead} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={header.subhead} />
        <meta name="twitter:image" content={defaultOgImage} />
      </>

      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-bg py-16 md:py-20">
          <Container>
            <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
              {header.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl text-ink md:text-5xl">
              {header.headline}
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-base text-text-secondary">
              {header.subhead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <FilterPill
                  key={option}
                  label={option}
                  active={activeFilter === option}
                  onClick={() => handleFilterChange(option)}
                />
              ))}
            </div>
          </Container>
        </section>

        {!hasResults && (
          <section className="bg-bg pb-16">
            <Container>
              <p className="font-sans text-sm text-text-muted">
                No projects match this filter yet.
              </p>
            </Container>
          </section>
        )}

        {/* Featured case studies */}
        {filteredFeatured.length > 0 && (
          <section className="bg-bg pb-16 md:pb-24">
            <Container>
              <SectionHeading title={featuredSectionLabel} variant="label" />
              <div className="mt-8 flex flex-col gap-8">
                {filteredFeatured.map((project, index) => (
                  <FeaturedCard
                    key={project.slug}
                    project={project}
                    reverse={index % 2 === 1}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* More projects */}
        {filteredGrid.length > 0 && (
          <section className="bg-surface-alt py-16 md:py-24">
            <Container>
              <SectionHeading
                title={moreProjectsSectionLabel}
                variant="label"
              />
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((project) => (
                  <GridCard key={project.slug} project={project} />
                ))}
              </div>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={setPage}
              />
            </Container>
          </section>
        )}

        {/* GitHub note */}
        <section className="bg-bg py-12 md:py-16">
          <Container>
            <div className="flex w-full flex-col items-center rounded-lg border border-border bg-surface p-6 text-center md:p-8">
              <p className="font-sans text-base text-text-secondary">
                {githubNote.lead}
              </p>
              <ButtonAnchor
                href={githubNote.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="mt-4"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                {githubNote.label}
                <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </ButtonAnchor>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
