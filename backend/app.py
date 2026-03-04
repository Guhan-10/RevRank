from flask import Flask
from routes.car_routes import car_bp
from flask_cors import CORS
app = Flask(__name__)
app.register_blueprint(car_bp)

CORS(app)


@app.route('/')
def home():
    return "RevRank backend is running :)"


if __name__ == '__main__':
    app.run(debug=True)
