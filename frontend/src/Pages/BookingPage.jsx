import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, serviceProviderId } = location.state || {}; // Get state passed from service details

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleBookNow = () => {
    if (bookingDate && notes) {
      const bookingData = {
        serviceId,
        serviceProviderId,
        bookingDate,
        notes,
      };

      // Store booking data in localStorage (or send it to the backend)
      localStorage.setItem('booking', JSON.stringify(bookingData));

      alert('Booking Successful!');
      navigate('/bookings'); // Redirect to the bookings page
    } else {
      alert('Please fill in all fields before booking.');
    }
  };

  return (
    <div className="booking-container">
      <h1>Book Service</h1>

      <div className="form-group">
        <label htmlFor="bookingDate">Select Appointment Date:</label>
        <input
          type="date"
          id="bookingDate"
          value={bookingDate}
          onChange={handleBookingDateChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Mention any requirements or issues..."
        />
      </div>

      <button className="book-now-btn" onClick={handleBookNow}>
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
