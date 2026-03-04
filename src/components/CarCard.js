import React, { useState } from "react";

function CarCard({ car, onDelete, onEdit }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div className="car-card glass-panel animate-fade-in">
            <div className="car-card-header">
                <div>
                    <h3 className="car-title">{car.car_name}</h3>
                    <span className="car-brand">{car.brand}</span>
                </div>
                <div className="performance-score">
                    {Math.round(car.performance_score || 0)}
                </div>
            </div>

            <div className="car-stats">
                <div className="stat-item">
                    <span className="stat-label">Type</span>
                    <span className="stat-value">{car.vehicle_type}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Engine</span>
                    <span className="stat-value">{car.engine_type} ({car.engine_cc}cc)</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Power</span>
                    <span className="stat-value">{car.horsepower} HP / {car.torque} Nm</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Mileage</span>
                    <span className="stat-value">{car.mileage} kmpl</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Year</span>
                    <span className="stat-value">{car.year}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Price</span>
                    <span className="stat-value">${car.price}</span>
                </div>
            </div>

            <div className="car-actions">
                {confirmDelete ? (
                    <div className="delete-confirm">
                        <span className="delete-confirm-text">Delete this car?</span>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete(car._id)}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setConfirmDelete(false)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        {onEdit && (
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                                onClick={() => onEdit(car)}
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button
                                className="btn btn-icon delete"
                                onClick={() => setConfirmDelete(true)}
                                aria-label="Delete car"
                            >
                                🗑️
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CarCard;
