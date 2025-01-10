// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import axios from 'axios';  // Import axios for making API calls

// // Custom styling using makeStyles
// const useStyles = makeStyles((theme) => ({
//   bookingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '20px',
//     marginTop: '40px',
//     padding: '20px',
//   },
//   formGroup: {
//     width: '100%',
//     maxWidth: '500px',
//     marginBottom: '20px',
//   },
//   textField: {
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#27ae60', // Green color for the button
//     color: '#fff',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     '&:hover': {
//       backgroundColor: '#2ecc71', // Darker green on hover
//     },
//   },
//   card: {
//     width: '100%',
//     maxWidth: '500px',
//     borderRadius: '15px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#fff', // White background for card
//   },
//   cardContent: {
//     padding: '20px',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: '1.8rem',
//     fontWeight: '600',
//     color: '#34495e',
//     marginBottom: '20px',
//   },
// }));

// const BookingPage = () => {
//   const [bookingDate, setBookingDate] = useState('');
//   const [notes, setNotes] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { serviceId, serviceProviderId, customerId } = location.state || {}; // Get state passed from service details
//   const classes = useStyles();

//   const handleBookingDateChange = (e) => {
//     setBookingDate(e.target.value);
//   };

//   const handleNotesChange = (e) => {
//     setNotes(e.target.value);
//   };

//   const handleBookNow = async () => {
//     if (bookingDate && notes) {
//       const bookingData = {
//         service_id: serviceId,
//         customer_id: customerId,  // Assuming customerId is available from state
//         provider_id: serviceProviderId,
//         appointment_time: new Date(bookingDate).toISOString(), // Ensure date format is correct
//         notes,
//       };

//       try {
//         // Make API call to save booking data on the backend
//         const response = await axios.post('/api/', bookingData);

//         if (response.status === 200) {
//           alert('Booking Successful!');
//           navigate('/bookings'); // Redirect to the bookings page
//         }
//       } catch (error) {
//         console.error('Error while making the booking:', error);
//         alert('There was an error booking the service. Please try again.');
//       }
//     } else {
//       alert('Please fill in all fields before booking.');
//     }
//   };

//   return (
//     <Container className={classes.bookingContainer}>
//       <Card className={classes.card}>
//         <CardContent className={classes.cardContent}>
//           <Typography variant="h5" className={classes.title}>
//             Book Your Service
//           </Typography>

//           <div className={classes.formGroup}>
//             <TextField
//               label="Select Appointment Date"
//               type="date"
//               value={bookingDate}
//               onChange={handleBookingDateChange}
//               className={classes.textField}
//               variant="outlined"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>

//           <div className={classes.formGroup}>
//             <TextField
//               label="Notes"
//               multiline
//               rows={4}
//               value={notes}
//               onChange={handleNotesChange}
//               placeholder="Mention any requirements or issues..."
//               className={classes.textField}
//               variant="outlined"
//             />
//           </div>

//           <Box display="flex" justifyContent="center" width="100%">
//             <Button
//               className={classes.button}
//               variant="contained"
//               onClick={handleBookNow}
//             >
//               Confirm Booking
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default BookingPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import api from '../utils/api'; // Import axios for making API calls

const BookingPage = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, serviceProviderId } = location.state || {}; // Get state passed from service details

  // Fetch customer_id from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Parse JSON object
  const customerId = user.user_id; // Access `id` from user object
  console.log('Fetched customer_id from localStorage:', customerId); // Log customer_id to verify
  console.log('Fetched serviceId from location state:', serviceId); // Log serviceId to verify
  console.log('Fetched serviceProviderId from location state:', serviceProviderId); // Log serviceProviderId to verify

  const handleBookingDateChange = (e) => setBookingDate(e.target.value);
  const handleBookingTimeChange = (e) => setBookingTime(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleBookNow = async () => {
    if (bookingDate && bookingTime && notes) {
      // Combine date and time for appointment_time
      const appointmentDateTime = new Date(`${bookingDate}T${bookingTime}:00`).toISOString();

      // Prepare booking data to be sent to the backend
      const bookingData = {
        service_id: serviceId,
        customer_id: customerId, // Include customer_id
        provider_id: serviceProviderId,
        appointment_time: appointmentDateTime, // Combined date and time
        // status: "pending" ,// Include status
        notes
        
      };

      console.log('Booking data to be sent:', bookingData); // Log booking data to verify

      try {
        // Make API call to save booking data on the backend
        const response = await api.patch('/api/booking', bookingData);

        if (response.status === 200) {
          alert('Booking Successful!');
          navigate('/bookings'); // Redirect to the bookings page
        }
      } catch (error) {
        console.error('Error while making the booking:', error);
        alert('There was an error booking the service. Please try again.');
      }
    } else {
      alert('Please fill in all fields before booking.');
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '40px', padding: '20px' }}>
      <Card sx={{ width: '100%', maxWidth: '500px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: '600', color: '#34495e', marginBottom: '20px' }}>
            Book Your Service
          </Typography>

          {/* Booking Date */}
          <TextField
            label="Select Appointment Date"
            type="date"
            value={bookingDate}
            onChange={handleBookingDateChange}
            sx={{ width: '100%', marginBottom: '20px' }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Booking Time */}
          <TextField
            label="Select Appointment Time"
            type="time"
            value={bookingTime}
            onChange={handleBookingTimeChange}
            sx={{ width: '100%', marginBottom: '20px' }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Notes */}
          <TextField
            label="Notes"
            multiline
            rows={4}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Mention any requirements or issues..."
            sx={{ width: '100%', marginBottom: '20px' }}
            variant="outlined"
          />

          {/* Submit Button */}
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#27ae60',
                color: '#fff',
                borderRadius: '5px',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#2ecc71' },
              }}
              onClick={handleBookNow}
            >
              Confirm Booking
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookingPage;