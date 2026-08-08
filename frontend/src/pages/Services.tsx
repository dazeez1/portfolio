import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { CheckIcon, CloseIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import { booking } from "../content/contact";
import {
  type CompareValue,
  closingCard,
  compareRows,
  compareSection,
  customBand,
  hero,
  meta,
  packages,
  packagesSection,
  processSection,
  processSteps,
  serviceCardLabels,
  serviceCards,
} from "../content/services";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";
import { useCalendly } from "../hooks/useCalendly";

const canonical = canonicalUrl(meta.path);

/**
 * Service + Offer structured data. Prices mirror content/services.ts
 * `priceValue`; no ratings or reviews, since none exist (CLAUDE.md Section 4).
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web development services",
  description: hero.intro,
  url: canonical,
  serviceType: "Web development",
  provider: {
    "@type": "Person",
    name: "Azeez Damilare Gbenga",
    url: canonicalUrl("/"),
  },
  offers: packages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.name,
    description: pkg.description,
    price: pkg.priceValue,
    priceCurrency: "USD",
    url: canonicalUrl(pkg.ctaHref),
  })),
};

/** Shared check/cross renderer — colour is never the only signal. */
function CompareMark({ included, label }: { included: boolean; label: string }) {
  return included ? (
    <CheckIcon className="mx-auto h-4 w-4 text-success" aria-label={label} role="img" />
  ) : (
    <CloseIcon className="mx-auto h-4 w-4 text-error" aria-label={label} role="img" />
  );
}

function CompareCell({
  value,
  emphasized,
}: {
  value: CompareValue | undefined;
  emphasized: boolean;
}) {
  if (typeof value === "boolean") {
    return (
      <CompareMark
        included={value}
        label={value ? compareSection.includedLabel : compareSection.notIncludedLabel}
      />
    );
  }
  return (
    <span
      className={`font-sans text-sm ${
        emphasized ? "font-semibold text-ink" : "text-text-secondary"
      }`}
    >
      {value}
    </span>
  );
}

export default function Services() {
  const {
    loading: calendlyLoading,
    warmUp: warmUpCalendly,
    open: openCalendly,
  } = useCalendly(booking.calendlyUrl);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={hero.intro} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={hero.intro} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={hero.intro} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-bg py-16 md:py-20">
          <Container>
            <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl text-ink md:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-base text-text-secondary">
              {hero.intro}
            </p>
          </Container>
        </section>

        {/* Service cards */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {serviceCards.map((service) => (
                <Card key={service.title} className="flex flex-col">
                  {/*
                    accent-text, not accent: `tint` is deliberately not
                    theme-swapped in tokens.css, so it stays light peach in
                    dark mode. #D95D39/#E8825F on that fails contrast, while
                    accent-text (#B04525) passes in both themes — same rule
                    that governs TagPill's tinted variant (CLAUDE.md 1.2).
                  */}
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint"
                    aria-hidden="true"
                  >
                    <service.Icon className="h-5 w-5 text-accent-text" />
                  </span>
                  <h2 className="mt-5 font-serif text-xl text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {service.description}
                  </p>

                  <p className="mt-6 font-sans text-xs uppercase tracking-wide text-text-muted">
                    {serviceCardLabels.youGet}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {service.youGet.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 font-sans text-sm text-text-secondary"
                      >
                        <span aria-hidden="true">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 font-sans text-xs uppercase tracking-wide text-text-muted">
                    {serviceCardLabels.builtWith}
                  </p>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {service.builtWith}
                  </p>

                  <p className="mt-5 font-sans text-xs uppercase tracking-wide text-text-muted">
                    {serviceCardLabels.timeline}
                  </p>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {service.timeline}
                  </p>

                  <Link
                    to={serviceCardLabels.ctaHref}
                    className="mt-6 inline-block font-sans text-sm text-accent-text underline"
                  >
                    {serviceCardLabels.cta}
                  </Link>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Packages and pricing */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading title={packagesSection.heading} />
            <p className="mt-2 font-sans text-base text-text-secondary">
              {packagesSection.subline}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`flex flex-col rounded-lg border bg-surface p-6 ${
                    pkg.emphasized
                      ? "order-first border-accent md:order-none"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                      {pkg.tier}
                    </p>
                    {pkg.badge && <TagPill variant="tinted">{pkg.badge}</TagPill>}
                  </div>

                  <h3 className="mt-3 font-serif text-xl text-ink">{pkg.name}</h3>
                  <p className="mt-3 font-sans text-xs text-text-muted">
                    {pkg.pricePrefix}
                  </p>
                  <p className="font-serif text-4xl text-ink">{pkg.price}</p>
                  <p className="mt-2 font-sans text-sm text-text-secondary">
                    {pkg.description}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 font-sans text-sm text-text-secondary"
                      >
                        <CheckIcon
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    to={pkg.ctaHref}
                    variant={pkg.emphasized ? "primary" : "secondary"}
                    className="mt-6 w-full"
                  >
                    {pkg.ctaLabel}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Compare packages */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <SectionHeading title={compareSection.heading} />

            {/* Mobile: one block per package, no horizontal scroll. */}
            <div className="mt-8 flex flex-col gap-6 md:hidden">
              {(["starter", "business", "platform"] as const).map((key, colIndex) => (
                <div
                  key={key}
                  className="overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <p className="border-b border-border bg-surface-alt px-5 py-3 font-sans text-xs uppercase tracking-wide text-text-muted">
                    {compareSection.columnLabels[colIndex]}
                  </p>
                  <dl className="divide-y divide-border">
                    {compareRows
                      .filter((row) => !row.groupLabel)
                      .map((row) => (
                        <div
                          key={row.feature}
                          className="flex items-center justify-between gap-4 px-5 py-3"
                        >
                          <dt className="font-sans text-sm text-text-secondary">
                            {row.feature}
                          </dt>
                          <dd className="shrink-0 text-right">
                            <CompareCell
                              value={row[key]}
                              emphasized={row.emphasize === key}
                            />
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              ))}
            </div>

            {/* Desktop: real semantic table. */}
            <div className="mt-8 hidden overflow-hidden rounded-lg border border-border bg-surface md:block">
              <table className="w-full border-collapse">
                <caption className="sr-only">
                  {compareSection.heading}
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="px-5 py-3 text-left font-sans text-xs uppercase tracking-wide text-text-muted"
                    >
                      {compareSection.featureColumnLabel}
                    </th>
                    {compareSection.columnLabels.map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-5 py-3 text-center font-sans text-xs uppercase tracking-wide text-text-muted"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) =>
                    row.groupLabel ? (
                      <tr key={`group-${i}`} className="border-b border-border">
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="bg-surface-alt px-5 py-2.5 text-left font-sans text-xs uppercase tracking-wide text-text-muted"
                        >
                          {row.feature}
                        </th>
                      </tr>
                    ) : (
                      <tr
                        key={`row-${i}`}
                        className="border-b border-border last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="px-5 py-3 text-left font-sans text-sm font-normal text-text-secondary"
                        >
                          {row.feature}
                        </th>
                        <td className="px-5 py-3 text-center">
                          <CompareCell
                            value={row.starter}
                            emphasized={row.emphasize === "starter"}
                          />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <CompareCell
                            value={row.business}
                            emphasized={row.emphasize === "business"}
                          />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <CompareCell
                            value={row.platform}
                            emphasized={row.emphasize === "platform"}
                          />
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Custom band */}
        <section className="bg-bg pb-16 md:pb-24">
          <Container>
            {/*
              button-primary-bg/text is the documented inverting pair
              (CLAUDE.md Section 1: primary buttons invert in dark mode), so
              this band stays a high-contrast inverse of the page in both
              themes instead of going light-on-light in dark mode.
            */}
            <div className="flex flex-col gap-6 rounded-lg bg-button-primary-bg p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <div>
                <h2 className="font-sans text-lg font-semibold text-button-primary-text">
                  {customBand.title}
                </h2>
                <p className="mt-1 font-sans text-sm text-button-primary-text opacity-80">
                  {customBand.subline}
                </p>
              </div>
              <ButtonLink to={customBand.ctaHref} variant="inverted">
                {customBand.ctaLabel}
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section className="bg-surface-alt py-16 md:py-24">
          <Container>
            <SectionHeading title={processSection.heading} />
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

        {/* Closing card */}
        <section className="bg-bg py-16 md:py-24">
          <Container>
            <div className="flex flex-col items-center rounded-lg border border-border bg-surface p-8 text-center md:p-12">
              {/*
                accent-text on tint, matching TagPill's tinted variant. `ink`
                would be wrong here: it swaps to #F0EBE3 in dark mode and
                `tint` does not swap, so ink-on-tint is invisible on dark.
              */}
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-tint font-serif text-xl text-accent-text"
                aria-hidden="true"
              >
                ?
              </span>
              <h2 className="mt-5 font-serif text-2xl text-ink md:text-3xl">
                {closingCard.title}
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base text-text-secondary">
                {closingCard.subline}
              </p>
              <Button
                variant="accent"
                onClick={openCalendly}
                onPointerEnter={warmUpCalendly}
                onTouchStart={warmUpCalendly}
                disabled={calendlyLoading}
                className="mt-6"
              >
                {calendlyLoading ? closingCard.loadingLabel : closingCard.ctaLabel}
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}