import mongomock
import pytest

import data_base
from app import app as flask_app
from routes import car_routes


@pytest.fixture
def mongo(monkeypatch):
    client = mongomock.MongoClient()
    monkeypatch.setattr(data_base, "client", client)
    monkeypatch.setattr(car_routes, "cars", client.test_db.cars)
    return client


@pytest.fixture
def client(mongo):
    flask_app.config["TESTING"] = True
    return flask_app.test_client()


@pytest.fixture
def sample_car():
    return {
        "car_name": "Swift",
        "brand": "Maruti Suzuki",
        "vehicle_type": "Hatchback",
        "engine_type": "Petrol",
        "engine_cc": 1197,
        "horsepower": 81,
        "torque": 112,
        "mileage": 24.8,
        "price": 649000,
        "transmission": "Manual",
        "year": 2024,
    }
