import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { ReactComponent as Logo } from "../assets/logo/logo.svg";

const NAV_LINKS = [
  { name: "Our Work", href: "our-work" },
  { name: "Approach", href: "approach" },
  { name: "Contact", href: "contact" },
];

export default function Navbar({ dark, white, showLogo = true, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate(href);
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate("home");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isWhiteNavbar = !dark && (white || isMobileMenuOpen);

  return (
    <nav
      className={`navbar${
        dark ? " navbar--dark" : isWhiteNavbar ? " navbar--white" : ""
      }${isMobileMenuOpen ? " navbar--mobile-open" : ""}`}
    >
      <div className="navbar__container">
        <div
          className="navbar__logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          {showLogo && (
            <Logo
              className={
                dark
                  ? "navbar__logo-svg navbar__logo--dark"
                  : white
                  ? "navbar__logo-svg navbar__logo--white"
                  : "navbar__logo-svg"
              }
              height={32}
              width={120}
              style={{
                maxWidth: "100%",
                height: "32px",
                width: "120px",
                display: "block",
              }}
            />
          )}
        </div>
        <button
          className={`navbar__hamburger${
            isMobileMenuOpen ? " navbar__hamburger--open" : ""
          }${dark ? " navbar__hamburger--dark" : white ? " navbar__hamburger--white" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar__links${isMobileMenuOpen ? " navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a
                className={
                  dark
                    ? "navbar__link--dark"
                    : white
                    ? "navbar__link--white"
                    : ""
                }
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
