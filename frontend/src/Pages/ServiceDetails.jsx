import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Axios instance for API calls
import './ServiceDetails.css'; // Add styling as needed

const ServiceDetails = () => {
  const { id } = useParams(); // Get service ID from the URL
  const [service, setService] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const serviceResponse = await api.get(`/services/${id}`);
      setService(serviceResponse.data);

      // Fetch service provider details using provider_id from service
      const providerResponse = await api.get(`/services/provider/${serviceResponse.data.provider_id}`);
      setServiceProvider(providerResponse.data);
    } catch (err) {
      console.error('Error fetching service or provider details:', err);
    }
  };

  const handleBookNow = () => {
    navigate(`/book/${id}`, {
      state: {
        serviceId: id,
        serviceProviderId: service?.provider_id,
      },
    });
  };

  if (!service || !serviceProvider) return <p>Loading...</p>;

  return (
    <div className="service-details-container">
      <section className="service-section">
        <h2>{service.name}</h2>
        <p>{service.category}</p>
        <p>{service.description}</p>
        <p>Price: ${service.price}</p>
        <p>Availability: {service.availability ? 'Available' : 'Not Available'}</p>
      </section>

      <section className="provider-section">
        <h3>Service Provider Details</h3>
        <p>Name: {serviceProvider.full_name}</p>
        <p>Email: {serviceProvider.email}</p>
        <p>Location: {serviceProvider.location}</p>
        <p>Preferences: {JSON.stringify(serviceProvider.preferences)}</p>
      </section>

      <button className="book-now-btn" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
};

export default ServiceDetails;
