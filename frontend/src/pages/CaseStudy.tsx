import { useParams } from "react-router";
import { CaseStudyLayout } from "../components/CaseStudyLayout";
import { getCaseStudy } from "../content/caseStudies";
import NotFound from "./NotFound";

/**
 * One route for every case study: /portfolio/:slug looks the slug up in the
 * content registry and hands the result to the shared layout. This replaced the
 * per-project page wrappers (Sangira.tsx, Qure.tsx), each of which needed its
 * own hardcoded <Route>.
 *
 * An unrecognised slug renders the real 404 page rather than an empty layout,
 * so /portfolio/nonsense behaves exactly like any other unknown URL.
 */
export default function CaseStudy() {
  const { slug } = useParams();
  const content = getCaseStudy(slug);

  // Narrowing `slug` here as well as `content` avoids a non-null assertion:
  // getCaseStudy only returns content for a defined slug, but TypeScript
  // cannot infer that from the lookup alone.
  if (!slug || !content) return <NotFound />;

  return <CaseStudyLayout content={content} slug={slug} />;
}