import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SubFolder from "./pages/SubFolder";
import Thread from "./pages/Thread";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:folderSlug" element={<SubFolder />} />
        <Route path="/:folderSlug/:subFolderSlug" element={<Thread />} />
      </Routes>
    </Router>
  );
};

export default App;
