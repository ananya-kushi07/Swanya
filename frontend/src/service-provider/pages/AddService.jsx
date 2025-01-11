import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";  
import "../styles/AddService.css";

const AddService = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const providerId = user.user_id
  const handleAddService = async () => {
    try {
      const newService = {
        name,
        category,
        description,
        price: parseFloat(price),
        availability,
        provider_id: providerId,
      };

      // POST request to add the new service
      await api.post("/services/create", newService);
      // Navigate back to the provider's services page
      navigate("/spservices");
    } catch (err) {
      console.error("Error adding service:", err);
      alert(providerId)
      alert("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="add-service-container">
      <h1 className="add-service-heading">Add New Service</h1>
      <form
        className="add-service-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddService();
        }}
      >
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-service-input"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="add-service-input"
          required
        >
          <option value="">Select Category</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Pest Control">Pest Control</option>
        </select>
        <textarea
          placeholder="Service Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-service-input"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="add-service-input"
          required
        />
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value === "true")}
          className="add-service-input"
          required
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button type="submit" className="add-service-button">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
