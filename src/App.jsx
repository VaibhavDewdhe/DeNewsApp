import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/Homepage";
import ArticleDetail from "./Components/ArticleDetail";
import CustomNavbar from "./Components/CustomNavbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:title" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
