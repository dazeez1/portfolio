import { useSyncExternalStore } from "react";

/** Nothing to subscribe to — the value flips once, when React hydrates. */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during prerendering AND during the first client render, `true` from
 * the render after hydration onwards.
 *
 * Use it to gate anything that can only be known in the browser — URL query
 * params, `localStorage`, `matchMedia` — so the first client render is
 * byte-identical to the prerendered HTML and React has nothing to reconcile.
 *
 * `useSyncExternalStore` rather than a `useState` + `useEffect` mounted flag:
 * React itself switches from the server snapshot to the client snapshot after
 * hydration, so there is no `setState` inside an effect (which
 * `react-hooks/set-state-in-effect` correctly flags) and no extra render pass
 * that a linter has to be told to ignore.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}