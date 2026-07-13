import { Navigate, Route, Routes } from "react-router";
import DevComponents from "./pages/DevComponents";
import NotFoundPlaceholder from "./pages/NotFoundPlaceholder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dev/components" replace />} />
      <Route path="/dev/components" element={<DevComponents />} />
      <Route path="*" element={<NotFoundPlaceholder />} />
    </Routes>
  );
}

export default App;
