import React from "react";
import Dashboard from "../components/Dashboard";
import { Link } from "react-router-dom";

function TopCarsPage() {
    return (
        <div className="page-container animate-fade-in">
            <div className="page-hero">
                <div className="page-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span>Top Cars</span>
                </div>
                <h1 className="page-title">Top <span className="gradient-text">Performers</span></h1>
                <p className="page-subtitle">The highest-scoring vehicles in your collection, ranked by performance score.</p>
            </div>

            <Dashboard />
        </div>
    );
}

export default TopCarsPage;
