import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateServicePage.css"; // Optional: Create for custom styles

const CreateServicePage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const providerId = user?.user_id; // Fetch provider_id from localStorage

  const handleCreateService = async (e) => {
    e.preventDefault();
    const serviceData = {
      name,
      category,
      description,
      price: parseFloat(price),
      availability,
      provider_id: providerId,
    };

    try {
      const response = await axios.post("http://localhost:8000/services/create", serviceData);
      console.log("Service created:", response.data);
      navigate("/map"); // Redirect to /map on success
    } catch (error) {
      console.error("Failed to create service:", error);
    }
  };

  return (
    <div className="create-service-page">
      <h1>Create a New Service</h1>
      <form onSubmit={handleCreateService}>
        <div>
          <label>Service Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
  <label>Category</label>
  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
    <option value="">Select a category</option>
    <option value="Electrical">Electrical</option>
    <option value="Plumbing">Plumbing</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Cleaning">Cleaning</option>
    
  </select>
</div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Available</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value === "true")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreateServicePage;
