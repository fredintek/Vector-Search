import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadCV from "./pages/UploadCv";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadCV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
