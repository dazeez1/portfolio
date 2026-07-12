import { Navigate, Route, Routes } from "react-router";
import DevComponents from "./pages/DevComponents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dev/components" replace />} />
      <Route path="/dev/components" element={<DevComponents />} />
    </Routes>
  );
}

export default App;
