import React from "react";
import CompareCars from "../components/CompareCars";
import { Link } from "react-router-dom";

function ComparePage() {
    return (
        <div className="page-container animate-fade-in">
            <div className="page-hero">
                <div className="page-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-sep">›</span>
                    <span>Compare Cars</span>
                </div>
                <h1 className="page-title">Head-to-Head <span className="gradient-text">Battle</span></h1>
                <p className="page-subtitle">Pick two cars and see which one dominates in an AI-powered performance showdown.</p>
            </div>

            <div className="page-content-center">
                <CompareCars />
            </div>
        </div>
    );
}

export default ComparePage;
