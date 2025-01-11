// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapComponent = () => {
//   const [serviceLocations, setServiceLocations] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedService, setSelectedService] = useState('');
//   const [providerLocation, setProviderLocation] = useState(null);
//   const [nearestLocation, setNearestLocation] = useState(null);

//   useEffect(() => {
//     // Fetch locations from the backend
//     axios.get('http://localhost:8000/api/locations')
//       .then((response) => setServiceLocations(response.data))
//       .catch((error) => console.error('Error fetching locations:', error));
//   }, []);

//   // Get user's location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation([latitude, longitude]);
//       });
//     }
//   }, []);

//   // Function to calculate the distance between two lat/lng coordinates (Haversine formula)
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

//   // Find the nearest location for the selected service
//   useEffect(() => {
//     if (userLocation && selectedService && serviceLocations.length > 0) {
//       let closestLocation = null;
//       let minDistance = Infinity;

//       serviceLocations
//         .filter(location => location.service === selectedService)
//         .forEach((location) => {
//           const distance = calculateDistance(userLocation[0], userLocation[1], location.lat, location.lng);
//           if (distance < minDistance) {
//             minDistance = distance;
//             closestLocation = location;
//           }
//         });

//       setNearestLocation(closestLocation);
//     }
//   }, [userLocation, selectedService, serviceLocations]);

//   // Component to handle map clicks (for selecting new location)
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setProviderLocation([lat, lng]); // Set the selected location
//       },
//     });

//     return providerLocation ? (
//       <Marker position={providerLocation}>
//         <Popup>Selected Location</Popup>
//       </Marker>
//     ) : null;
//   };

//   return (
//     <div>
//       <h1>Service Map</h1>

//       {/* Dropdown for service selection */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Select a Service</h3>
//         <select
//           value={selectedService}
//           onChange={(e) => setSelectedService(e.target.value)}
//           style={{ marginRight: '10px' }}
//         >
//           <option value="">Select Service</option>
//           <option value="AC Technician">AC Technician</option>
//           <option value="Electrician">Electrician</option>
//           <option value="Plumber">Plumber</option>
//           <option value="Cleaner">Cleaner</option>
//           <option value="Mechanical">Mechanical</option>
//         </select>
//       </div>

//       {/* Display nearest location */}
//       {nearestLocation && (
//         <div style={{ marginBottom: '20px' }}>
//           <h3>Nearest {selectedService}</h3>
//           <div>
//             <p>Name: {nearestLocation.name}</p>
//             <p>Location: {nearestLocation.lat.toFixed(6)}, {nearestLocation.lng.toFixed(6)}</p>
//             <p>Distance: {calculateDistance(userLocation[0], userLocation[1], nearestLocation.lat, nearestLocation.lng).toFixed(2)} km</p>
//           </div>
//         </div>
//       )}

//       <MapContainer
//         center={userLocation || [20.5937, 78.9629]}
//         zoom={userLocation ? 12 : 5}
//         style={{ height: '500px', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         {userLocation && (
//           <Marker position={userLocation}>
//             <Popup>You are here!</Popup>
//           </Marker>
//         )}
//         {serviceLocations.map((location) => (
//           <Marker key={location.id} position={[location.lat, location.lng]}>
//             <Popup>{location.name} ({location.service})</Popup>
//           </Marker>
//         ))}
//         {nearestLocation && (
//           <Marker position={[nearestLocation.lat, nearestLocation.lng]}>
//             <Popup>Nearest Service Location</Popup>
//           </Marker>
//         )}
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  const [serviceLocations, setServiceLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [nearestLocation, setNearestLocation] = useState(null);

  useEffect(() => {
    // Fetch service locations from the backend
    axios.get('http://localhost:8000/api/locations')
      .then((response) => setServiceLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  }, []);

  // Function to calculate the distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Find the nearest location for the selected service
  useEffect(() => {
    if (userLocation && selectedService && serviceLocations.length > 0) {
      let closestLocation = null;
      let minDistance = Infinity;

      serviceLocations
        .filter(location => location.service === selectedService)
        .forEach((location) => {
          const distance = calculateDistance(userLocation[0], userLocation[1], location.lat, location.lng);
          if (distance < minDistance) {
            minDistance = distance;
            closestLocation = location;
          }
        });

      setNearestLocation(closestLocation);
    }
  }, [userLocation, selectedService, serviceLocations]);

  // Auto-zoom and center the map on the nearest location
  const AutoCenterMap = () => {
    const map = useMap();

    useEffect(() => {
      if (nearestLocation) {
        map.setView([nearestLocation.lat, nearestLocation.lng], 14);
      }
    }, [nearestLocation, map]);

    return null;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Service Finder Map</h1>

      {/* Service selection dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Select a Service</h3>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
        >
          <option value="">Select Service</option>
          <option value="AC Technician">AC Technician</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Mechanic">Mechanic</option>
        </select>
      </div>

      {/* Display nearest location */}
      {nearestLocation && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Nearest {selectedService}</h3>
          <p><strong>Name:</strong> {nearestLocation.name}</p>
          <p><strong>Location:</strong> {nearestLocation.lat.toFixed(6)}, {nearestLocation.lng.toFixed(6)}</p>
          <p><strong>Distance:</strong> {calculateDistance(userLocation[0], userLocation[1], nearestLocation.lat, nearestLocation.lng).toFixed(2)} km</p>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={userLocation || [20.5937, 78.9629]} // Default center: India
        zoom={userLocation ? 12 : 5}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here!</Popup>
          </Marker>
        )}
        {serviceLocations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>
              <strong>{location.name}</strong><br />
              <strong>Service:</strong> {location.service}<br />
              <strong>Contact:</strong> {location.contact || 'N/A'}<br />
              <strong>Address:</strong> {location.address || 'N/A'}
            </Popup>
          </Marker>
        ))}
        {nearestLocation && (
          <Marker position={[nearestLocation.lat, nearestLocation.lng]}>
            <Popup>
              <strong>Nearest {selectedService}</strong><br />
              {nearestLocation.name}<br />
              <strong>Distance:</strong> {calculateDistance(userLocation[0], userLocation[1], nearestLocation.lat, nearestLocation.lng).toFixed(2)} km
            </Popup>
          </Marker>
        )}
        <AutoCenterMap />
      </MapContainer>
    </div>
  );
};

export default MapComponent;