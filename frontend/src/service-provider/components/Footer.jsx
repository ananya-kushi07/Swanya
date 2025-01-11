import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import "../styles/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log(`Subscribed with email: ${email}`);
    }
  };

  return (
    <footer>
      <Container>
        <div className="footer-container">
          <div className="footer-section">
            <h3>ServiceProvider</h3>
            <p>Contact: +91 98915 03557</p>
            <p>Email: <a href="mailto:support@serviceprovider.com">support@serviceprovider.com</a></p>
            <p>Address: H-87, Noida, UP</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Subscribe to Our Newsletter</h3>
            <TextField
              label="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubscribe}>Subscribe</Button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
