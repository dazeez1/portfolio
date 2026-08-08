import { Card } from "./Card";

export interface MetricCardProps {
  /** String, not number — metrics include formats like "95/100/96" or "−82%". */
  value: string;
  label: string;
  /** Ink/dark fill with light text — for the single highest-value metric in a row. */
  featured?: boolean;
  className?: string;
}

export function MetricCard({
  value,
  label,
  featured = false,
  className = "",
}: MetricCardProps) {
  if (featured) {
    return (
      <div
        className={`flex flex-col items-center rounded-lg bg-button-primary-bg p-6 text-center ${className}`}
      >
        <p className="font-serif text-4xl text-button-primary-text">{value}</p>
        <p className="mt-2 font-sans text-xs uppercase tracking-wide text-button-primary-text opacity-80">
          {label}
        </p>
      </div>
    );
  }

  return (
    <Card className={`flex flex-col items-center text-center ${className}`}>
      <p className="font-serif text-4xl text-ink">{value}</p>
      <p className="mt-2 font-sans text-xs uppercase tracking-wide text-text-muted">
        {label}
      </p>
    </Card>
  );
}
