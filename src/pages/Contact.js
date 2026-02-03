import React, { useState } from "react";
import Footer from "../components/Footer";
import "../styles/Contact.css";

export default function Contact() {
  const [expandedFaqItem, setExpandedFaqItem] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic required field check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus("Please fill in all required fields.");
      return;
    }

    try {
      const key = "qamar_contact_submissions";
      const existing = JSON.parse(window.localStorage.getItem(key) || "[]");
      const entry = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updated = [...existing, entry];
      window.localStorage.setItem(key, JSON.stringify(updated));

      setFormStatus("Thanks — your message has been submitted.");
      setFormData({ name: "", email: "", budget: "", message: "" });
      // For debugging while Freeform isn't wired up yet
      // eslint-disable-next-line no-console
      console.log("Saved contact submission locally:", entry);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to save contact submission:", err);
      setFormStatus("Something went wrong submitting your message.");
    }
  };
  return (
    <>
      {/* Hero */}
      <section className="contact-hero-section">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">Work with us</h1>
          <p className="contact-hero-subtitle">
            Let&apos;s talk about your next chapter.
          </p>
        </div>
      </section>

      {/* Contact form layout */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Left panel - intro + details */}
            <div className="contact-intro">
              <div className="contact-intro-copy">
                <p className="contact-intro-heading">
                  Every great project starts with an idea, a vision, and the
                  will to create something meaningful.
                </p>
                <p className="contact-intro-body">
                  Work with Qamar, let&apos;s talk about what you&apos;re
                  building next, and how we can move your brand forward.
                </p>
              </div>

              <div className="contact-intro-footer">
                <div className="contact-intro-detail">
                  <p className="contact-intro-label">Phone</p>
                  <p className="contact-intro-value">+44 7882005446</p>
                </div>
                <div className="contact-intro-detail">
                  <p className="contact-intro-label">Email</p>
                  <p className="contact-intro-value">info@qamar.studio</p>
                </div>
              </div>
            </div>

            {/* Right panel - form */}
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-field">
                  <label htmlFor="name">Name*</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="email">Email*</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="budget">Budget (optional)</label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    placeholder="Rough budget range"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-field contact-form-field--message">
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us a bit about your project, goals, and timeline."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-footer">
                  <button type="submit" className="contact-submit-button">
                    Send message
                  </button>
                </div>
                {formStatus && (
                  <p className="contact-form-status">{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section (copied from landing page) */}
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
                <div className={`faq-answer ${expandedFaqItem === 0 ? "open" : ""}`}>
                  <p>
                    Timelines depend on the project's scope and complexity. After
                    our initial consultation, we provide a clear timeline to ensure
                    smooth progress and timely delivery.
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
                <div className={`faq-answer ${expandedFaqItem === 1 ? "open" : ""}`}>
                  <p>
                    We offer flexible pricing options depending on your needs. For
                    one-off projects, we provide project-based pricing, while for
                    ongoing or long-term collaboration, we offer retainer-based
                    pricing. After our consultation, you'll receive a customized
                    quote to ensure complete transparency.
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
                <div className={`faq-answer ${expandedFaqItem === 2 ? "open" : ""}`}>
                  <p>
                    Larger requests are broken down on Qamar's end. This applies to
                    full-scale website or mobile app designs, UI/UX work, etc. You
                    should expect to receive a reasonable amount of work every
                    24-48 hours until the entire request is done.
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
                <div className={`faq-answer ${expandedFaqItem === 3 ? "open" : ""}`}>
                  <p>
                    Yes, we offer support and maintenance for web design and social
                    media clients with monthly costs. For other projects, we're
                    available for updates as your needs evolve.
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
                <div className={`faq-answer ${expandedFaqItem === 4 ? "open" : ""}`}>
                  <p>
                    Simply reach out through our contact form or phone. After our
                    initial converstation, we'll provide a proposal outlining the
                    next steps to bring your vision to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
