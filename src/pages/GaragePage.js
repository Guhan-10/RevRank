import React, { useState } from "react";
import ViewCars from "./ViewCars";
import { Link } from "react-router-dom";

function GaragePage() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="page-container animate-fade-in">
            <div className="page-hero">
                <div className="page-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span>Garage</span>
                </div>
                <div className="page-hero-row">
                    <div>
                        <h1 className="page-title">My <span className="gradient-text">Garage</span></h1>
                        <p className="page-subtitle">Your complete vehicle directory with full performance metrics.</p>
                    </div>
                    <Link to="/add" className="btn btn-primary">
                        + Add New Car
                    </Link>
                </div>
            </div>

            <ViewCars refreshKey={refreshKey} onDelete={() => setRefreshKey(k => k + 1)} />
        </div>
    );
}

export default GaragePage;
