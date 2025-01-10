import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Box, Grid } from '@mui/material';

const Bookings = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const user = localStorage.getItem('user');
        const user_id = JSON.parse(user).user_id;
        // Fetch the latest booking data from the backend
        const response = await axios.get(`http://localhost:8000/api/user/${user_id}/appointments`); // Modify this URL
        setBooking(response.data); // Set the fetched booking data
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBooking(); // Call the function to fetch booking
  }, []); // This will run once when the component is mounted

  return (
    <Container sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '30px' }}>
        Your Bookings
      </Typography>

      {booking && booking.length > 0 ? (
        <Grid container spacing={3}>
          {booking.map((bookingItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                  padding: '20px',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: '600', marginBottom: '10px' }}>
                    Appointment Time: {new Date(bookingItem.appointment_time).toLocaleString()}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    Notes: {bookingItem.notes}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#27ae60' }}>
                    Status: {bookingItem.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No bookings made yet.
        </Typography>
      )}
    </Container>
  );
};

export default Bookings;
