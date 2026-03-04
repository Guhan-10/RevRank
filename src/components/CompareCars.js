import React, { useState, useEffect } from "react";
import { getCars, compareCars } from "../services/carAPI";

function CompareCars({ refreshKey }) {
    const [cars, setCars] = useState([]);
    const [car1, setCar1] = useState("");
    const [car2, setCar2] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCars()
            .then(data => setCars(data.cars || []))
            .catch(err => console.error("Error fetching cars for comparison", err));
    }, [refreshKey]);

    const handleCompare = async (e) => {
        e.preventDefault();
        if (!car1 || !car2) {
            alert("Please select two cars to compare.");
            return;
        }
        if (car1 === car2) {
            alert("Please select two different cars.");
            return;
        }

        setLoading(true);
        try {
            const data = await compareCars(car1, car2);
            setResult(data.message);
        } catch (err) {
            setResult("Error comparing cars.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel animate-fade-in dashboard-section">
            <div className="header" style={{ marginBottom: "20px", textAlign: "left" }}>
                <h2 style={{ fontSize: "2rem" }}>Compare Cars</h2>
                <p>Select two cars to see which one has a better performance score.</p>
            </div>

            <form onSubmit={handleCompare} className="compare-container">
                <div className="compare-inputs">
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>First Car</label>
                        <select
                            value={car1}
                            onChange={(e) => setCar1(e.target.value)}
                            required
                        >
                            <option value="">Select a car...</option>
                            {cars.map(c => (
                                <option key={`c1-${c._id}`} value={c.car_name}>{c.car_name} ({c.brand})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ paddingBottom: "12px", color: "var(--text-secondary)", fontWeight: "bold" }}>VS</div>

                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Second Car</label>
                        <select
                            value={car2}
                            onChange={(e) => setCar2(e.target.value)}
                            required
                        >
                            <option value="">Select a car...</option>
                            {cars.map(c => (
                                <option key={`c2-${c._id}`} value={c.car_name}>{c.car_name} ({c.brand})</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ padding: "12px 32px" }}
                    >
                        {loading ? "Comparing..." : "Compare"}
                    </button>
                </div>

                {result && (
                    <div className="compare-result animate-fade-in">
                        {result}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CompareCars;
