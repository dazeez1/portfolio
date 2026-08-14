import { Link } from "react-router";
import { ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { HomeIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { defaultOgImage, twitterCardType } from "../content/site";
import {
  ghostNumeral,
  heading,
  helperLine,
  helpfulLinks,
  helpfulLinksTitle,
  primaryButton,
  secondaryButtons,
  subline,
} from "../content/notFound";

const metaTitle = "Page not found — Azeez Damilare Gbenga";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <>
        <title>{metaTitle}</title>
        <meta name="description" content={subline} />
        <meta name="robots" content="noindex, follow" />

        {/*
          No canonical here on purpose. This component renders at whatever URL
          failed to match — /nonsense, /portfolio/bad-slug, anything — so a
          self-referential canonical would canonicalise junk URLs, and a fixed
          one would tell Google a junk URL is really another page (a soft-404
          signal). `noindex` already keeps it out of the index, which makes a
          canonical inert here anyway.
        */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={subline} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={subline} />
        <meta name="twitter:image" content={defaultOgImage} />
      </>

      <Nav />

      <main className="flex flex-1 flex-col justify-center overflow-hidden bg-bg py-24 md:py-32">
        <Container className="relative flex flex-col items-center text-center">
          <div className="relative flex w-full flex-col items-center justify-center py-8 sm:py-12 md:py-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[7rem] text-border-decorative sm:text-[10rem] md:text-[14rem] lg:text-[18rem]"
            >
              {ghostNumeral}
            </span>
            <h1 className="relative font-serif text-4xl text-ink md:text-5xl">
              {heading}
            </h1>
          </div>

          <div className="relative">
            <p className="font-sans text-base text-text-secondary">
              {subline}
            </p>
            <p className="mt-1 font-sans text-sm text-text-muted">
              {helperLine}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink to={primaryButton.to} variant="primary">
                <HomeIcon className="h-4 w-4" aria-hidden="true" />
                {primaryButton.label}
              </ButtonLink>
              {secondaryButtons.map((button) => (
                <ButtonLink
                  key={button.to}
                  to={button.to}
                  variant="secondary"
                >
                  {button.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <div className="relative mt-16 w-full max-w-2xl rounded-lg border border-border bg-surface p-6 text-left">
            <p className="font-sans text-sm font-medium text-ink">
              {helpfulLinksTitle}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {helpfulLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-sans text-sm text-accent-text underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
