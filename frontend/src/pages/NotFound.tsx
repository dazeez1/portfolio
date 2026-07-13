import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { HomeIcon } from "../components/icons";
import { Nav } from "../components/Nav";
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

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — Azeez Damilare Gbenga</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Nav />

      <section className="relative overflow-hidden bg-bg py-24 md:py-32">
        <Container className="relative flex flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[8rem] text-border-strong sm:text-[12rem] md:text-[16rem] lg:text-[20rem]"
          >
            {ghostNumeral}
          </span>

          <div className="relative">
            <h1 className="font-serif text-4xl text-ink md:text-5xl">
              {heading}
            </h1>
            <p className="mt-4 font-sans text-base text-text-secondary">
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
      </section>

      <Footer />
    </>
  );
}
