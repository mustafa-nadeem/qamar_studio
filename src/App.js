import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import Home from "./pages/Home";
import OurWork from "./pages/OurWork";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarWhite, setNavbarWhite] = useState(location.pathname !== "/");
  const [navbarDark, setNavbarDark] = useState(false);

  // Update navbar and scroll on route change
  useEffect(() => {
    // Scroll all possible scroll containers to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Also scroll the .App container if it exists
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.scrollTop = 0;
    }
    if (location.pathname === "/") {
      setNavbarWhite(false);
    } else {
      setNavbarWhite(true);
    }
    setNavbarDark(false); // Reset dark navbar on route change
  }, [location.pathname]);

  // Update document title based on current route
  useEffect(() => {
    let pageTitle = "";

    switch (location.pathname) {
      case "/":
        pageTitle = "Qamar Studio";
        break;
      case "/our-work":
        pageTitle = "Our Work";
        break;
      case "/approach":
        pageTitle = "Approach";
        break;
      case "/contact":
        pageTitle = "Contact";
        break;
      default:
        if (location.pathname.startsWith("/our-work/")) {
          pageTitle = "Project";
        } else {
          pageTitle = "";
        }
    }

    document.title = pageTitle || "Qamar Studio";
  }, [location.pathname]);

  const handleNavigate = (path) => {
    navigate(path === "home" ? "/" : `/${path}`);
  };

  // Handler for Home page - controls white navbar (after hero)
  const handleHomeNavbarChange = useCallback((isWhite) => {
    if (typeof isWhite === "boolean") {
      setNavbarWhite(isWhite);
    }
  }, []);

  // Handler for Approach page - controls dark navbar (after process section)
  const handleApproachNavbarChange = useCallback((isDark) => {
    if (typeof isDark === "boolean") {
      setNavbarDark(isDark);
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        dark={navbarDark}
        white={navbarWhite && !navbarDark}
        onNavigate={handleNavigate}
      />
      <div key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={<Home onNavbarStateChange={handleHomeNavbarChange} />}
          />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-work/:slug" element={<ProjectDetail />} />
          <Route
            path="/approach"
            element={
              <Approach onNavbarStateChange={handleApproachNavbarChange} />
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
