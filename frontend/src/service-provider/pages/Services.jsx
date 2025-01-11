import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import api from '../../utils/api';

const Services = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProviderAppointments();
  }, []);

  const fetchProviderAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const providerId = user.user_id;
      const response = await api.get(`/api/provider/${providerId}/appointments`);
      setAppointments(response.data);

      // Fetch service and customer details for each appointment using Promise.all
      const servicePromises = response.data.map(appointment => fetchServiceDetails(appointment.service_id));
      const customerPromises = response.data.map(appointment => fetchCustomerDetails(appointment.customer_id));

      await Promise.all([...servicePromises, ...customerPromises]);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceDetails = async (service_id) => {
    try {
      const response = await api.get(`/services/service/${service_id}`);
      setServiceDetails((prevDetails) => ({
        ...prevDetails,
        [service_id]: response.data.name,
      }));
    } catch (err) {
      console.error('Error fetching service details:', err);
    }
  };

  const fetchCustomerDetails = async (customer_id) => {
    try {
      const response = await api.get(`/services/customers/${customer_id}`);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        [customer_id]: response.data.full_name,
      }));
    } catch (err) {
      console.error('Error fetching customer details:', err);
    }
  };

  const handleAppointmentClick = (appointment) => {
    navigate(`/appointment-details`, {
      state: {
        service_id: appointment.service_id,
        provider_id: appointment.provider_id,
        appointment_id: appointment._id,
        status: appointment.status,
      },
    });
  };

  const handleChatClick = (appointment) => {
    navigate(`/chatting`, {
      state: {
        service_id: appointment.service_id,
        customer_id: appointment.customer_id,
        provider_id: appointment.provider_id,
        appointment_id: appointment._id,
      },
    });
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="provider-services-container">
      <h1>Your Appointments</h1>
      {appointments.length > 0 ? (
        <ul className="services-list">
          {appointments.map((appointment) => (
            <li
              key={appointment.appointment_id}
              className="service-item"
            >
              <h2>Service: {serviceDetails[appointment.service_id] || 'Loading...'}</h2>
              <p>Customer: {customerDetails[appointment.customer_id] || 'Loading...'}</p>
              <p>Date: {new Date(appointment.appointment_time).toLocaleString()}</p>
              <p>Status: {appointment.status}</p>
              {appointment.status === 'pending' && (
                <button
                  className="appointment-button"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  View Details
                </button>
              )}
              <button
                className="chat-button"
                onClick={() => handleChatClick(appointment)}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Services;
