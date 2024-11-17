import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SubFolder from "./pages/SubFolder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<SubFolder />} />
      </Routes>
    </Router>
  );
};

export default App;
