import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * Mirrors the route table the declarative <Routes> block had, one-for-one. The splat is the 404;
 * it is not prerendered (there is no single URL for it) — unknown paths get a
 * real 404 from the host instead, which is the point of dropping the SPA
 * catch-all rewrite.
 */
export default [
  index("pages/Home.tsx"),
  route("about", "pages/About.tsx"),
  route("portfolio", "pages/Portfolio.tsx"),
  // One route for every case study — see pages/CaseStudy.tsx.
  route("portfolio/:slug", "pages/CaseStudy.tsx"),
  route("services", "pages/Services.tsx"),
  route("seo", "pages/Seo.tsx"),
  route("referrals", "pages/Referrals.tsx"),
  route("privacy", "pages/Privacy.tsx"),
  route("terms", "pages/Terms.tsx"),
  route("contact", "pages/Contact.tsx"),
  route("thank-you", "pages/ThankYou.tsx"),
  route("*", "pages/NotFound.tsx"),
] satisfies RouteConfig;
