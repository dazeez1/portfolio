import { useState } from "react";

/**
 * Temporary token/font verification view. Gets replaced by real routes
 * and pages starting with Home (README.md Section 12, step 3).
 */
function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      data-theme={theme === "dark" ? "dark" : undefined}
      className="min-h-screen bg-bg text-ink transition-colors"
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <button
          type="button"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className="mb-10 rounded-md bg-button-primary-bg px-4 py-2 text-sm font-medium text-button-primary-text"
        >
          Toggle {theme === "light" ? "dark" : "light"} mode
        </button>

        <h1 className="font-serif text-5xl">
          Design tokens are wired <span className="italic text-accent">up</span>
        </h1>
        <p className="mt-4 max-w-prose font-sans text-text-secondary">
          This is a scaffolding check, not a page. Fraunces for headings,
          Inter for body text, and the full Terracotta editorial color
          system, swapped by a data-theme attribute.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["bg", "bg-bg border border-border"],
            ["surface", "bg-surface border border-border"],
            ["surface-alt", "bg-surface-alt border border-border"],
            ["ink", "bg-ink"],
            ["accent", "bg-accent"],
            ["accent-hover", "bg-accent-hover"],
            ["tint", "bg-tint border border-tint-border"],
            ["success", "bg-success"],
            ["warning", "bg-warning"],
            ["error", "bg-error"],
          ].map(([label, cls]) => (
            <div key={label} className="text-xs text-text-muted">
              <div className={`mb-1 h-12 w-full rounded ${cls}`} />
              {label}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-accent-text underline">
          accent-text link sample (below 18px, per Section 1 rule 2)
        </p>
      </div>
    </div>
  );
}

export default App;
