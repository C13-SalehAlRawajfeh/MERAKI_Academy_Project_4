import React from "react";
import "./style.css";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>
      <div className="section">
        <h2>Who We Are</h2>
        <p>
          Welcome to our platform! We are dedicated to providing you with the
          best shopping experience, offering a curated selection of products
          tailored to your needs. Our focus is on quality, reliability, and
          customer satisfaction.
        </p>
      </div>

      <div className="section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a seamless and enjoyable shopping experience
          by connecting customers with products they love, ensuring convenience
          and excellence at every step.
        </p>
      </div>

      <div className="section">
        <h2>About the Creator</h2>
        <p>
          This section is where you can add details about yourself. Share your
          inspiration, vision, and the story behind creating this platform. Let
          the users know who is behind this amazing project!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
