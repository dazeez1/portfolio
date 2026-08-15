import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";

export interface AccordionItemData {
  question: string;
  answer: string;
  /**
   * Rich panel content, used instead of `answer` when present — e.g. the
   * legal pages' collapsed table of contents, which is a list of links.
   * FAQ usage keeps passing plain `answer` strings.
   */
  content?: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** Index of the item open by default. Omit for none open. */
  defaultOpenIndex?: number;
}

export function Accordion({ items, defaultOpenIndex }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null,
  );
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;

        return (
          <div
            key={item.question}
            className="rounded-lg border border-border bg-surface"
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-sm font-medium text-ink"
            >
              {item.question}
              <ChevronDownIcon
                className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {/*
              Always rendered, hidden when collapsed, rather than mounted on
              open. Two reasons:

              1. `aria-controls` must reference an element that exists. When
                 the panel was conditionally mounted the id pointed at nothing
                 for as long as the item stayed shut, which is invalid ARIA.
              2. The answers are content. Conditional mounting kept them out of
                 the prerendered HTML entirely, so every FAQ answer on
                 /contact, /seo and /referrals was invisible to crawlers
                 (CLAUDE.md Section 8). Hidden text still ships in the document.

              The `hidden` attribute (not a Tailwind class) does the hiding, so
              the panel is also removed from the tab order and the
              accessibility tree while collapsed — links inside a closed legal
              TOC must not be focusable.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-5 pb-4 font-sans text-sm text-text-secondary"
            >
              {item.content ?? item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
