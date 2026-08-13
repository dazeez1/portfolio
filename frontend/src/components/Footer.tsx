import { Link } from "react-router";
import { Container } from "./Container";
import {
  DownloadIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";
import { externalRel, footerSocials } from "../content/social";

const socialIconFor = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
  Instagram: InstagramIcon,
} as const;

// Social URLs and brand hover colours come from content/social.ts —
// single source shared with /contact.

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-alt">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-ink">
            Azeez Damilare Gbenga
          </p>
          <p className="mt-2 max-w-[28ch] font-sans text-sm text-text-secondary">
            Full-stack systems built to solve real problems.
          </p>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
            Contact
          </p>
          <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-text-secondary">
            <li>
              <a
                href="mailto:azeezdamilare31@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-accent-text"
              >
                <MailIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                azeezdamilare31@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+250798203134"
                className="flex items-center gap-2 transition-colors hover:text-accent-text"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                +250 798 203 134
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              Kigali, Rwanda
            </li>
            <li>
              <a
                href="/resume.pdf"
                download="Azeez_Damilare_Gbenga_CV.pdf"
                className="flex items-center gap-2 transition-colors hover:text-accent-text"
              >
                <DownloadIcon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                Resume
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
            Follow me
          </p>
          <div className="mt-3 flex items-center gap-3">
            {footerSocials.map(({ label, href, hoverClass }) => {
              const Icon = socialIconFor[label];
              return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel={externalRel}
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink motion-safe:transition-colors ${hoverClass}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-4 font-sans text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Azeez Damilare Gbenga. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-accent-text">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent-text">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
