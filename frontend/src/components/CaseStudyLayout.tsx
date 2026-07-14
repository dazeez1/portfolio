import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import type { CaseStudyContent, CaseStudyImage as CaseStudyImageData } from "../content/caseStudies/types";
import { BrowserFrame } from "./BrowserFrame";
import { ButtonLink } from "./Button";
import { Card } from "./Card";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { GithubIcon, GlobeIcon } from "./icons";
import { MetricCard } from "./MetricCard";
import { Nav } from "./Nav";
import { TagPill } from "./TagPill";

function SectionHeading({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
        {number} — {label}
      </p>
      <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{title}</h2>
    </div>
  );
}

function CaseStudyImage({
  image,
  label,
  aspect = "aspect-[16/10]",
}: {
  image?: CaseStudyImageData;
  label: string;
  aspect?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div>
      {!image || failed ? (
        <div
          className={`flex ${aspect} items-center justify-center rounded-lg border border-border bg-surface-alt`}
        >
          <span className="font-sans text-xs text-text-muted">
            {label} — image coming soon
          </span>
        </div>
      ) : (
        <div
          className={`relative ${aspect} overflow-hidden rounded-lg border border-border bg-surface-alt`}
        >
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
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={`relative block h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      )}
      <p className="mt-2 text-center font-sans text-xs text-text-muted">
        {label}
      </p>
    </div>
  );
}

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const { hero, problem, solution, build, features, challenges, results, projectNav, closingCta } =
    content;

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={hero.summary} />
      </Helmet>

      <Nav />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-bg pt-8">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm">
              <Link to="/portfolio" className="text-accent-text underline">
                Portfolio
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">{content.breadcrumbCurrent}</span>
            </nav>
          </Container>
        </section>

        {/* Hero */}
        <section className="bg-bg py-8 md:py-12">
          <Container>
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((tag) => (
                <TagPill key={tag} variant="tinted">
                  {tag}
                </TagPill>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-[68ch] font-sans text-base text-text-secondary">
              {hero.summary}
            </p>
            {hero.summaryDetail && (
              <p className="mt-2 max-w-[68ch] font-sans text-base text-text-secondary">
                {hero.summaryDetail}
              </p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-6 rounded-lg border border-border bg-surface p-6 sm:grid-cols-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                  Role
                </p>
                <p className="mt-1 font-sans text-sm text-ink">{hero.metaBar.role}</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                  Timeline
                </p>
                <p className="mt-1 font-sans text-sm text-ink">
                  {hero.metaBar.timeline}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                  Stack
                </p>
                <p className="mt-1 font-sans text-sm text-ink">{hero.metaBar.stack}</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                  Links
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  {hero.metaBar.codeHref && (
                    <a
                      href={hero.metaBar.codeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-sm text-ink hover:text-accent-text"
                    >
                      <GithubIcon className="h-4 w-4" aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {hero.metaBar.liveHref && (
                    <a
                      href={hero.metaBar.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-sm text-ink hover:text-accent-text"
                    >
                      <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Hero image */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <BrowserFrame
              url={hero.metaBar.liveHref?.replace(/^https?:\/\//, "")}
              image={hero.screenshot}
            />
          </Container>
        </section>

        {/* 01 — The problem */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <SectionHeading number="01" label="The problem" title={problem.title} />
            <div className="mt-4 flex max-w-[68ch] flex-col gap-4">
              {problem.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        {/* 02 — The solution */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading number="02" label="The solution" title={solution.title} />
            <p className="mt-4 max-w-[68ch] font-sans text-base leading-relaxed text-text-secondary">
              {solution.intro}
            </p>
            <div className="mt-8 flex max-w-[68ch] flex-col gap-6">
              {solution.subBlocks.map((block) => (
                <div key={block.lead}>
                  <h3 className="font-sans text-base font-semibold text-ink">
                    {block.lead}
                  </h3>
                  <p className="mt-1 font-sans text-base leading-relaxed text-text-secondary">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {solution.images.map((item) => (
                <CaseStudyImage
                  key={item.label}
                  image={item.image}
                  label={item.label}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* 03 — How it's built */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <SectionHeading number="03" label="Architecture" title={build.title} />
            <div className="mt-4 flex max-w-[68ch] flex-col gap-4">
              {build.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <CaseStudyImage
                image={build.diagram.image}
                label={build.diagram.label}
                aspect="aspect-[21/9]"
              />
            </div>
          </Container>
        </section>

        {/* 04 — Key features */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading number="04" label="Core features" title={features.title} />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.items.map((feature) => (
                <Card key={feature.title}>
                  <h3 className="font-sans text-base font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 05 — Challenges and what I learned */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <SectionHeading
              number="05"
              label="Challenges and what I learned"
              title={challenges.title}
            />
            <div className="mt-4 flex max-w-[68ch] flex-col gap-4">
              {challenges.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        {/* 06 — Results */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading number="06" label="Results" title={results.title} />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {results.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
            <p className="mt-6 max-w-[68ch] font-sans text-xs text-text-muted">
              {results.footnote}
            </p>
          </Container>
        </section>

        {/* Project navigation */}
        <div className="border-t border-border">
          <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Link to={projectNav.prevHref} className="group">
              <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                ← Back to portfolio
              </p>
              <p className="mt-1 font-serif text-xl text-ink group-hover:text-accent-text">
                {projectNav.prevLabel}
              </p>
            </Link>
            <Link to={projectNav.nextHref} className="group text-left sm:text-right">
              <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                Next project →
              </p>
              <p className="mt-1 font-serif text-xl text-ink group-hover:text-accent-text">
                {projectNav.nextLabel}
              </p>
            </Link>
          </Container>
        </div>

        {/* Closing CTA */}
        <section className="bg-bg py-16 md:py-24">
          <Container className="flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              {closingCta.heading}
            </h2>
            {closingCta.subline && (
              <p className="mt-4 max-w-[60ch] font-sans text-base text-text-secondary">
                {closingCta.subline}
              </p>
            )}
            <div className="mt-8">
              <ButtonLink to={closingCta.buttonHref} variant="primary">
                {closingCta.buttonLabel}
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
