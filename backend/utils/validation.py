def validate_car(data):
    required_fields = ["car_name", "brand", "vehicle_type", "engine_type",
                       "engine_cc", "horsepower", "mileage", "price", "transmission", "year", "torque"]
    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"
    if data["price"] <= 0:
        return False, "Price must be greater than 0"
    if data["engine_cc"] <= 0:
        return False, "Engine CC must be positive"
    if data["horsepower"] <= 0:
        return False, "Horsepower must be positive"
    if data["mileage"] < 0:
        return False, "Mileage cannot be negative"
    if data["year"] < 1886 or data["year"] > 2026:
        return False, "Year must be between 1886 and 2026"
    if data["torque"] <= 0:
        return False, "Torque must be positive"
    return True, "Valid data"
