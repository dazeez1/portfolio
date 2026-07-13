import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ButtonAnchor, ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { DownloadIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import { TimelineItem } from "../components/TimelineItem";
import {
  beyondTheCode,
  beyondTheCodeTitle,
  certifications,
  closingCta,
  degree,
  educationTitle,
  howIWork,
  howIWorkTitle,
  intro,
  journey,
  journeyTitle,
  skills,
  skillsTitle,
} from "../content/about";

function IntroPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-surface-alt">
        <span className="font-sans text-xs text-text-muted">
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[4/5] w-full rounded-2xl object-cover"
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Azeez Damilare Gbenga</title>
        <meta name="description" content={intro.lead} />
      </Helmet>

      <Nav />

      {/* Intro */}
      <section className="bg-bg py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
          <div className="order-2 md:order-1">
            <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
              {intro.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
              {intro.headline}
            </h1>
            <p className="mt-4 font-sans text-base text-text-secondary">
              {intro.lead}
            </p>
            {intro.bioParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 font-sans text-base text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonAnchor
                href={intro.primaryButton.href}
                download
                variant="primary"
              >
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                {intro.primaryButton.label}
              </ButtonAnchor>
              <ButtonLink to={intro.secondaryButton.to} variant="secondary">
                {intro.secondaryButton.label}
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <IntroPhoto src={intro.photo.src} alt={intro.photo.alt} />
          </div>
        </Container>
      </section>

      {/* My journey */}
      <section className="bg-bg py-16 md:py-24">
        <Container className="max-w-3xl">
          <SectionHeading title={journeyTitle} />
          <div className="mt-8">
            {journey.map((entry, index) => (
              <TimelineItem
                key={entry.title}
                title={entry.title}
                context={entry.context}
                isFirst={index === 0}
                isLast={index === journey.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* How I work */}
      <section className="bg-surface-alt py-16 md:py-24">
        <Container>
          <SectionHeading title={howIWorkTitle} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {howIWork.map(({ Icon, title, description }) => (
              <Card key={title}>
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-base font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-sm text-text-secondary">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="bg-bg py-16 md:py-24">
        <Container>
          <SectionHeading title={skillsTitle} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.map(({ Icon, title, skills: skillList }) => (
              <Card key={title}>
                <div className="flex items-center gap-2">
                  <Icon
                    className="h-5 w-5 text-text-muted"
                    aria-hidden="true"
                  />
                  <h3 className="font-sans text-sm font-bold text-ink">
                    {title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <TagPill key={skill}>{skill}</TagPill>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Education and certifications */}
      <section className="bg-surface-alt py-16 md:py-24">
        <Container>
          <SectionHeading title={educationTitle} />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <h3 className="font-serif text-xl text-ink">{degree.title}</h3>
              <p className="mt-2 font-sans text-sm text-text-secondary">
                {degree.institution}
              </p>
              <p className="mt-1 font-sans text-sm text-text-muted">
                {degree.detail}
              </p>
            </Card>
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="font-sans text-sm text-ink">
                    {cert.name}
                  </span>
                  <span className="shrink-0 font-sans text-xs text-text-muted">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Beyond the code */}
      <section className="bg-bg py-16 md:py-24">
        <Container>
          <SectionHeading title={beyondTheCodeTitle} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {beyondTheCode.map(({ role, company, description }) => (
              <Card key={company}>
                <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
                  {role}
                </p>
                <h3 className="mt-1 font-sans text-base font-bold text-ink">
                  {company}
                </h3>
                <p className="mt-2 font-sans text-sm text-text-secondary">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-surface-alt py-16 md:py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            {closingCta.heading}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonAnchor
              href={closingCta.primaryButton.href}
              download
              variant="primary"
            >
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              {closingCta.primaryButton.label}
            </ButtonAnchor>
            <ButtonLink to={closingCta.secondaryButton.to} variant="secondary">
              {closingCta.secondaryButton.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
