import React from 'react';
import './About.css'; // Make sure to import the CSS file
import Navbar from '../../Components/Navbar/navbar';

const About = () => {
  return (
    <>
      <div>
        <Navbar />
        {/* Policy Section */}
        <section className="policy-section">
          <div className="policy-card">
            <i className="fas fa-exchange-alt policy-icon"></i>
            <h3>Easy Exchange Policy</h3>
            <p>We offer hassle free exchange policy</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-undo policy-icon"></i>
            <h3>7 Days Return Policy</h3>
            <p>We provide 7 days free return policy</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-headset policy-icon"></i>
            <h3>Best Customer Support</h3>
            <p>We provide 24/7 customer support</p>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="subscription-section">
          <h2>Subscribe now & get 20% off</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="subscription-form">
            <input type="email" placeholder="Enter your email" />
            <button>SUBSCRIBE</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-content">
            <div className="footer-about">
              <h3>SHOPSMART</h3>
              <p>
                <strong>Trendsetter</strong> is an e-commerce clothing app,
                bringing you the latest fashion trends with just a tap. Discover
                a curated collection of stylish apparel, from casual wear to
                statement pieces, all designed to elevate your wardrobe.
              </p>
            </div>
            <div className="footer-links">
              <h3>COMPANY</h3>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>GET IN TOUCH</h3>
              <ul>
                <li>+1-222-333-4444</li>
                <li>contact@trendsetter.com</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
