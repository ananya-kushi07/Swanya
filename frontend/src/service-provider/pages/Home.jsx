import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// import "././Home.css";
import "../styles/Home.css"
const Home = () => {
  return (
    <div className="home-container">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" className="hero-text">
              One-Stop Solution for All Your Service Needs - Anytime, Anywhere!
            </Typography>
            <Typography variant="body1">
              Your All-in-One Service Platform Finding trusted professionals for maintenance and repair services is now effortless.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="hero-image">
              <img src="service-image.jpg" alt="Service Image" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
