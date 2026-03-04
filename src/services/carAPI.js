const BASE_URL = "http://127.0.0.1:5000";

export const getCars = async () =>{
    const res = await fetch(`${BASE_URL}/cars`);
    return res.json();
};

export const getTopCars = async () => {
    const res = await fetch(`${BASE_URL}/top-cars`);
    return res.json();
};

export const addCar = async (car) =>{
    const res = await fetch(`${BASE_URL}/add-car`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
    });
    return res.json();
};

export const updateCar = async (carId, car) =>{
    const res = await fetch(`${BASE_URL}/update-car/${carId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
    });
    return res.json();
};

export const deleteCar = async (carId) =>{
    const res = await fetch(`${BASE_URL}/delete-car/${carId}`,{
        method: "DELETE",
    });
    return res.json();
};

export const compareCars = async (car1, car2) =>{
    const res = await fetch(`${BASE_URL}/car-compare/${car1}/${car2}`,{
        method : "POST",
    });
    return res.json();
};