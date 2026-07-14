import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { BrowserFrame } from "../components/BrowserFrame";
import { ButtonAnchor, ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GithubIcon,
  GlobeIcon,
} from "../components/icons";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
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

function GridImage({ src, alt }: { src: string; alt: string }) {
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

function FeaturedCard({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-border bg-surface md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        <BrowserFrame
          bordered={false}
          url={project.links.live?.replace(/^https?:\/\//, "")}
          image={project.screenshot}
          className="h-full"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag} variant="tinted">
              {tag}
            </TagPill>
          ))}
        </div>
        <h3 className="mt-4 font-serif text-2xl text-ink">{project.title}</h3>
        <p className="mt-3 font-sans text-sm text-text-secondary">
          {project.oneLiner}
        </p>
        {project.stack.length > 0 && (
          <p className="mt-4 font-sans text-xs text-text-muted">
            {project.stack.join(" · ")}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {project.links.caseStudy && (
            <ButtonLink to={project.links.caseStudy} variant="primary">
              Read case study
            </ButtonLink>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-text-secondary hover:text-ink"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function GridCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <GridImage src={project.screenshot.src} alt={project.screenshot.alt} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <h3 className="font-sans text-base font-semibold text-ink">
            {project.title}
          </h3>
          {project.clientWork && <TagPill>Client work</TagPill>}
        </div>
        <p className="mt-2 flex-1 font-sans text-sm text-text-secondary">
          {project.oneLiner}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          {project.links.caseStudy && (
            <Link
              to={project.links.caseStudy}
              className="font-sans text-sm text-accent-text underline"
            >
              Details →
            </Link>
          )}
          {project.clientWork
            ? project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-text-secondary hover:text-ink"
                >
                  <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                  Live site
                </a>
              )
            : project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-text-secondary hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  Code
                </a>
              )}
        </div>
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
      <Helmet>
        <title>Portfolio — Azeez Damilare Gbenga</title>
        <meta name="description" content={header.subhead} />
      </Helmet>

      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-bg py-16 md:py-20">
          <Container>
            <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
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
              <SectionHeading title={moreProjectsSectionLabel} variant="label" />
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
        <section className="bg-bg py-12">
          <Container className="flex flex-col items-center text-center">
            <p className="font-sans text-sm text-text-muted">
              {githubNote.lead}
            </p>
            <ButtonAnchor
              href={githubNote.href}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-3"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              {githubNote.label}
            </ButtonAnchor>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
