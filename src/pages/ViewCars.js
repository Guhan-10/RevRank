import {useEffect, useState} from "react";
import {getCars} from "../services/carAPI";

function ViewCars(){
    const [cars, setCars] = useState([]);
    useEffect(() =>{
        getCars().then(data=>setCars(data.cars));
    }, []);
    return(
        <div>
            <h2>All Cars</h2>
            {cars.map(car =>(
                <div key={car._id} style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "10px"
                }}>
                    <h3>{car.car_name}</h3>
                    <p> Engine: {car.engine_type}</p>
                    <p>Performance Score: {car.performance_score}</p>
                </div>
            ))}
        </div>
    );
}

export default ViewCars;