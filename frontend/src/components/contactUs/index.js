import React from "react";
import "./style.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <div className="about-us">
        <h2>About Our Website</h2>
        <p>
          Welcome to our e-commerce platform! We strive to provide the best
          shopping experience by offering a wide variety of high-quality
          products at competitive prices. Our mission is to connect customers
          with what they love while ensuring excellent service and seamless
          navigation.
        </p>
      </div>

      <div className="creator-info">
        <h2>About the Creator</h2>
        <p>
          You can include a short biography about yourself here. Add details
          about your background, expertise, and the inspiration behind creating
          this website.
        </p>
      </div>

      <div className="contact-details">
        <h2>Contact Details</h2>
        <p>Email: saleh.alrawajfeh@email.com</p>
        <p>Phone: +0962756495907</p>
        <p>Address: bild 15 , mecca Street, amman, jordan</p>
      </div>
    </div>
  );
};

export default ContactUs;
