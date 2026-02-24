from bson import ObjectId
from flask import Blueprint, jsonify, request
from service.performance import performance_score
from utils.validation import validate_car
from data_base import cars
car_bp = Blueprint("cars", __name__)


@car_bp.route("/add-car", methods=["POST"])
def add_car():
    data = request.json
    valid, msg = validate_car(data)
    if not valid:
        return {"error": msg}
    data["performance_score"] = performance_score(data)
    cars.insert_one(data)
    return jsonify({"meaasge": "car added successfully :)"})


@car_bp.route("/cars", methods=["GET"])
def get_cars():
    car_list = []
    for car in cars.find():
        car["_id"] = str(car["_id"])
        car_list.append(car)
    return {"cars": car_list}


@car_bp.route("/delete-car/<car_id>", methods=["DELETE"])
def delete_car(car_id):
    try:
        result = cars.delete_one({"_id": ObjectId(car_id)})
        if result.deleted_count == 1:
            return {"message": "car deleted successfully :)"}
        else:
            return {"message": "car not found :("}
    except Exception as e:
        return {"error": str(e)}


@car_bp.route("/update-car/<car_id>", methods=["PUT"])
def update_car(car_id):
    data = request.json
    try:
        result = cars.update_one(
            {"_id": ObjectId(car_id)},
            {"$set": data}
        )
        if result.matched_count == 0:
            return {"message": "car not found :("}
        elif result.modified_count == 1:
            return {"message": "car updated successfully :)"}
        else:
            return {"message": "car not found or no changes made :("}
    except Exception as e:
        return {"error": str(e)}


@car_bp.route("/top-cars")
def top_cars():
    if cars.count_documents({}) == 0:
        return {"message": "no cars found :("}
    result = list(cars.find().sort("performance_score", -1).limit(5))
    for car in result:
        car["_id"] = str(car["_id"])
    return {"top_cars": result}


@car_bp.route("/car-compare/<car_name1>/<car_name2>", methods=["POST"])
def car_compare(car_name1, car_name2):
    car1 = cars.find_one({"car_name": car_name1})
    car2 = cars.find_one({"car_name": car_name2})
    if not car1 or not car2:
        return {"message": "one or both cars not found :("}
    car1_score = car1.get("performance_score", 0)
    car2_score = car2.get("performance_score", 0)
    if car1_score > car2_score:
        return {"message": f"{car1['car_name']} is better than {car2['car_name']}"}
    elif car1_score < car2_score:
        return {"message": f"{car2['car_name']} is better than {car1['car_name']}"}
    else:
        return {"message": f"{car1['car_name']} and {car2['car_name']} are equally good :)"}
