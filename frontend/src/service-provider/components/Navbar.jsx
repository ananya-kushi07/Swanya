import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container>
          <Link to="/" className="logo">ServiceProvider</Link>
          <div className="nav-links">
            {/* <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/Services">Services</Button>
            <Button color="inherit" component={Link} to="/bookings">Bookings</Button> */}
         <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/dashboard">Dashboard</Link></li>
                 <li><Link to="/spservices">Services</Link></li>
                 <li><Link to="/spbookings">Bookings</Link></li> New link for Bookings
                 {/* <li><Link to="/review">Reviews</Link></li> */}
                 {/* <li><Link to="/contact-info">Contact Info</Link></li> */}
                 <li><Link to="/spprofile">Profile</Link></li>
               
               </ul>
         
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
