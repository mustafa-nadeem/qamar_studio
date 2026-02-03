import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionThree from "../components/SectionThree";
import Footer from "../components/Footer";
import { ReactComponent as PenIcon } from "../assets/icons/Pen-Tool--Streamline-Lucide.svg";
import { ReactComponent as ZapIcon } from "../assets/icons/Zap--Streamline-Lucide.svg";
import { ReactComponent as BrainIcon } from "../assets/icons/Brain--Streamline-Lucide.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/Users--Streamline-Lucide.svg";
import { ReactComponent as GitBranchIcon } from "../assets/icons/Git-Branch--Streamline-Lucide.svg";
import { ReactComponent as GlobeLockIcon } from "../assets/icons/Globe-Lock--Streamline-Lucide.svg";
import thumb1 from "../assets/thumbnail/1.png";
import thumb2 from "../assets/thumbnail/2.png";
import thumb3 from "../assets/thumbnail/3.png";
import thumb4 from "../assets/thumbnail/4.png";
import thumb5 from "../assets/thumbnail/5.png";
import thumb6 from "../assets/thumbnail/6.png";
import thumb7 from "../assets/thumbnail/7.png";
import "../styles/App.css";

const heroText =
  "Qamar is an independent strategy and\ncreative studio, operating in London.";

