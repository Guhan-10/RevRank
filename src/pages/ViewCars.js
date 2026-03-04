import React, { useEffect, useState } from "react";
import { getCars, deleteCar } from "../services/carAPI";
import CarCard from "../components/CarCard";

function ViewCars({ refreshKey }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCars = () => {
        setLoading(true);
        getCars()
            .then(data => {
                setCars(data.cars || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching cars", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars();
    }, [refreshKey]);

    const handleDelete = async (carId) => {
        try {
            await deleteCar(carId);
            fetchCars();
        } catch (err) {
            console.error("Failed to delete car.", err);
        }
    };

    if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading Database...</div>;

    return (
        <div className="dashboard-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="header" style={{ marginBottom: "24px", textAlign: "left" }}>
                <h2 style={{ fontSize: "2rem" }}>Vehicle Directory</h2>
                <p>Complete directory of all analyzed vehicles.</p>
            </div>

            {cars.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: "center" }}>
                    <p>No cars found. Add some cars to get started!</p>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <CarCard
                            key={car._id}
                            car={car}
                            onDelete={handleDelete}
                        // onEdit={(car) => console.log('Edit clicked', car)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewCars;