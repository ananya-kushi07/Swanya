import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      // Handle the subscription logic here
      console.log(`Subscribed with email: ${email}`);
      // You can also add logic to send email to the server or add to a database
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LifeHackers</h3>
          <p>Contact: +91 98915 03557</p>
          <p>Email: <a href="mailto:support@lifehackers.com">support@lifehackers.com</a></p>
          <p>Address: H-87, Second Floor, Block H, Sector 63, Noida, UP</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Help & Support</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/support">Support Center</a></li>
          </ul>
          <p>For assistance, please call: <strong>+91 8311283734</strong></p>
          <p>Availability: Mon-Fri, 10:30 AM to 7:00 PM</p>
          <p>For weekend assistance, email: <a href="mailto:support@lifehackers.com">support@lifehackers.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with the latest news and offers from LIFEHACKERS.</p>
          <div className="subscribe-form">
            <input
              type="email"
              placeholder="example@lifehackers.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p className="copyright">&copy; 2024 LifeHackers. All rights reserved.</p>
    </footer>
  );
}

export default Footer;