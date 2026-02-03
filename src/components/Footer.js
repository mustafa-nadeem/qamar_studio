import React, { forwardRef, useState, useCallback } from "react";
import "../styles/Footer.css";
import { ReactComponent as Logo } from "../assets/logo/logo-footer.svg";

const Footer = forwardRef(function Footer({ visible }, ref) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = useCallback(
    async (event) => {
      event.preventDefault();
      const email = "info@qamar.studio";

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        setEmailCopied(true);
        setTimeout(() => {
          setEmailCopied(false);
        }, 1500);
      } catch (error) {
        window.location.href = `mailto:${email}`;
      }
    },
    []
  );

  return (
    <footer className="footer-section" ref={ref}>
      <div className="footer-container">
        <div className="footer-links-grid">
          <div className="footer-left-content">
            <div className="footer-contact">
              <h3 className="footer-contact-title">Get in touch</h3>
              <a
                href="mailto:info@qamar.studio"
                className={`footer-email${
                  emailCopied ? " footer-email--copied" : ""
                }`}
                onClick={handleEmailClick}
              >
                {emailCopied ? "Copied" : "info@qamar.studio"}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-logo-section">
          <Logo className="footer-logo" />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
