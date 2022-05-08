import React from "react";
import "./HeroContent.css";

const HeroContent = () => {
  return (
    <main className="hero">
      <div className="hero-wrapper">
        <div className="hero-header">
          <h4>
            Summarize your favourite Podcasts and more with just a click !
          </h4>
        </div>
        <div className="hero-content-cont">
          <div className="hero-action-cont">
            <button className="cta-btn-secondary">Upload</button>
            <input
              className="hero-input"
              type="url"
              name="url-text"
              id="url-text"
              placeholder="Paste URL"
            />
          </div>
          <div>
            <button className="cta-btn-primary">Summarize</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroContent;
