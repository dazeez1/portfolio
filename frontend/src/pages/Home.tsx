import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { BrowserFrame } from "../components/BrowserFrame";
import { ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import {
  finalCta,
  hero,
  services,
  servicesLinkHref,
  tools,
} from "../content/home";
import { projects, stackIcons } from "../content/projects";

const featuredProjects = projects.filter((project) => project.featured);

function AccentDot() {
  return (
    <span
      className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent"
      aria-hidden="true"
    />
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Azeez Damilare Gbenga — Full-Stack Software Engineer</title>
        <meta name="description" content={hero.subhead} />
      </Helmet>

      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-bg py-16 md:py-24">
          <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-[11fr_9fr] md:gap-10">
            <div>
              <TagPill variant="tinted">
                <AccentDot />
                {hero.badgeText}
              </TagPill>

              <h1 className="mt-6 font-serif text-[clamp(2.5rem,4vw+1.5rem,5rem)] leading-[1.05] text-ink">
                {hero.headline.before}
                <span className="italic text-accent">{hero.headline.accent}</span>
                {hero.headline.after}
              </h1>

              <p className="mt-6 max-w-[46ch] font-sans text-base text-text-secondary">
                {hero.subhead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink to={hero.primaryCta.to} variant="primary">
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink to={hero.secondaryCta.to} variant="secondary">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>

              <p className="mt-8 font-sans text-xs text-text-muted">
                {hero.credentialLine}
              </p>
            </div>

            <div>
              <BrowserFrame url={hero.screenshotUrl} image={hero.screenshot} />
              <div className="mt-3 flex flex-col items-end gap-1.5">
                <TagPill variant="tinted">
                  <AccentDot />
                  {hero.liveBadgeLabel}
                </TagPill>
                <p className="font-sans text-xs text-text-muted">
                  {hero.liveCaption}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured work */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <SectionHeading
              title="Featured work"
              action={
                <Link
                  to="/portfolio"
                  className="font-sans text-sm text-accent-text underline"
                >
                  View all →
                </Link>
              }
            />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <div
                  key={project.slug}
                  className="overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <BrowserFrame
                    bordered={false}
                    url={project.links.live?.replace(/^https?:\/\//, "")}
                    image={project.screenshot}
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-ink">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      {project.stack.map((name) => {
                        const Icon = stackIcons[name];
                        return Icon ? (
                          <Icon
                            key={name}
                            className="h-4 w-4 text-text-muted"
                            aria-label={name}
                          />
                        ) : null;
                      })}
                    </div>
                    <p className="mt-3 font-sans text-sm text-text-secondary">
                      {project.oneLiner}
                    </p>
                    {project.links.caseStudy && (
                      <Link
                        to={project.links.caseStudy}
                        className="mt-3 inline-block font-sans text-sm text-accent-text underline"
                      >
                        View case study →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services */}
        <section className="bg-surface py-16 md:py-24">
          <Container>
            <SectionHeading title="What I can do for you" />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map(({ Icon, title, description }) => (
                <Card key={title}>
                  <Icon
                    className="h-6 w-6 text-accent-text"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {description}
                  </p>
                </Card>
              ))}
            </div>

            <p className="mt-8 text-center">
              <Link
                to={servicesLinkHref}
                className="font-sans text-sm text-accent-text underline"
              >
                See services and pricing →
              </Link>
            </p>
          </Container>
        </section>

        {/* Tools */}
        <section className="bg-surface-alt py-12 md:py-16">
          <Container>
            <SectionHeading title="Tools I work with" variant="label" />
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <TagPill key={tool}>{tool}</TagPill>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl text-ink md:text-4xl">
                {finalCta.headline.before}
                <span className="italic text-accent">
                  {finalCta.headline.accent}
                </span>
                {finalCta.headline.after}
              </h2>
              <p className="mt-4 font-sans text-base text-text-secondary">
                {finalCta.subline}
              </p>
              <div className="mt-8">
                <ButtonLink to={finalCta.button.to} variant="primary">
                  {finalCta.button.label}
                </ButtonLink>
              </div>
              <p className="mt-6 font-sans text-sm text-text-muted">
                {finalCta.referralLead}{" "}
                <Link
                  to={finalCta.referralHref}
                  className="text-accent-text underline"
                >
                  {finalCta.referralLinkLabel}
                </Link>
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
