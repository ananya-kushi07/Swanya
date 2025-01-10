import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Input, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import api from '../utils/api'; // Axios instance for API calls

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
    navigate(`/services/${id}`);
  };

  return (
    <Box className="services-container" sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Our Services</Typography>

      {/* Search and Filter Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 3 }}>
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          sx={{ flex: 1 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Plumbing">Plumbing</MenuItem>
          <MenuItem value="Electrical">Electrical</MenuItem>
          <MenuItem value="Carpentry">Carpentry</MenuItem>
          <MenuItem value="Cleaning">Cleaning</MenuItem>
          <MenuItem value="Mechanical">Mechanical</MenuItem>
          <MenuItem value="Pest Control">Pest Control</MenuItem>
        </Select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ width: '100px' }}
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{ width: '100px' }}
        />
        <FormControlLabel
          control={<Checkbox checked={availability} onChange={(e) => setAvailability(e.target.checked)} />}
          label="Available Only"
        />
        <Button variant="contained" onClick={fetchServices}>Search</Button>
      </Box>

      {/* Services List */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {services.map((service) => (
          <Box
            key={service._id}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 1,
              padding: 2,
              '&:hover': { boxShadow: 3 },
              position: 'relative',
            }}
            onClick={() => handleCardClick(service._id)}
          >
            <Typography variant="h6" sx={{ marginBottom: 1 }}>{service.name}</Typography>
            <Typography variant="body2" sx={{ marginBottom: 1, color: 'text.secondary' }}>{service.category}</Typography>
            <Typography variant="body2" sx={{ marginBottom: 1, color: 'text.secondary' }}>{service.description}</Typography>
            <Typography variant="h6" sx={{ marginBottom: 1, color: 'green' }}>₹{service.price}</Typography>
            <Typography variant="body2" sx={{ color: service.availability ? 'green' : 'red' }}>
              {service.availability ? 'Available' : 'Not Available'}
            </Typography>

            {/* Book Now Button */}
            {/* <Button
              variant="contained"
              color="success"
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                borderRadius: 5,
                fontSize: '0.9rem',
                '&:hover': { backgroundColor: '#27ae60' },
              }}
              onClick={() => navigate(`/book/${service._id}`)}
            >
              Book Now
            </Button> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Services;
