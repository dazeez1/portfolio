import { Accordion } from "../components/Accordion";
import { ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import {
  benefits,
  benefitsSection,
  commissionSection,
  commissionTiers,
  ctaBand,
  faqItems,
  faqSection,
  hero,
  heroBadgeIcon as HeroBadgeIcon,
  meta,
  processSection,
  processSteps,
} from "../content/referrals";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";

const canonical = canonicalUrl(meta.path);

/**
 * FAQPage structured data only. Deliberately no Offer/price markup: these are
 * referral commissions paid out, not products offered for sale, so Offer would
 * misrepresent them to crawlers.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Small uppercase eyebrow above a section heading. Muted, never accent
 * (CLAUDE.md Section 1 rule 3 — the accent budget is spent on the icon tiles).
 */
function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
      {children}
    </p>
  );
}

export default function Referrals() {
  return (
    <div className="flex min-h-screen flex-col">
      <>
        <title>{meta.title}</title>
        <meta name="description" content={hero.subhead} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={hero.subhead} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={hero.subhead} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </>

      <Nav />

      <main className="flex-1">
        {/* Hero — the only centred section, matching /seo. */}
        <section className="bg-bg py-16 md:py-20">
          <Container className="flex flex-col items-center text-center">
            <TagPill variant="tinted">
              <HeroBadgeIcon
                className="mr-1.5 h-3.5 w-3.5"
                aria-hidden="true"
              />
              {hero.badge}
            </TagPill>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl text-ink md:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-base text-text-secondary">
              {hero.subhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink to={hero.primaryCta.to} variant="primary">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.to} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Commission structure */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <Eyebrow>{commissionSection.eyebrow}</Eyebrow>
            <SectionHeading title={commissionSection.heading} className="mt-2" />
            <p className="mt-2 font-sans text-base text-text-secondary">
              {commissionSection.subline}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {commissionTiers.map((tier) => (
                <Card key={tier.title}>
                  {/*
                    accent-text on tint: `tint` is not theme-swapped in
                    tokens.css, so the brighter dark-mode accent would fail
                    contrast on it (CLAUDE.md 1.2).
                  */}
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint"
                    aria-hidden="true"
                  >
                    <tier.Icon className="h-5 w-5 text-accent-text" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg text-ink">
                    {tier.title}
                  </h3>
                  <p className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl text-ink">
                      {tier.amount}
                    </span>
                    {tier.amountNote && (
                      <span className="font-sans text-xs text-text-muted">
                        {tier.amountNote}
                      </span>
                    )}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 font-sans text-sm text-text-secondary"
                      >
                        <span aria-hidden="true">·</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section
          id={processSection.id}
          className="scroll-mt-24 bg-surface-alt py-16 md:py-24"
        >
          <Container>
            <Eyebrow>{processSection.eyebrow}</Eyebrow>
            <SectionHeading title={processSection.heading} className="mt-2" />
            <p className="mt-2 font-sans text-base text-text-secondary">
              {processSection.subline}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <Card key={step.number}>
                  <span className="inline-flex items-center justify-center rounded-lg bg-tint px-3 py-1.5 font-serif text-lg text-accent-text">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Why refer */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <Eyebrow>{benefitsSection.eyebrow}</Eyebrow>
            <SectionHeading title={benefitsSection.heading} className="mt-2" />
            <p className="mt-2 font-sans text-base text-text-secondary">
              {benefitsSection.subline}
            </p>

            {/* Solid Card borders — the Figma's dashed border reads as disabled. */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint"
                    aria-hidden="true"
                  >
                    <benefit.Icon className="h-5 w-5 text-accent-text" />
                  </span>
                  <h3 className="mt-5 font-sans text-base font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Ink CTA band */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <div className="flex flex-col gap-6 rounded-lg bg-button-primary-bg p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <div>
                <h2 className="font-serif text-2xl text-button-primary-text">
                  {ctaBand.title}
                </h2>
                <p className="mt-2 max-w-md font-sans text-sm text-button-primary-text opacity-80">
                  {ctaBand.subline}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink to={ctaBand.primaryCta.to} variant="inverted">
                  {ctaBand.primaryCta.label}
                </ButtonLink>
                <ButtonLink
                  to={ctaBand.secondaryCta.to}
                  variant="invertedOutline"
                >
                  {ctaBand.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <SectionHeading title={faqSection.heading} />
            <div className="mt-8">
              <Accordion items={faqItems} />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}