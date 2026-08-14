import { Route, Routes } from "react-router";
import { ScrollManager } from "./components/ScrollManager";
import { SiteStructuredData } from "./components/SiteStructuredData";
import About from "./pages/About";
import CaseStudy from "./pages/CaseStudy";
import Contact from "./pages/Contact";
import DevComponents from "./pages/DevComponents";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Privacy from "./pages/Privacy";
import Referrals from "./pages/Referrals";
import Seo from "./pages/Seo";
import Services from "./pages/Services";
import Terms from "./pages/Terms";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <>
      <ScrollManager />
      <SiteStructuredData />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* One route for every case study — see pages/CaseStudy.tsx. */}
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/dev/components" element={<DevComponents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
