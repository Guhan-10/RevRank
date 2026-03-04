import React, { useState } from "react";
import { addCar } from "../services/carAPI";

function AddCar({ onCarAdded }) {
  const [form, setForm] = useState({
    car_name: "",
    brand: "",
    vehicle_type: "",
    engine_type: "",
    engine_cc: "",
    horsepower: "",
    torque: "",
    mileage: "",
    price: "",
    transmission: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        ...form,
        horsepower: Number(form.horsepower),
        mileage: Number(form.mileage),
        price: Number(form.price),
        engine_cc: Number(form.engine_cc),
        torque: Number(form.torque),
        year: Number(form.year)
      };

      const data = await addCar(payload);

      if (data.error) {
        setMessage({ text: data.error, type: "error" });
      } else {
        setMessage({ text: data.meaasge || "Car added successfully!", type: "success" });
        setForm({
          car_name: "", brand: "", vehicle_type: "", engine_type: "",
          engine_cc: "", horsepower: "", torque: "", mileage: "",
          price: "", transmission: "", year: "",
        });
        if (onCarAdded) onCarAdded();
      }
    } catch (err) {
      setMessage({ text: "Error adding car. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in dashboard-section">
      <div className="header" style={{ marginBottom: "24px", textAlign: "left" }}>
        <h2 style={{ fontSize: "2rem" }}>Add New Car</h2>
        <p>Enter the vehicle details to calculate its performance score.</p>
      </div>

      {message.text && (
        <div style={{
          padding: "16px",
          marginBottom: "24px",
          borderRadius: "var(--border-radius-sm)",
          backgroundColor: message.type === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
          color: message.type === "error" ? "var(--danger)" : "var(--success)",
          border: `1px solid ${message.type === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          <div className="form-group">
            <label>Car Name</label>
            <input name="car_name" placeholder="e.g. Mustang GT" value={form.car_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input name="brand" placeholder="e.g. Ford" value={form.brand} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Vehicle Type</label>
            <select name="vehicle_type" value={form.vehicle_type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Truck">Truck</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>
          <div className="form-group">
            <label>Engine Type</label>
            <select name="engine_type" value={form.engine_type} onChange={handleChange} required>
              <option value="">Select Engine</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Engine CC</label>
            <input type="number" name="engine_cc" placeholder="e.g. 5000" value={form.engine_cc} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label>Horsepower</label>
            <input type="number" name="horsepower" placeholder="e.g. 450" value={form.horsepower} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label>Torque (Nm)</label>
            <input type="number" name="torque" placeholder="e.g. 550" value={form.torque} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label>Mileage (kmpl)</label>
            <input type="number" step="0.1" name="mileage" placeholder="e.g. 10.5" value={form.mileage} onChange={handleChange} required min="0" />
          </div>
          <div className="form-group">
            <label>Transmission</label>
            <select name="transmission" value={form.transmission} onChange={handleChange} required>
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" name="year" placeholder="e.g. 2024" value={form.year} onChange={handleChange} required min="1886" max="2026" />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" placeholder="e.g. 55000" value={form.price} onChange={handleChange} required min="1" />
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: "12px 40px" }}>
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCar;