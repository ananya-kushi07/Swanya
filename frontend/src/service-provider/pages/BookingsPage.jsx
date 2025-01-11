import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./BookingsPage.css"; // Create this file for custom styles

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // Hook for navigation
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const providerId = user?.user_id; // Safely access user_id

  useEffect(() => {
    const fetchServices = async () => {
      if (!providerId) {
        console.error("Provider ID not found.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/services/provider/${providerId}/services`);
        console.log("Fetched services data:", response.data);
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setServices([]);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, [providerId]);

  const handleCreateService = () => {
    navigate("/create-service"); // Route to create service page
  };

  return (
    <div className="services-page">
      <h1>Services Provided</h1>
      <button onClick={handleCreateService} className="create-service-button">
        Create New Service
      </button>
      <div className="services-container">
        {services.length > 0 ? (
          services.map((service) => (
            <div className="service-card" key={service.id}>
              <h3>{service.name}</h3>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Description:</strong> {service.description}</p>
              <p><strong>Price:</strong> ${service.price.toFixed(2)}</p>
              <p><strong>Available:</strong> {service.availability ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
