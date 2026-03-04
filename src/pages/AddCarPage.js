import React, { useState } from "react";
import AddCar from "../components/AddCar";
import { Link } from "react-router-dom";

function AddCarPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="page-container animate-fade-in">
            <div className="page-hero">
                <div className="page-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span>Add Car</span>
                </div>
                <h1 className="page-title">Add <span className="gradient-text">New Vehicle</span></h1>
                <p className="page-subtitle">Enter your vehicle's specs. Our analyser will compute its performance score instantly.</p>
            </div>

            <div className="page-content-center">
                <AddCar onCarAdded={() => setRefreshKey(k => k + 1)} />
            </div>
        </div>
    );
}

export default AddCarPage;
