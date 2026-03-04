import React, { useState, useEffect } from "react";
import { getTopCars } from "../services/carAPI";
import CarCard from "./CarCard";

function Dashboard({ refreshKey }) {
    const [topCars, setTopCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTopCars()
            .then(data => {
                setTopCars(data.top_cars || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching top cars", err);
                setLoading(false);
            });
    }, [refreshKey]);

    if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading Top Performers...</div>;
    if (topCars.length === 0) return null;

    return (
        <div className="dashboard-section animate-fade-in">
            <div className="header" style={{ marginBottom: "24px", textAlign: "left" }}>
                <h2 style={{ fontSize: "2rem" }}>Top Performers</h2>
                <p>The highest rated cars based on performance scores.</p>
            </div>

            <div className="cars-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {topCars.map((car, index) => (
                    <div key={car._id} style={{ position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            top: "-10px",
                            left: "-10px",
                            width: "30px",
                            height: "30px",
                            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            zIndex: 10,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                        }}>
                            {index + 1}
                        </div>
                        <CarCard car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
