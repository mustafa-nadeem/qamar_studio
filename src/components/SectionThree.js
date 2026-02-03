import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SectionThree.css";
import subhanifyHero from "../assets/subhanify/horiz-01.png";
import burqfxHero from "../assets/burqfx/horiz-01.png";

const SectionThree = forwardRef(function SectionThree(props, ref) {
  const navigate = useNavigate();
  
  // First 2 projects from OurWork
  const gridItems = [
    {
      id: 1,
      slug: "subhanify",
      title: "Subhanify",
      desc: "Dhikr Wherever You Go",
      image: subhanifyHero,
    },
    {
      id: 2,
      slug: "burq-fx",
      title: "Burq fx",
      desc: "Powering Global Payments",
      image: burqfxHero,
    },
  ];

  return (
    <section className="section-three" ref={ref}>
      <div className="section-three__container">
        <div className="section-three__header-row">
          <h2 className="section-three__title">Featured Work</h2>
          <a 
            className="section-three__seeall" 
            href="/our-work"
            onClick={(e) => {
              e.preventDefault();
              navigate("/our-work");
            }}
          >
            See all &rarr;
          </a>
        </div>
        <hr className="section-three__divider" />
        <div className="section-three__grid">
          {gridItems.map((item) => (
            <div 
              key={item.id} 
              className="section-three__grid-item"
              onClick={() => navigate(`/our-work/${item.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="section-three__grid-image">
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <h3 className="section-three__grid-title">{item.title}</h3>
              <p className="section-three__grid-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SectionThree;
