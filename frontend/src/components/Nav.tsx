import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ButtonLink } from "./Button";
import {
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "./icons";

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Portfolio", to: "/portfolio", end: false },
  { label: "About", to: "/about", end: false },
  { label: "Services", to: "/services", end: false },
];

const resourceLinks = [
  { label: "SEO", to: "/seo" },
  { label: "Referrals", to: "/referrals" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `font-sans text-sm transition-colors ${
    isActive
      ? "text-accent-text underline decoration-2 underline-offset-4"
      : "text-ink hover:text-accent-text"
  }`;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "";
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist.
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-alt"
    >
      {theme === "light" ? (
        <MoonIcon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <SunIcon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          containerRef.current?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]',
          ) ?? [],
        );
        if (items.length === 0) return;
        const currentIndex = items.indexOf(
          document.activeElement as HTMLElement,
        );
        const nextIndex =
          e.key === "ArrowDown"
            ? currentIndex === -1
              ? 0
              : (currentIndex + 1) % items.length
            : currentIndex === -1
              ? items.length - 1
              : (currentIndex - 1 + items.length) % items.length;
        items[nextIndex]?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      containerRef.current
        ?.querySelector<HTMLElement>('[role="menuitem"]')
        ?.focus();
    }
  }, [open]);

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative" onBlur={handleBlur}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 font-sans text-sm text-ink transition-colors hover:text-accent-text"
      >
        Resources
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Resources"
          className="absolute left-0 top-full mt-2 min-w-[10rem] rounded-md border border-border bg-surface py-1 shadow-md"
        >
          {resourceLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 font-sans text-sm transition-colors hover:bg-surface-alt hover:text-accent-text ${
                  isActive ? "text-accent-text" : "text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export interface NavProps {
  /** Set false for non-sticky comparison copies (e.g. side-by-side theme demos). Default true. */
  sticky?: boolean;
}

export function Nav({ sticky = true }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = useId();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : "relative"} border-b border-border bg-bg`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          to="/"
          className="shrink-0 font-sans text-lg font-bold tracking-tight text-ink"
        >
          ADG
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <ResourcesDropdown />
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink to="/contact" variant="primary">
            Book a call
          </ButtonLink>
          <ThemeToggle />
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
        >
          {mobileOpen ? (
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <HamburgerIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div id={mobileMenuId} className="border-t border-border md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 ${navLinkClass({ isActive })}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 ${navLinkClass({ isActive })}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-2 ${navLinkClass({ isActive })}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-3 border-t border-border px-6 py-4">
            <ButtonLink
              to="/contact"
              variant="primary"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center"
            >
              Book a call
            </ButtonLink>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
