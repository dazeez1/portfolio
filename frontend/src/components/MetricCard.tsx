import { Card } from "./Card";

export interface MetricCardProps {
  /** String, not number — metrics include formats like "95/100/96" or "−82%". */
  value: string;
  label: string;
  className?: string;
}

export function MetricCard({ value, label, className = "" }: MetricCardProps) {
  return (
    <Card className={`flex flex-col items-center text-center ${className}`}>
      <p className="font-serif text-4xl text-ink">{value}</p>
      <p className="mt-2 font-sans text-xs uppercase tracking-wide text-text-muted">
        {label}
      </p>
    </Card>
  );
}
