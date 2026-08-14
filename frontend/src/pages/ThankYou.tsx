import { useLocation } from "react-router";
import { ButtonAnchor, ButtonLink } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { CheckIcon, WhatsAppIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { thankYou } from "../content/thankyou";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";

interface ThankYouState {
  reference?: string;
  request?: string;
  package?: string;
}

const metaTitle = "Message received — Azeez Damilare Gbenga";
const canonical = canonicalUrl("/thank-you");

export default function ThankYou() {
  const location = useLocation();
  const state = (location.state ?? {}) as ThankYouState;

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <title>{metaTitle}</title>
        <meta name="description" content={thankYou.subline} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={thankYou.subline} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={thankYou.subline} />
        <meta name="twitter:image" content={defaultOgImage} />
      </>

      <Nav />

      <main className="flex flex-1 flex-col justify-center bg-bg py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent">
              <CheckIcon className="h-7 w-7 text-accent" aria-hidden="true" />
            </div>

            <h1 className="mt-6 font-serif text-4xl text-ink">
              {thankYou.headline}
            </h1>
            <p className="mt-4 font-sans text-base text-text-secondary">
              {thankYou.subline}
            </p>

            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface text-left">
              <div className="bg-tint px-6 py-3">
                <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
                  {thankYou.summaryLabel}
                </p>
              </div>
              <dl>
                <div className="flex items-center justify-between border-b border-border px-6 py-3">
                  <dt className="font-sans text-xs uppercase tracking-wide text-text-muted">
                    Reference
                  </dt>
                  <dd className="font-sans text-sm font-semibold text-ink">
                    {state.reference ?? "—"}
                  </dd>
                </div>
                <div
                  className={`flex items-center justify-between px-6 py-3 ${state.package ? "border-b border-border" : ""}`}
                >
                  <dt className="font-sans text-xs uppercase tracking-wide text-text-muted">
                    Request
                  </dt>
                  <dd className="font-sans text-sm text-ink">
                    {state.request ?? "—"}
                  </dd>
                </div>
                {state.package && (
                  <div className="flex items-center justify-between px-6 py-3">
                    <dt className="font-sans text-xs uppercase tracking-wide text-text-muted">
                      Package
                    </dt>
                    <dd className="font-sans text-sm text-ink">
                      {state.package}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 rounded-lg border border-dashed border-border-strong p-6 text-left sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-sans text-sm font-semibold text-ink">
                  {thankYou.referral.title}
                </p>
                <p className="mt-1 font-sans text-sm text-text-secondary">
                  {thankYou.referral.subline}
                </p>
              </div>
              <ButtonLink
                to={thankYou.referral.href}
                variant="secondary"
                className="shrink-0"
              >
                {thankYou.referral.buttonLabel}
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink to={thankYou.primaryButton.to} variant="primary">
                {thankYou.primaryButton.label}
              </ButtonLink>
              <ButtonAnchor
                href={thankYou.secondaryButton.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                {thankYou.secondaryButton.label}
              </ButtonAnchor>
            </div>

            <p className="mt-8 font-sans text-xs text-text-muted">
              {thankYou.footnote}
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
