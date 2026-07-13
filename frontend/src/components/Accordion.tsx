import { useId, useState } from "react";
import { ChevronDownIcon } from "./icons";

export interface AccordionItemData {
  question: string;
  answer: string;
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
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-5 pb-4 font-sans text-sm text-text-secondary"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
