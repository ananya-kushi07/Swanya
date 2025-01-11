// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; // For accessing state and navigation
// import api from '../../utils/api'; // Axios instance for API calls

// const UpdateAppointmentStatus = () => {
//   const location = useLocation(); // Get the passed state data
//   const navigate = useNavigate(); // For navigating to other pages

//   // Extract data from location state (passed via navigate)
//   const { service_id, provider_id, appointment_id, status } = location.state || {};

//   const [newStatus, setNewStatus] = useState(status || ''); // State to hold the new status
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [success, setSuccess] = useState(null); // Success message state

//   useEffect(() => {
    
//   }, [service_id, provider_id, appointment_id]);

//   // Handle status change
//   const handleStatusChange = (e) => {
//     setNewStatus(e.target.value); // Update the status when user selects an option
//   };

//   // Submit the form to update the status
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);
  
//     try {
//       // Send the provider_id, appointment_id, and status as query parameters
//       const response = await api.patch(
//         `/api/update-status/${provider_id}?appointment_id=${appointment_id}&status=${newStatus}`
//       );
//       setSuccess(response.data.message); // Show success message
//     } catch (err) {
//       setError('Failed to update appointment status. Please try again.');
//       console.error('Error updating status:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="update-status-container">
//       <h1>Update Appointment Status</h1>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         {/* Status dropdown */}
//         <div className="form-group">
//           <label>Status:</label>
//           <select value={newStatus} onChange={handleStatusChange}>
//             <option value="">Select Status</option>
//             <option value="accepted">Accepted</option>
//             <option value="canceled">Canceled</option>
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Updating...' : 'Update Status'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateAppointmentStatus;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, X, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const UpdateAppointmentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service_id, provider_id, appointment_id, status } = location.state || {};
  
  const [newStatus, setNewStatus] = useState(status || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.patch(
        `/api/update-status/${provider_id}?appointment_id=${appointment_id}&status=${newStatus}`
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError('Failed to update appointment status. Please try again.');
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md transform rounded-xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Update Appointment Status
        </h1>

        {error && (
          <div className="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-red-800">
            <X className="mr-2 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center rounded-lg bg-green-50 p-4 text-green-800">
            <Check className="mr-2 h-5 w-5" />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={newStatus}
              onChange={handleStatusChange}
              className="w-full rounded-lg border border-gray-300 p-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select Status</option>
              <option value="accepted">Accepted</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-blue-400"
          >
            <span className="relative flex items-center justify-center">
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Check className="mr-2 h-5 w-5" />
              )}
              {loading ? 'Updating...' : 'Update Status'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointmentStatus;