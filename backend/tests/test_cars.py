from service.performance import performance_score


def test_performance_score_formula(sample_car):
    # 81*0.4 + 112*0.3 + 24.8*0.2 - (649000/100000)*0.1
    assert performance_score(sample_car) == 70.31


def test_add_then_list_car(client, sample_car):
    res = client.post("/add-car", json=sample_car)
    assert res.status_code == 200

    cars = client.get("/cars").get_json()["cars"]
    assert len(cars) == 1
    assert cars[0]["car_name"] == "Swift"
    assert cars[0]["performance_score"] == 70.31


def test_delete_car(client, sample_car):
    client.post("/add-car", json=sample_car)
    car_id = client.get("/cars").get_json()["cars"][0]["_id"]

    client.delete(f"/delete-car/{car_id}")
    assert client.get("/cars").get_json()["cars"] == []


def test_top_cars_sorted_by_score(client, sample_car):
    for name, hp in [("Slow", 60), ("Fast", 150), ("Mid", 100)]:
        client.post("/add-car", json={**sample_car, "car_name": name, "horsepower": hp})

    top = client.get("/top-cars").get_json()["top_cars"]
    assert [car["car_name"] for car in top] == ["Fast", "Mid", "Slow"]
