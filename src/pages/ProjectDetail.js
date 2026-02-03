import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/ProjectDetail.css";
import heroImage from "../assets/subhanify/horiz-01.png";
import ver01 from "../assets/subhanify/ver-01.png";
import ver02 from "../assets/subhanify/ver-02.png";
import ver03 from "../assets/subhanify/ver-03.png";
import ver04 from "../assets/subhanify/ver-04.png";
import horiz02 from "../assets/subhanify/horiz-02.png";
import horiz03 from "../assets/subhanify/horiz-03.png";
import horiz04 from "../assets/subhanify/horiz-04.png";
import burqfxHeroImage from "../assets/burqfx/horiz-01.png";
import burqfxVer01 from "../assets/burqfx/ver-01.png";
import burqfxVer02 from "../assets/burqfx/ver-02.png";
import burqfxVer03 from "../assets/burqfx/ver-03.png";
import burqfxVer04 from "../assets/burqfx/ver-04.png";
import burqfxHoriz02 from "../assets/burqfx/horiz-02.png";
import burqfxHoriz03 from "../assets/burqfx/horiz-03.png";
import burqfxHoriz04 from "../assets/burqfx/horiz-04.png";
import tijaratLinksHeroImage from "../assets/tijarat-links/horiz-01.png";
import tijaratLinksVer01 from "../assets/tijarat-links/ver-01.png";
import tijaratLinksVer02 from "../assets/tijarat-links/ver-02.png";
import tijaratLinksVer03 from "../assets/tijarat-links/ver-03.png";
import tijaratLinksVer04 from "../assets/tijarat-links/ver-04.png";
import tijaratLinksHoriz02 from "../assets/tijarat-links/horiz-02.png";
import tijaratLinksHoriz03 from "../assets/tijarat-links/horiz-03.png";
import tijaratLinksHoriz04 from "../assets/tijarat-links/horiz-04.png";
import tijaratLinksHoriz05 from "../assets/tijarat-links/horiz-05.png";
import powyHomesHeroImage from "../assets/powy-homes/horiz-01.png";
import powyHomesVer01 from "../assets/powy-homes/ver-01.png";
import powyHomesVer02 from "../assets/powy-homes/ver-02.png";
import powyHomesVer03 from "../assets/powy-homes/ver-03.png";
import powyHomesVer04 from "../assets/powy-homes/ver-04.png";
import powyHomesHoriz02 from "../assets/powy-homes/horiz-02.png";
import powyHomesHoriz03 from "../assets/powy-homes/horiz-03.png";
import powyHomesHoriz04 from "../assets/powy-homes/horiz-04.png";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Project data - in a real app, this would come from an API or data file
  const projects = {
    subhanify: {
      title: "Subhanify",
      subheadline: "Dhikr Wherever You Go",
      category: "App Design",
      description: "A comprehensive mobile application for dhikr and spiritual practice.",
      overview: "Subhanify is a mobile application designed to help users practice dhikr (remembrance of God) wherever they go. The app combines modern design principles with spiritual practice, creating an accessible and beautiful experience for users to engage in daily remembrance. We created a clean, minimalist interface that focuses on ease of use and spiritual connection, making dhikr practice a seamless part of everyday life.",
      heroImage: heroImage,
      images: {
        ver: [ver01, ver02, ver03, ver04],
        hor: [horiz02, horiz03, horiz04],
      },
    },
    "burq-fx": {
      title: "Burq fx",
      subheadline: "Powering Global Payments",
      category: "Branding",
      description: "A modern financial services brand identity and digital platform.",
      overview: "Burq fx represents a new era in financial services, combining trust with innovation. We developed a comprehensive brand identity that speaks to both traditional values and forward-thinking approaches. The design system emphasizes clarity, professionalism, and accessibility, making complex financial concepts approachable for all users.",
      heroImage: burqfxHeroImage,
      images: {
        ver: [burqfxVer01, burqfxVer02, burqfxVer03, burqfxVer04],
        hor: [burqfxHoriz02, burqfxHoriz03, burqfxHoriz04],
      },
    },
    "tijarat-links": {
      title: "Tijarat Links",
      subheadline: "Connecting Commerce and Community",
      category: "Web Design",
      description: "A modern web platform connecting businesses and communities.",
      overview: "Tijarat Links is a comprehensive web platform designed to bridge the gap between commerce and community. We created an intuitive, user-friendly interface that facilitates seamless connections between businesses and their audiences. The design emphasizes clarity, ease of navigation, and visual appeal, making it simple for users to discover and engage with businesses while fostering meaningful community interactions.",
      heroImage: tijaratLinksHeroImage,
      images: {
        ver: [tijaratLinksVer01, tijaratLinksVer02, tijaratLinksVer03, tijaratLinksVer04],
        hor: [tijaratLinksHoriz02, tijaratLinksHoriz03, tijaratLinksHoriz04, tijaratLinksHoriz05],
      },
    },
    "powy-homes": {
      title: "Powy Homes",
      subheadline: "Your Dream Home Awaits",
      category: "Web Design",
      description: "A modern real estate platform connecting buyers with their perfect homes.",
      overview: "Powy Homes is a comprehensive real estate platform designed to simplify the home buying and selling experience. We created an intuitive, visually stunning interface that makes property discovery effortless. The design emphasizes clarity, trust, and ease of use, helping users find their dream homes through beautiful imagery, detailed property information, and seamless navigation. Our approach combines modern web design with user-centric functionality to create an exceptional real estate experience.",
      heroImage: powyHomesHeroImage,
      images: {
        ver: [powyHomesVer01, powyHomesVer02, powyHomesVer03, powyHomesVer04],
        hor: [powyHomesHoriz02, powyHomesHoriz03, powyHomesHoriz04],
      },
    },
  };

  const project = projects[slug];

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!project || !project.images) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Use a small delay to ensure DOM is ready after project change
    const timeoutId = setTimeout(() => {
      // Find all image containers in the project-images-section
      const imageElements = document.querySelectorAll(
        '.project-images-section .project-image-2ver, .project-images-section .project-image-hor'
      );
      
      imageElements.forEach((el) => {
        // Check if already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // If already visible, animate immediately
          el.classList.add('animate-in');
        } else {
          // Otherwise observe for scroll
          observer.observe(el);
        }
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup is handled by unobserve in the callback
    };
  }, [slug, project]); // Re-run when project changes

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project not found</h1>
        <button onClick={() => navigate("/our-work")}>Back to Work</button>
      </div>
    );
  }

  return (
    <>
      <section className="project-hero-section">
        <div className="project-hero-container">
          <div className="project-hero-content">
            <h1 className="project-hero-headline">{project.title}</h1>
            <p className="project-hero-subheadline">{project.subheadline}</p>
          </div>
        </div>
      </section>

      <section className="project-hero-image-section">
        <div className="project-hero-image-container">
          <div className="project-hero-image-placeholder">
            <img 
              src={project.heroImage}
              alt={project.title}
              className="project-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="project-overview-section">
        <div className="project-overview-container">
          <div className="project-overview-content">
            <div className="project-overview-label">
              <h2 className="project-overview-title">Overview</h2>
            </div>
            <div className="project-overview-text">
              <p className="project-overview-description">
                {project.overview || project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {project.images && (
        <section className="project-images-section">
          <div className="project-images-container">
            {/* 2ver - Two vertical images side by side */}
            {project.images.ver && project.images.ver.length >= 2 && (
              <div className="project-image-2ver">
                <div className="project-image-2ver-item">
                  <img 
                    src={project.images.ver[0]}
                    alt={`${project.title} project image 1`}
                    className="project-image"
                  />
                </div>
                <div className="project-image-2ver-item">
                  <img 
                    src={project.images.ver[1]}
                    alt={`${project.title} project image 2`}
                    className="project-image"
                  />
                </div>
              </div>
            )}

            {/* hor - Full width horizontal images */}
            {project.images.hor && project.images.hor.length > 0 && (
              <>
                {project.images.hor[0] && (
                  <div className="project-image-hor">
                    <img 
                      src={project.images.hor[0]}
                      alt={`${project.title} horizontal image 1`}
                      className="project-image"
                    />
                  </div>
                )}
                {project.images.hor[1] && (
                  <div className="project-image-hor">
                    <img 
                      src={project.images.hor[1]}
                      alt={`${project.title} horizontal image 2`}
                      className="project-image"
                    />
                  </div>
                )}
              </>
            )}

            {/* 2ver - Two vertical images side by side */}
            {project.images.ver && project.images.ver.length >= 4 && (
              <div className="project-image-2ver">
                <div className="project-image-2ver-item">
                  <img 
                    src={project.images.ver[2]}
                    alt={`${project.title} project image 3`}
                    className="project-image"
                  />
                </div>
                <div className="project-image-2ver-item">
                  <img 
                    src={project.images.ver[3]}
                    alt={`${project.title} project image 4`}
                    className="project-image"
                  />
                </div>
              </div>
            )}

            {/* hor - Last horizontal image */}
            {project.images.hor && project.images.hor[2] && (
              <div className="project-image-hor">
                <img 
                  src={project.images.hor[2]}
                  alt={`${project.title} horizontal image 3`}
                  className="project-image"
                />
              </div>
            )}

            {/* hor - Additional horizontal image */}
            {project.images.hor && project.images.hor[3] && (
              <div className="project-image-hor">
                <img 
                  src={project.images.hor[3]}
                  alt={`${project.title} horizontal image 4`}
                  className="project-image"
                />
              </div>
            )}
          </div>
        </section>
      )}

      <section className="project-related-section">
        <div className="project-related-container">
          <div className="project-related-content">
            <h2 className="project-related-title">Related work</h2>
            <a 
              href="/our-work" 
              className="project-related-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/our-work");
              }}
            >
              See all →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetail;