export default function Home({ onNavbarStateChange }) {
  const heroRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const footerRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(true);
  const [navbarWhite, setNavbarWhite] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [expandedFaqItem, setExpandedFaqItem] = useState(-1);
  const currentSectionRef = useRef(0);

  const services = [
    { id: 0, name: "Brand Strategy", thumbnail: thumb1 },
    { id: 1, name: "Visual Identity", thumbnail: thumb2 },
    { id: 2, name: "Web Design", thumbnail: thumb3 },
    { id: 3, name: "Mobile App Design", thumbnail: thumb4 },
    { id: 4, name: "Web Development", thumbnail: thumb5 },
    { id: 5, name: "App Development", thumbnail: thumb6 },
    { id: 6, name: "Custom Software Development", thumbnail: thumb7 },
  ];

  // Preload service thumbnails so hover images appear instantly
  useEffect(() => {
    services.forEach((service) => {
      const img = new Image();
      img.src = service.thumbnail;
    });
    // We intentionally run this only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Programmatic video play fallback for mobile browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Attempt to play immediately
      const playVideo = () => {
        video.play().catch(() => {
          // Autoplay was prevented, silently fail
        });
      };
      
      // Try playing when video data is loaded
      video.addEventListener('loadeddata', playVideo);
      video.addEventListener('canplay', playVideo);
      
      // Also try immediately in case video is already loaded
      playVideo();
      
      return () => {
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, []);

  useEffect(() => {
    const heroObserver = new window.IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
        // Invert navbar when scrolled past 95% of hero section
        if (entry.isIntersecting) {
          setNavbarWhite(entry.intersectionRatio < 0.05);
        } else {
          setNavbarWhite(true);
        }
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setCurrentSection(0);
          currentSectionRef.current = 0;
        }
      },
      { threshold: [0, 0.05, 0.5] },
    );

    const sectionThreeObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setCurrentSection(1);
          currentSectionRef.current = 1;
        }
      },
      { threshold: 0.5 },
    );

    const footerObserver = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
        if (entry.isIntersecting && entry.intersectionRatio > 1.0) {
          setCurrentSection(2);
          currentSectionRef.current = 2;
        }
      },
      { threshold: 1.0 },
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (sectionThreeRef.current)
      sectionThreeObserver.observe(sectionThreeRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (sectionThreeRef.current)
        sectionThreeObserver.unobserve(sectionThreeRef.current);
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
    };
  }, []);

  // Update navbar state in parent component
  useEffect(() => {
    if (onNavbarStateChange) {
      onNavbarStateChange(navbarWhite);
    }
  }, [navbarWhite, onNavbarStateChange]);

  return (
    <>
      <section className="hero-section" ref={heroRef}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video"
        >
          <source
            src={require("../assets/312950_medium.mp4")}
            type="video/mp4"
          />
        </video>
        <div className="hero-container">
          <div className={`hero-content${heroVisible ? " animate" : ""}`}>
            {heroText.split(/(\s|\n)/).map((word, idx, arr) => (
              <React.Fragment key={idx}>
                {word === "\n" ? (
                  <br />
                ) : word.trim() ? (
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${0.15 * idx + 0.3}s` }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className="services-section">
        <div className="services-container">
          <div className="services-left">
            <h2 className="services-title">Services</h2>
            {hoveredService !== null && (
              <div className="services-image-preview">
                <img
                  src={services[hoveredService].thumbnail}
                  alt={services[hoveredService].name}
                  className="services-image-preview-img"
                />
              </div>
            )}
          </div>
          <div className="services-right">
            <ul className="home-services-list">
              {services.map((service) => (
                <li
                  key={service.id}
                  className={`home-services-list__item ${
                    hoveredService === service.id ? "active" : ""
                  } ${
                    hoveredService !== null && hoveredService !== service.id
                      ? "dimmed"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="why-switch-section">
        <div className="why-switch-container">
          <h2 className="why-switch-title">Why companies switch to Qamar</h2>
          <div className="why-switch-grid">
            <div className="why-switch-card">
              <PenIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Design Precision</h3>
              <p className="why-switch-card-desc">
                We refine every element until it feels effortless, detail isn't
                decoration, it's language.
              </p>
            </div>
            <div className="why-switch-card">
              <ZapIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Fast delivery</h3>
              <p className="why-switch-card-desc">
                Get your design one at a time in just a couple days on average.
                From kickoff to delivery, we move fast.
              </p>
            </div>
            <div className="why-switch-card">
              <BrainIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Strategy Thinking</h3>
              <p className="why-switch-card-desc">
                Every decision is intentional backed by research, direction, and
                purpose.
              </p>
            </div>
            <div className="why-switch-card">
              <UsersIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Collaborative Process</h3>
              <p className="why-switch-card-desc">
                We work with you, not for you, aligning vision, goals, and
                creativity into one direction.
              </p>
            </div>
            <div className="why-switch-card">
              <GitBranchIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Adaptability</h3>
              <p className="why-switch-card-desc">
                Every brand is different. we design flexible systems that evolve
                without losing their essence.
              </p>
            </div>
            <div className="why-switch-card">
              <GlobeLockIcon className="why-switch-icon" />
              <h3 className="why-switch-card-title">Security First</h3>
              <p className="why-switch-card-desc">
                Your data is protected with enterprise-grade security and
                compliance standards.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SectionThree ref={sectionThreeRef} />
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">Questions, answered.</h2>
          </div>
          <div className="faq-content">
            <div className="faq-list">
              <div className="faq-item">
                <button
                  className={`faq-question ${
                    expandedFaqItem === 0 ? "active" : ""
                  }`}
                  onClick={() =>
                    setExpandedFaqItem(expandedFaqItem === 0 ? -1 : 0)
                  }
                >
                  How long does a typical project take?
                  <span className="faq-toggle">
                    {expandedFaqItem === 0 ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${expandedFaqItem === 0 ? "open" : ""}`}
                >
                  <p>
                    Timelines depend on the project's scope and complexity.
                    After our initial consultation, we provide a clear timeline
                    to ensure smooth progress and timely delivery.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <button
                  className={`faq-question ${
                    expandedFaqItem === 1 ? "active" : ""
                  }`}
                  onClick={() =>
                    setExpandedFaqItem(expandedFaqItem === 1 ? -1 : 1)
                  }
                >
                  How do you price your services?
                  <span className="faq-toggle">
                    {expandedFaqItem === 1 ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${expandedFaqItem === 1 ? "open" : ""}`}
                >
                  <p>
                    We offer flexible pricing options depending on your needs.
                    For one-off projects, we provide project-based pricing,
                    while for ongoing or long-term collaboration, we offer
                    retainer-based pricing. After our consultation, you'll
                    receive a customized quote to ensure complete transparency.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <button
                  className={`faq-question ${
                    expandedFaqItem === 2 ? "active" : ""
                  }`}
                  onClick={() =>
                    setExpandedFaqItem(expandedFaqItem === 2 ? -1 : 2)
                  }
                >
                  How do you handle larger requests?
                  <span className="faq-toggle">
                    {expandedFaqItem === 2 ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${expandedFaqItem === 2 ? "open" : ""}`}
                >
                  <p>
                    Larger requests are broken down on Qamar's end. This applies
                    to full-scale website or mobile app designs, UI/UX work,
                    etc. You should expect to receive a reasonable amount of
                    work every 24-48 hours until the entire request is done.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <button
                  className={`faq-question ${
                    expandedFaqItem === 3 ? "active" : ""
                  }`}
                  onClick={() =>
                    setExpandedFaqItem(expandedFaqItem === 3 ? -1 : 3)
                  }
                >
                  Do you offer ongoing support after project completion?
                  <span className="faq-toggle">
                    {expandedFaqItem === 3 ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${expandedFaqItem === 3 ? "open" : ""}`}
                >
                  <p>
                    Yes, we offer support and maintenance for web design and
                    social media clients with monthly costs. For other projects,
                    we're available for updates as your needs evolve.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <button
                  className={`faq-question ${
                    expandedFaqItem === 4 ? "active" : ""
                  }`}
                  onClick={() =>
                    setExpandedFaqItem(expandedFaqItem === 4 ? -1 : 4)
                  }
                >
                  How do i get started?
                  <span className="faq-toggle">
                    {expandedFaqItem === 4 ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${expandedFaqItem === 4 ? "open" : ""}`}
                >
                  <p>
                    Simply reach out through our contact form or phone. After
                    our initial converstation, we'll provide a proposal
                    outlining the next steps to bring your vision to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">More capabilities, less cost</h2>
          <p className="cta-subtitle">
            Since each Superhuman app covers different aspects of the workday,
            bundling them gives your entire organization all-day support without
            the all-day spend.
          </p>
          <button
            className="cta-button"
            type="button"
            onClick={() => navigate("/contact")}
          >
            Let's Talk
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
