const BASE_URL = "http://127.0.0.1:5000";

export const getCars = async () =>{
    const res = await fetch(`${BASE_URL}/cars`);
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

export const compareCars = async (car1, car2) =>{
    const res = await fetch(`${BASE_URL}/car-cpmpare/${car1}/${car2}`,{
        method : "POST",
    });
    return res.json();
};