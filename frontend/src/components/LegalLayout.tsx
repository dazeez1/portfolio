import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Accordion } from "./Accordion";
import { Card } from "./Card";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import type { LegalBlock, LegalDocument } from "../content/legal";
import { canonicalUrl, defaultOgImage, twitterCardType } from "../content/site";

/**
 * Shared layout for legal documents (/privacy, /terms). Renders entirely from
 * a LegalDocument, so nothing document-specific belongs in here.
 */

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-4 font-sans text-base leading-relaxed text-text-secondary"
              >
                {block.text}
              </p>
            );

          case "labeled":
            // Bold lead-in label, regular body — the label is emphasis, not a
            // wholly bold bullet.
            return (
              <ul key={i} className="mt-4 flex flex-col gap-3">
                {block.items.map((item) => (
                  <li
                    key={item.label}
                    className="font-sans text-base leading-relaxed text-text-secondary"
                  >
                    <strong className="font-semibold text-ink">
                      {item.label}
                    </strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            );

          case "services":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-3">
                {block.items.map((item) => (
                  <li
                    key={item.name}
                    className="font-sans text-base leading-relaxed text-text-secondary"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent-text underline"
                    >
                      {item.name}
                    </a>{" "}
                    — {item.text}
                  </li>
                ))}
              </ul>
            );

          case "contacts":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-2">
                {block.items.map((item) => (
                  <li key={item.text} className="font-sans text-base">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-accent-text underline"
                      >
                        {item.text}
                      </a>
                    ) : item.to ? (
                      <Link to={item.to} className="text-accent-text underline">
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-text-secondary">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </>
  );
}

/** Tracks which section is currently in view, for the sidebar TOC. */
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  // Clicking a TOC link must mark that link active even when the page cannot
  // scroll far enough to bring its heading up — the last few sections all sit
  // on screen together at the bottom. The click wins briefly while the
  // resulting scroll settles, then the observer resumes.
  const suppressUntil = useRef(0);

  const selectFromClick = useCallback((id: string) => {
    suppressUntil.current = Date.now() + 700;
    setActiveId(id);
  }, []);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // A section boundary crossing is the only moment the answer can change, so
    // the observer is the trigger — but "which section am I reading" is then
    // resolved by measuring, not by which entries happen to be intersecting.
    // Picking the topmost intersecting entry is wrong: a tall section spans the
    // detection band and keeps winning after the next heading has scrolled past.
    // A heading counts as "reached" once it rises into the upper third of the
    // viewport — forgiving enough that free scrolling feels right, while an
    // anchor jump (which lands the heading at 96px) is comfortably inside it.
    function readingLine() {
      return Math.max(120, window.innerHeight * 0.3);
    }

    function resolveActive() {
      if (Date.now() < suppressUntil.current) return;
      const line = readingLine();
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      // At the very bottom, a short final section may never cross the reading
      // line; treat reaching the end of the page as reaching the last section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        window.document.documentElement.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1].id;
      setActiveId(current);
    }

    const observer = new IntersectionObserver(resolveActive, {
      rootMargin: "-96px 0px -55% 0px",
      threshold: 0,
    });

    elements.forEach((el) => observer.observe(el));
    resolveActive();
    return () => observer.disconnect();
  }, [ids]);

  return { activeId, selectFromClick };
}

export function LegalLayout({ document: doc }: { document: LegalDocument }) {
  const ids = doc.sections.map((s) => s.id);
  const { activeId, selectFromClick } = useActiveSection(ids);
  const canonical = canonicalUrl(doc.path);

  const tocLinks = doc.sections.map((section, i) => ({
    ...section,
    number: i + 1,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <title>{doc.metaTitle}</title>
        <meta name="description" content={doc.metaDescription} />
        <link rel="canonical" href={canonical} />
        {/* Legal pages should not compete with real content in search. */}
        <meta name="robots" content="noindex, follow" />

        {/*
          OG/Twitter despite the noindex: robots stops indexing, not link
          previews, so a legal URL shared in a chat or email still needs a
          title, description and image rather than rendering bare.
        */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={doc.metaTitle} />
        <meta property="og:description" content={doc.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />

        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:title" content={doc.metaTitle} />
        <meta name="twitter:description" content={doc.metaDescription} />
        <meta name="twitter:image" content={defaultOgImage} />
      </>

      <Nav />

      <main className="flex-1 bg-bg py-12 md:py-16">
        <Container className="lg:flex lg:gap-12">
          {/* Mobile / tablet: collapsed TOC above the article. */}
          <div className="lg:hidden">
            <Accordion
              items={[
                {
                  question: doc.tocLabel,
                  answer: "",
                  content: (
                    <ol className="flex flex-col gap-2">
                      {tocLinks.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="font-sans text-sm text-text-secondary hover:text-accent-text"
                          >
                            {section.number}. {section.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  ),
                },
              ]}
            />
          </div>

          {/* Desktop: sticky sidebar TOC. */}
          <nav
            aria-label={doc.tocLabel}
            className="hidden w-56 shrink-0 lg:block"
          >
            <div className="sticky top-24">
              <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                {doc.tocLabel}
              </p>
              <ol className="mt-4 flex flex-col">
                {tocLinks.map((section) => {
                  const isActive = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={() => selectFromClick(section.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`block border-l-2 py-1.5 pl-3 font-sans text-sm transition-colors ${
                          isActive
                            ? "border-accent font-medium text-accent-text"
                            : "border-border text-text-secondary hover:text-accent-text"
                        }`}
                      >
                        {section.number}. {section.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <article className="mt-10 max-w-[68ch] lg:mt-0">
            <h1 className="font-serif text-4xl text-ink md:text-5xl">
              {doc.title}
            </h1>
            <p className="mt-3 font-sans text-sm text-text-muted">
              {doc.lastUpdated}
            </p>

            {doc.summary && (
              <>
                <Card tone="alt" className="mt-8">
                  <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                    {doc.summary.label}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {doc.summary.items.map((item) => (
                      <li
                        key={item.label}
                        className="font-sans text-base leading-relaxed text-text-secondary"
                      >
                        <strong className="font-semibold text-ink">
                          {item.label}
                        </strong>{" "}
                        — {item.text}
                      </li>
                    ))}
                  </ul>
                </Card>
                <p className="mt-3 font-sans text-sm text-text-muted">
                  {doc.summary.footnote}
                </p>
              </>
            )}

            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="mt-10 scroll-mt-24"
              >
                <h2 className="font-serif text-2xl text-ink">
                  {i + 1}. {section.title}
                </h2>
                <Blocks blocks={section.body} />
              </section>
            ))}
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}