import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Axios instance for API calls
import './Services.css'; // Ensure you have the correct CSS file linked

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [category, minPrice, maxPrice, availability]);

  const fetchServices = async () => {
    try {
      const filters = {
        category,
        min_price: minPrice ? parseFloat(minPrice) : undefined,
        max_price: maxPrice ? parseFloat(maxPrice) : undefined,
        availability,
      };
      const response = await api.post('/services/search', filters);
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/services/${id}`); // Navigate to the service details page
  };

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Carpentry">Carpentry</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Pest Control">Pest Control</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <label>
        Available Only
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
      </label>
      <button onClick={fetchServices}>Search</button>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service._id}
            className="service-card"
            onClick={() => handleCardClick(service._id)}
          >
            <h2>{service.name}</h2>
            <p>{service.category}</p>
            <p>{service.description}</p>
            <p>${service.price}</p>
            <p>{service.availability ? 'Available' : 'Not Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
