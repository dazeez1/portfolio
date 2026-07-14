export interface TimelineItemProps {
  /** Optional leading year/date label, e.g. "2021" or "Aug 2025". */
  year?: string;
  title: string;
  context: string;
  /** Accent-filled dot instead of the neutral outline. */
  isFirst?: boolean;
  /** Omits the connecting line below the dot. */
  isLast?: boolean;
}

export function TimelineItem({
  year,
  title,
  context,
  isFirst = false,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${
            isFirst ? "bg-accent" : "border-2 border-border-strong bg-surface"
          }`}
          aria-hidden="true"
        />
        {!isLast && (
          <span className="w-px flex-1 bg-border" aria-hidden="true" />
        )}
      </div>
      <div className={isLast ? "pb-0" : "pb-8"}>
        {year && (
          <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
            {year}
          </p>
        )}
        <p className="mt-0.5 font-sans text-sm font-medium text-ink">
          {title}
        </p>
        <p className="mt-1 font-sans text-xs text-text-muted">{context}</p>
      </div>
    </div>
  );
}
