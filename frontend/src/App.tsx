import { Route, Routes } from "react-router";
import DevComponents from "./pages/DevComponents";
import Home from "./pages/Home";
import NotFoundPlaceholder from "./pages/NotFoundPlaceholder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dev/components" element={<DevComponents />} />
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
  );
}

export default App;
