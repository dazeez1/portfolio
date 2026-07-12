import { Button } from "../components/Button";
import { Card } from "../components/Card";

const buttonVariants = ["primary", "accent", "secondary"] as const;

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme === "dark" ? "dark" : undefined}
      className="flex-1 rounded-lg border border-border bg-bg p-8 text-ink"
    >
      <h2 className="mb-6 font-serif text-2xl capitalize">{theme} mode</h2>

      <section className="mb-10">
        <h3 className="mb-3 text-xs uppercase tracking-wide text-text-muted">
          Button
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          {buttonVariants.map((variant) => (
            <Button key={`${variant}-disabled`} variant={variant} disabled>
              {variant} disabled
            </Button>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-muted">
          Hover or Tab to a button to preview its hover and focus-ring
          states.
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xs uppercase tracking-wide text-text-muted">
          Card
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-serif text-lg">Base card</p>
            <p className="mt-2 text-sm text-text-secondary">
              Surface background, 1px border, consistent radius.
            </p>
          </Card>
          <Card hoverLift>
            <p className="font-serif text-lg">Hover-lift card</p>
            <p className="mt-2 text-sm text-text-secondary">
              Hover to see the lift and shadow.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function DevComponents() {
  return (
    <div className="min-h-screen bg-surface-alt p-8">
      <h1 className="mb-8 font-serif text-3xl">Component gallery</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
