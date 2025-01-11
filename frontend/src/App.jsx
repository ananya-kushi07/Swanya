// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Home from './Pages/Home';
// import AboutUs from './Pages/AboutUs';
// import Services from './Pages/Services';
// import Profile from './Pages/Profile';
// import ContactInfo from './Pages/ContactInfo';
// import BookingPage from './Pages/BookingPage'; // Import the booking page component
// import Bookings from './Pages/Booking'; // Import the bookings page component
// import ReviewPage from './Pages/Review'; // Import the ReviewPage component
// import SignUp from './Components/SignUp'; // Import SignUp component
// import SignIn from './Components/SignIn'; // Import SignIn component
// import ServiceDetails from './Pages/ServiceDetails'; // Import the ServiceDetails component
// import Chatbot from './Pages/chatbot'; // Import Chatbot component
// import Chatting from './Pages/Chatting';
// import MapComponent from './Pages/map';

// import UserMapComponent from './Pages/usermap';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       <Navbar />
//       <div className="content">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/contact-info" element={<ContactInfo />} />
          
//           {/* Service Details Route */}
//           <Route path="/services/:id" element={<ServiceDetails />} /> {/* Added Route for ServiceDetails */}
          
//           {/* Booking Routes */}
//           <Route path="/book/:id" element={<BookingPage />} />
//           <Route path="/bookings" element={<Bookings />} />
          
//           {/* Review Route */}
//           <Route path="/review" element={<ReviewPage />} />

//           {/* Authentication Routes */}
//           <Route path="/" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
          
//           {/* Default Route (fallback) */}


//           {/* chatbot */}
//           <Route path="/chat" element={<Chatbot />} />

//           <Route path="/chatting" element={<Chatting />} />
//           <Route path = "/map" element={<MapComponent />} />
//           <Route path = "/usermap" element={<UserMapComponent />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import Profile from './Pages/Profile';
import ContactInfo from './Pages/ContactInfo';
import BookingPage from './Pages/BookingPage';
import Bookings from './Pages/Booking';
import ReviewPage from './Pages/Review';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import ServiceDetails from './Pages/ServiceDetails';
import Chatbot from './Pages/chatbot';
import Chatting from './Pages/Chatting';
import MapComponent from './Pages/map';
import UserMapComponent from './Pages/usermap';

import Navbars from './service-provider/components/Navbar';
import Footers from './service-provider/components/Footer';
import ServiceProviderHome from './service-provider/pages/Home';
import ServiceProviderProfile from './service-provider/pages/Profile';
import DashboardPage from './service-provider/pages/DashboardPage';
import ServiceProviderServices from './service-provider/pages/Services';
import ServiceProviderBookings from './service-provider/pages/BookingsPage';
import ServiceProviderAddService from './service-provider/pages/AddService';
import UpdateAppointmentStatus from './service-provider/pages/AppointmentDetails';
import CreateServicePage from './service-provider/pages/Createservice';
import ChatBotIcon from './Pages/ChatBotIcon'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
          <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
          <Route path="/contact-info" element={<><Navbar /><ContactInfo /><Footer /></>} />
          <Route path="/services/:id" element={<><Navbar /><ServiceDetails /><Footer /></>} />
          <Route path="/book/:id" element={<><Navbar /><BookingPage /><Footer /></>} />
          <Route path="/bookings" element={<><Navbar /><Bookings /><Footer /></>} />
          <Route path="/review" element={<><Navbar /><ReviewPage /><Footer /></>} />
          <Route path="/chat" element={<><Navbar /><Chatbot /><Footer /></>} />
          <Route path="/chatting" element={<><Navbar /><Chatting /><Footer /></>} />
          <Route path="/map" element={<><Navbars /><MapComponent /><Footer /></>} />
          <Route path="/usermap" element={<><Navbar /><UserMapComponent /><Footer /></>} />

          {/* Authentication Routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Service Provider Routes */}
          <Route path="/service-provider" element={<><Navbars /><ServiceProviderHome /><Footers /></>} />
          <Route path="/dashboard" element={<><Navbars /><DashboardPage /><Footers /></>} />
          <Route path="/spprofile" element={<><Navbars /><ServiceProviderProfile /><Footers /></>} />
          <Route path="/spbookings" element={<><Navbars /><ServiceProviderBookings /><Footers /></>} />
          <Route path="/add-service" element={<><Navbars /><ServiceProviderAddService /><Footers /></>} />
          <Route path="/spservices" element={<><Navbars /><ServiceProviderServices /><Footers /></>} />
          <Route path="/appointment-details" element={<> <Navbars/> <UpdateAppointmentStatus /></>} />


          <Route path="/create-service" element={<><Navbar />< CreateServicePage/><Footer /></>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
