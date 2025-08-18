import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BACKEND_URL } from "./config.js";
import "./index.css";

// PageWrapper for transitions
function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return <div className={`page ${visible ? "page-visible" : ""}`}>{children}</div>;
}

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hello`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMessage(data?.message || "No message from backend");
      } catch (err) {
        console.error("Failed to fetch /api/hello:", err);
        setMessage("Unable to reach backend");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home message={message} loading={loading} />
              </PageWrapper>
            }
          />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
