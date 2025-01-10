import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import Profile from './Pages/Profile';
import ContactInfo from './Pages/ContactInfo';
import BookingPage from './Pages/BookingPage'; // Import the booking page component
import Bookings from './Pages/Booking'; // Import the bookings page component
import ReviewPage from './Pages/Review'; // Import the ReviewPage component
import SignUp from './Components/SignUp'; // Import SignUp component
import SignIn from './Components/SignIn'; // Import SignIn component

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          
          {/* Booking Routes */}
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/bookings" element={<Bookings />} />
          
          {/* Review Route */}
          <Route path="/review" element={<ReviewPage />} />

          {/* Authentication Routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Default Route (fallback) */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
