def performance_score(data):
    hp = data["horsepower"]
    tq = data["torque"]
    mil = data["mileage"]
    price = data["price"]

    score = (
        hp*0.4+tq*0.3+mil*0.2-(price/100000)*0.1
    )
    return round(score, 2)
