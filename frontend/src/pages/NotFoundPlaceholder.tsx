import { Link } from "react-router";

/**
 * Temporary catch-all for every route that isn't built yet. Replaced by the
 * real designed 404 (ghost numeral, helpful-links card — CLAUDE.md Section 6)
 * in Phase 2.
 */
export default function NotFoundPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <h1 className="font-serif text-2xl text-ink">
        Page not found — this page is coming soon
      </h1>
      <Link to="/dev/components" className="text-sm text-accent-text underline">
        Back to /dev/components
      </Link>
    </div>
  );
}
