import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
  const [providerName, setProviderName] = useState('');
  const [providerService, setProviderService] = useState('');
  const [providerLocation, setProviderLocation] = useState(null);

  useEffect(() => {
    // Fetch locations from the backend
    axios.get('http://localhost:8000/api/locations')
      .then((response) => setServiceLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  const handleAddLocation = () => {
    if (!providerName || !providerService || !providerLocation) {
      alert('Please fill in all fields and select a location.');
      return;
    }

    const newLocation = {
      name: providerName,
      service: providerService,
      lat: providerLocation[0],
      lng: providerLocation[1],
    };

    // Send the new location to the backend
    axios.post('http://localhost:8000/api/locations', newLocation)
      .then((response) => {
        setServiceLocations([...serviceLocations, response.data]); // Update the state with the new location
        setProviderName('');
        setProviderService('');
        setProviderLocation(null);
        alert('Location added successfully!');
      })
      .catch((error) => console.error('Error adding location:', error));
  };

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setProviderLocation([lat, lng]); // Set the selected location
      },
    });

    return providerLocation ? (
      <Marker position={providerLocation}>
        <Popup>Selected Location</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div>
      <h1>Service Map</h1>

      {/* Form for adding service provider locations */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Add Your Service Location</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={providerService}
          onChange={(e) => setProviderService(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Select Service</option>
          <option value="AC Technician">AC Technician</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Mechanical">Mechanical</option>
        </select>
        <button onClick={handleAddLocation}>Add Location</button>
        {providerLocation && (
          <div style={{ marginTop: '10px' }}>
            Selected Coordinates: {providerLocation[0].toFixed(6)}, {providerLocation[1].toFixed(6)}
          </div>
        )}
      </div>

      <MapContainer
        center={userLocation || [20.5937, 78.9629]}
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
            <Popup>{location.name} ({location.service})</Popup>
          </Marker>
        ))}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;