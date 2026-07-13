import { Route, Routes } from "react-router";
import Contact from "./pages/Contact";
import DevComponents from "./pages/DevComponents";
import Home from "./pages/Home";
import NotFoundPlaceholder from "./pages/NotFoundPlaceholder";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/dev/components" element={<DevComponents />} />
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
  );
}

export default App;
