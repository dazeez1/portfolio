import { Route, Routes } from "react-router";
import { ScrollManager } from "./components/ScrollManager";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DevComponents from "./pages/DevComponents";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Privacy from "./pages/Privacy";
import Qure from "./pages/Qure";
import Referrals from "./pages/Referrals";
import Sangira from "./pages/Sangira";
import Seo from "./pages/Seo";
import Services from "./pages/Services";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/sangira" element={<Sangira />} />
        <Route path="/portfolio/qure" element={<Qure />} />
        <Route path="/services" element={<Services />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/dev/components" element={<DevComponents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
