import { Helmet } from "react-helmet-async";
import { Accordion } from "../components/Accordion";
import { BrowserFrame } from "../components/BrowserFrame";
import { ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { CheckIcon, SearchIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import {
  ctaBand,
  faqItems,
  faqSection,
  hero,
  meta,
  offerSection,
  offerings,
  plans,
  pricingSection,
  proofItems,
  proofSection,
} from "../content/seo";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";

const canonical = canonicalUrl(meta.path);

/**
 * Service + Offer structured data. Prices mirror content/seo.ts `priceValue`.
 * No ratings, reviews, or aggregate figures — none exist (CLAUDE.md Section 4).
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO services",
  description: hero.subhead,
  url: canonical,
  serviceType: "Search engine optimization",
  provider: {
    "@type": "Person",
    name: "Azeez Damilare Gbenga",
    url: canonicalUrl("/"),
  },
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: `${plan.tier} SEO`,
    description: plan.description,
    price: plan.priceValue,
    priceCurrency: "USD",
    url: canonicalUrl(plan.ctaHref),
  })),
};

export default function Seo() {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
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

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Nav />

      <main className="flex-1">
        {/* Hero — the one centred section on the page, as a landing hero. */}
        <section className="bg-bg py-16 md:py-20">
          <Container className="flex flex-col items-center text-center">
            <TagPill variant="tinted">
              <SearchIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
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

        {/* What I offer */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <SectionHeading title={offerSection.heading} />
            <p className="mt-2 font-sans text-base text-text-secondary">
              {offerSection.subline}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((offering) => (
                <Card key={offering.title}>
                  {/*
                    accent-text on tint: `tint` does not theme-swap, so the
                    brighter dark-mode accent would fail contrast on it
                    (CLAUDE.md 1.2) — same rule as TagPill's tinted variant.
                  */}
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint"
                    aria-hidden="true"
                  >
                    <offering.Icon className="h-5 w-5 text-accent-text" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg text-ink">
                    {offering.title}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {offering.bullets.map((bullet) => (
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

        {/* Real results */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <SectionHeading title={proofSection.heading} />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {proofItems.map((item) => (
                <Card key={item.title}>
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="mt-1 font-sans text-xs text-text-muted">
                    {item.caption}
                  </p>
                  <div className="mt-4">
                    {/*
                      Real screenshots pending from the owner. BrowserFrame
                      falls back to its neutral 16:10 placeholder on load
                      failure, so nothing stands in for the real thing.
                    */}
                    <BrowserFrame image={item.screenshot} />
                  </div>
                  <p className="mt-4 font-sans text-sm text-text-secondary">
                    {item.body}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading title={pricingSection.heading} />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.tier}
                  className={`flex flex-col rounded-lg border bg-surface p-6 ${
                    plan.emphasized
                      ? "order-first border-accent md:order-none"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                      {plan.tier}
                    </p>
                    {plan.badge && (
                      <TagPill variant="tinted">{plan.badge}</TagPill>
                    )}
                  </div>

                  <p className="mt-3 font-sans text-sm text-text-secondary">
                    {plan.description}
                  </p>

                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-ink">
                      {plan.price}
                    </span>
                    <span className="font-sans text-sm text-text-muted">
                      {plan.priceSuffix}
                    </span>
                  </p>
                  <p className="mt-1 font-sans text-xs text-text-muted">
                    {plan.maintenance}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 font-sans text-sm text-text-secondary"
                      >
                        {/* Identical treatment to the /services package cards. */}
                        <CheckIcon
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    to={plan.ctaHref}
                    variant={plan.emphasized ? "primary" : "secondary"}
                    className="mt-6 w-full"
                  >
                    {plan.ctaLabel}
                  </ButtonLink>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-[60ch] text-center font-sans text-sm text-text-muted">
              {pricingSection.maintenanceClarifier}
            </p>
          </Container>
        </section>

        {/* Ink CTA band */}
        <section className="bg-bg py-16 md:py-24">
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