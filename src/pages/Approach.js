import React, { useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "../styles/Approach.css";
import approach01 from "../assets/approach/approach-01.avif";
import approach02 from "../assets/approach/approach-02.avif";
import approach03 from "../assets/approach/approach-03.avif";
import approach04 from "../assets/approach/approach-04.avif";

export default function Approach({ onNavbarStateChange }) {
  const processRef = useRef(null);
  const [navbarDark, setNavbarDark] = useState(false);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        // Only go dark if we're scrolling down past the section
        // entry.isIntersecting = true when any part of section is visible
        // Once section is completely out of view from scrolling down, go dark
        if (entry.isIntersecting) {
          // Section is in viewport
          setHasScrolledPast(false);
          setNavbarDark(false);
        } else if (!entry.isIntersecting && hasScrolledPast) {
          // Section is out of view, and we had already seen it
          setNavbarDark(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Section has scrolled out from the top (we scrolled past it)
          setHasScrolledPast(true);
          setNavbarDark(true);
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => {
      if (processRef.current) {
        observer.unobserve(processRef.current);
      }
    };
  }, [hasScrolledPast]);

  // Update parent component with navbar state
  useEffect(() => {
    if (onNavbarStateChange) {
      onNavbarStateChange(navbarDark);
    }
  }, [navbarDark, onNavbarStateChange]);
  const processSteps = [
    {
      title: "Think",
      description:
        "We read the soil to find where ideas take root, uncovering opportunities, directions, and missions.",
      image: approach01,
    },
    {
      title: "Create",
      description:
        "We coax the invisible into the inevitable, crafting identities and systems to support your growth.",
      image: approach02,
    },
    {
      title: "Build",
      description:
        "We engineer scalable digital products and experiences ready for real-world impact.",
      image: approach03,
    },
    {
      title: "Scale",
      description:
        "We tend and craft digital products and experiences that you may bear fruit for years to come.",
      image: approach04,
    },
  ];

  return (
    <>
      <section className="approach-hero-section">
        <div className="approach-hero-container">
          <h1 className="approach-hero-title">
            TRANSFORM <br /> YOUR BRAND.
          </h1>
          <div className="approach-hero-bottom">
            <p className="approach-hero-description">
              Starting with the spark of innovation to crafting a timeless
              heritage, we navigate every aspect of development, adaptation, and
              rejuvenation
            </p>
          </div>
        </div>
      </section>

      <section className="approach-process-section" ref={processRef}>
        <div className="approach-process-container">
          <h2 className="approach-process-title">
            Our process, crafted through decades of shared experience
          </h2>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card">
                <div className="process-content">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.description}</p>
                </div>
                <div className="process-image-container">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="process-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="commitments-section">
        <div className="commitments-container">
          <h2 className="commitments-title">Our Commitments</h2>
          <div className="commitments-content">
            <div className="commitment-item">
              <h3 className="commitment-item-title">
                Design that actually works
              </h3>
              <p className="commitment-item-description">
                We obsess over clarity, usability and business goals, so every
                pixel has a job to do—not just look pretty.
              </p>
            </div>
            <div className="commitment-item">
              <h3 className="commitment-item-title">
                Collaboration without the chaos
              </h3>
              <p className="commitment-item-description">
                We keep you in the loop with clear communication, fast feedback
                cycles and transparent timelines from kickoff to launch.
              </p>
            </div>
            <div className="commitment-item">
              <h3 className="commitment-item-title">Craft, not templates</h3>
              <p className="commitment-item-description">
                We design from first principles, tailoring every project to your
                brand, audience and metrics instead of recycling
                one-size-fits-all layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="information-section">
        <div className="information-container">
          <h2 className="information-title">Information</h2>
          <div className="information-content">
            <div className="information-column">
              <h3 className="information-subtitle">Contact</h3>
              <div className="contact-items">
                <div className="contact-item">
                  <p className="contact-label">Email</p>
                  <p className="contact-email">info@qamar.studio</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Phone</p>
                  <p className="contact-email">+44 7882005446</p>
                </div>
              </div>
            </div>
            <div className="information-column">
              <h3 className="information-subtitle">Services</h3>
              <ul className="approach-services-list">
                <li>
                  <span className="service-item">Brand Strategy</span>
                </li>
                <li>
                  <span className="service-item">Visual Identity</span>
                </li>
                <li>
                  <span className="service-item">Web Design</span>
                </li>
                <li>
                  <span className="service-item">Mobile App Design</span>
                </li>
                <li>
                  <span className="service-item">Web Development</span>
                </li>
                <li>
                  <span className="service-item">App Development</span>
                </li>
                <li>
                  <span className="service-item">Custom Software Development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
