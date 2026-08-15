import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
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

/*
 * Stateless by design. `<html data-theme>` is the single source of truth: the
 * inline script in root.tsx sets it before first paint, and this component
 * reads and writes that attribute directly.
 *
 * Nothing in the returned markup depends on the current theme, so the
 * prerendered HTML and the first client render are identical — there is no
 * hydration mismatch to fix. The correct icon and label still appear at first
 * paint because CSS keys off the same `data-theme` attribute (see the
 * `.theme-only-*` rules in styles/base.css), which is why this reads the DOM
 * rather than holding React state: state would have to be resolved after mount
 * and the icon would visibly flip.
 */
function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next === "dark" ? "dark" : "";

    /*
     * Keep the browser-chrome tint in step with the page. The same meta is set
     * pre-paint by the inline script in root.tsx; this is the other half, for
     * a toggle after load. Values match --bg light/dark in styles/tokens.css.
     */
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#191613" : "#faf7f2");

    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-alt"
    >
      {/*
        Both states ship in the markup and CSS shows exactly one. The label is
        real text rather than aria-label so the accessible name is correct at
        first paint too — an aria-label would have to be corrected after mount.
      */}
      <span className="theme-only-light">
        <MoonIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Switch to dark mode</span>
      </span>
      <span className="theme-only-dark">
        <SunIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Switch to light mode</span>
      </span>
    </button>
  );
}

/**
 * Desktop Resources panel — a full-bleed band that drops below the header.
 *
 * State lives in `Nav` rather than here because the panel must escape the
 * shared `Container`'s max-width to reach the viewport edges. The panel is
 * therefore a sibling of the Container, positioned against the `<header>`,
 * with its two links centred inside the Container so they sit in the middle
 * of the page.
 *
 * Opening is click-only. There is deliberately no hover-open and no
 * close-on-blur: both make the panel feel like it fights the user on touch,
 * where a tap registers as hover-then-click. Dismissal is explicit —
 * Escape, click outside, or choosing a link.
 *
 * Kept mounted (rather than conditionally rendered) so open/close can
 * transition; `inert` + `aria-hidden` keep it out of the tab order and the
 * accessibility tree while closed, and the transition is `motion-safe:` so it
 * disappears entirely under prefers-reduced-motion (CLAUDE.md Section 9).
 */
function ResourcesPanel({
  open,
  menuId,
  onClose,
  panelRef,
}: {
  open: boolean;
  menuId: string;
  onClose: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={panelRef}
      id={menuId}
      role="menu"
      aria-label="Resources"
      aria-hidden={!open}
      inert={!open}
      className={`absolute inset-x-0 top-full z-50 hidden bg-button-primary-bg shadow-lg md:block motion-safe:transition-[opacity,transform] motion-safe:duration-150 ${
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <Container className="flex items-center justify-center gap-8 py-6">
        {resourceLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            role="menuitem"
            onClick={onClose}
            className={({ isActive }) =>
              // Active = the current route: plain band text with an accent
              // underline. Inactive is dimmed band text with no border — a
              // border here reads as "disabled" rather than "not current".
              `font-sans text-sm transition-colors ${
                isActive
                  ? "text-button-primary-text underline decoration-accent decoration-2 underline-offset-8"
                  : "text-button-primary-text opacity-70 hover:opacity-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </Container>
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

  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesMenuId = useId();
  const resourcesTriggerRef = useRef<HTMLButtonElement>(null);
  const resourcesPanelRef = useRef<HTMLDivElement>(null);

  function closeResources() {
    setResourcesOpen(false);
  }

  useEffect(() => {
    if (!resourcesOpen) return;

    // Click-outside covers both the trigger and the full-bleed panel, since
    // they are no longer inside a single wrapper element.
    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !resourcesPanelRef.current?.contains(target) &&
        !resourcesTriggerRef.current?.contains(target)
      ) {
        setResourcesOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setResourcesOpen(false);
        resourcesTriggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          resourcesPanelRef.current?.querySelectorAll<HTMLElement>(
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
  }, [resourcesOpen]);

  useEffect(() => {
    if (resourcesOpen) {
      resourcesPanelRef.current
        ?.querySelector<HTMLElement>('[role="menuitem"]')
        ?.focus();
    }
  }, [resourcesOpen]);

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
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          to="/"
          className="shrink-0 font-sans text-lg font-bold tracking-tight text-ink"
        >
          ADG
        </Link>

        {/*
          Labelled because the site has more than one navigation landmark —
          the footer's link lists are navigation too. With two unlabelled
          <nav>s a screen-reader user gets "navigation" twice and cannot tell
          them apart; the label is what makes the landmark list useful.
        */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                ref={resourcesTriggerRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={resourcesOpen}
                aria-controls={resourcesMenuId}
                onClick={() => setResourcesOpen((o) => !o)}
                className="flex items-center gap-1 font-sans text-sm text-ink transition-colors hover:text-accent-text"
              >
                Resources
                <ChevronDownIcon
                  className={`h-3.5 w-3.5 motion-safe:transition-transform ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

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
      </Container>

      <ResourcesPanel
        open={resourcesOpen}
        menuId={resourcesMenuId}
        onClose={closeResources}
        panelRef={resourcesPanelRef}
      />

      {/*
        Kept mounted and hidden rather than conditionally rendered, for the
        same reason as the Accordion panel: the hamburger's `aria-controls`
        pointed at an id that was absent from the document whenever the menu
        was shut. `hidden` keeps it out of the tab order and the accessibility
        tree, so closed-menu behaviour is unchanged.
      */}
      <div
        id={mobileMenuId}
        hidden={!mobileOpen}
        className="border-t border-border md:hidden"
      >
        {/*
            Same label as the desktop landmark: only one of the two is ever in
            the accessibility tree, since each is display:none at the other's
            breakpoint and this one sits inside a `hidden` wrapper while the
            menu is closed.
          */}
        <nav aria-label="Primary">
          <Container as="ul" className="flex flex-col gap-1 py-4">
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
          </Container>
        </nav>
        <Container className="flex items-center gap-3 border-t border-border py-4">
          <ButtonLink
            to="/contact"
            variant="primary"
            onClick={() => setMobileOpen(false)}
            className="flex-1 text-center"
          >
            Book a call
          </ButtonLink>
          <ThemeToggle />
        </Container>
      </div>
    </header>
  );
}
