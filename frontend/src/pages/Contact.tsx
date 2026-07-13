import { useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router";
import { Accordion } from "../components/Accordion";
import { Button, ButtonAnchor } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Select, Textarea, TextInput } from "../components/FormFields";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "../components/icons";
import { CalendarIcon, ClipboardIcon, CloseIcon, SendIcon } from "../components/icons";
import { Nav } from "../components/Nav";
import { TagPill } from "../components/TagPill";
import {
  afterYouWrite,
  booking,
  connectMethods,
  connectSubline,
  connectTitle,
  defaultMessagePlaceholder,
  emailPlaceholder,
  faqItems,
  faqSectionLabel,
  formHeader,
  header,
  messageLabel,
  namePlaceholder,
  needOptions,
  packageLabels,
  referralMessagePlaceholder,
  socialLabel,
  socialLinks,
  submitFailureMessage,
  submitLabel,
  submitMicrocopy,
} from "../content/contact";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const socialIcons = { GitHub: GithubIcon, LinkedIn: LinkedInIcon, Instagram: InstagramIcon };

function ConnectMethodRow({
  method,
}: {
  method: (typeof connectMethods)[number];
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(method.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions, insecure context) — button just won't confirm.
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
      <div className="flex min-w-0 items-center gap-3">
        <method.Icon
          className="h-5 w-5 shrink-0 text-text-muted"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
            {method.label}
          </p>
          <p className="truncate font-sans text-sm text-ink">
            {method.value}
          </p>
        </div>
      </div>
      {method.action.type === "copy" ? (
        <Button variant="secondary" onClick={handleCopy} className="shrink-0">
          <ClipboardIcon className="h-4 w-4" aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </Button>
      ) : (
        <ButtonAnchor
          href={method.action.href}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
          className="shrink-0"
        >
          {method.action.label}
        </ButtonAnchor>
      )}
    </div>
  );
}

export default function Contact() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get("package");
  const typeParam = searchParams.get("type");
  const isReferral = typeParam === "referral";

  const [chipDismissed, setChipDismissed] = useState(false);
  const preFillLabel = packageParam
    ? packageLabels[packageParam]
    : isReferral
      ? "Referral"
      : null;
  const showChip = !!preFillLabel && !chipDismissed;
  const showReferralPlaceholder = isReferral && !chipDismissed;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState(() =>
    packageParam ? "new-project" : isReferral ? "referral" : "",
  );
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const needRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleDismissChip() {
    setChipDismissed(true);
    setNeed("");
  }

  function openCalendly() {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: booking.calendlyUrl });
      return;
    }
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.setAttribute("data-calendly", "true");
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      window.Calendly?.initPopupWidget({ url: booking.calendlyUrl });
    };
    document.body.appendChild(script);
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!need) nextErrors.need = "Let me know what you need.";
    if (!message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.need) needRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const needLabel =
      needOptions.find((o) => o.value === need)?.label ?? need;
    const packageLabel = packageParam ? packageLabels[packageParam] : undefined;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          need: needLabel,
          message,
          package: packageLabel,
          type: isReferral ? "referral" : needLabel,
          company: honeypot,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(submitFailureMessage);
        setSubmitting(false);
        return;
      }

      navigate("/thank-you", {
        state: {
          reference: data.reference,
          request: needLabel,
          package: packageLabel,
        },
      });
    } catch {
      setSubmitError(submitFailureMessage);
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — Azeez Damilare Gbenga</title>
        <meta name="description" content={header.subhead} />
      </Helmet>

      <Nav />

      {/* Header */}
      <section className="bg-bg py-16 md:py-20">
        <Container>
          <p className="font-sans text-xs uppercase tracking-wide text-accent-text">
            {header.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
            {header.headline}
          </h1>
          <p className="mt-4 max-w-[60ch] font-sans text-base text-text-secondary">
            {header.subhead}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {header.trustChips.map(({ Icon, label }) => (
              <TagPill key={label} variant="tinted">
                <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </TagPill>
            ))}
          </div>
        </Container>
      </section>

      {/* Connect + Form */}
      <section className="bg-bg pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[42fr_58fr] md:items-start md:gap-10">
            {/* Left column */}
            <div>
              <h2 className="font-serif text-2xl text-ink">{connectTitle}</h2>
              <p className="mt-1 font-sans text-sm text-text-secondary">
                {connectSubline}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {connectMethods.map((method) => (
                  <ConnectMethodRow key={method.label} method={method} />
                ))}
              </div>

              <p className="mt-8 font-sans text-xs uppercase tracking-wide text-text-muted">
                {socialLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon =
                    socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <ButtonAnchor
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </ButtonAnchor>
                  );
                })}
              </div>

              <div className="mt-8 rounded-lg border border-dashed border-border-strong p-6">
                <p className="font-sans text-sm font-semibold text-ink">
                  {afterYouWrite.title}
                </p>
                <ol className="mt-4 flex flex-col gap-3">
                  {afterYouWrite.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tint font-sans text-xs font-semibold text-accent-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-0.5 font-sans text-sm text-text-secondary">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right column: form */}
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="bg-tint px-6 py-5">
                <p className="font-serif text-lg text-accent-text">
                  {formHeader.title}
                </p>
                <p className="mt-1 font-sans text-sm text-text-secondary">
                  {formHeader.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6" noValidate>
                {showChip && (
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-tint-border bg-tint px-3 py-1.5 font-sans text-sm text-accent-text">
                    Selected: {preFillLabel}
                    <button
                      type="button"
                      onClick={handleDismissChip}
                      aria-label="Remove selection"
                      className="rounded-full hover:opacity-70"
                    >
                      <CloseIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                )}

                {/* Honeypot — hidden from real users, silently dropped server-side if filled. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextInput
                    ref={nameRef}
                    label="Your name"
                    name="name"
                    placeholder={namePlaceholder}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                  />
                  <TextInput
                    ref={emailRef}
                    label="Your email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                </div>

                <div className="mt-4">
                  <Select
                    ref={needRef}
                    label="What do you need?"
                    name="need"
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    error={errors.need}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {needOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="mt-4">
                  <Textarea
                    ref={messageRef}
                    label={messageLabel}
                    name="message"
                    placeholder={
                      showReferralPlaceholder
                        ? referralMessagePlaceholder
                        : defaultMessagePlaceholder
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    rows={5}
                  />
                </div>

                {submitError && (
                  <p className="mt-4 font-sans text-sm text-error">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="mt-6 w-full"
                >
                  <SendIcon className="h-4 w-4" aria-hidden="true" />
                  {submitting ? "Sending…" : submitLabel}
                </Button>
                <p className="mt-3 text-center font-sans text-xs text-text-muted">
                  {submitMicrocopy}
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-lg border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                {booking.title}
              </h2>
              <p className="mt-1 font-sans text-sm text-text-secondary">
                {booking.subline}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={openCalendly}
              className="shrink-0"
            >
              <CalendarIcon className="h-4 w-4" aria-hidden="true" />
              {booking.buttonLabel}
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt py-16 md:py-24">
        <Container>
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
              {faqSectionLabel}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink">
              Frequently asked questions
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion items={faqItems} />
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
