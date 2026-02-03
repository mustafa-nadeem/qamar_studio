import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/OurWork.css";
import subhanifyHero from "../assets/subhanify/horiz-01.png";
import burqfxHero from "../assets/burqfx/horiz-01.png";
import tijaratLinksHero from "../assets/tijarat-links/horiz-01.png";
import powyHomesHero from "../assets/powy-homes/horiz-01.png";

const OurWork = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      slug: "subhanify",
      title: "Subhanify",
      category: "App Design",
      description: "Dhikr Wherever You Go",
      image: subhanifyHero,
    },
    {
      id: 2,
      slug: "burq-fx",
      title: "Burq fx",
      category: "Branding",
      description: "Powering Global Payments",
      image: burqfxHero,
    },
    {
      id: 3,
      slug: "tijarat-links",
      title: "Tijarat Links",
      category: "Web Design",
      description: "Connecting Commerce and Community",
      image: tijaratLinksHero,
    },
    {
      id: 4,
      slug: "powy-homes",
      title: "Powy Homes",
      category: "Web Design",
      description: "Your Dream Home Awaits",
      image: powyHomesHero,
    },
  ];

  return (
    <>
      <section className="our-work-section">
        <div className="our-work-container">
          <div className="our-work-header">
            <h1 className="our-work-title">Our Work</h1>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => navigate(`/our-work/${project.slug}`)}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OurWork;
