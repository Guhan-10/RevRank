import os

from flask import Flask
from flask_cors import CORS

import data_base
from routes.car_routes import car_bp

app = Flask(__name__)
app.register_blueprint(car_bp)

# Comma-separated list of origins allowed to call the API.
# Origins only, no path (e.g. https://guhan-10.github.io, not .../RevRank).
allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]
CORS(app, origins=allowed_origins)


@app.route('/')
def home():
    return "RevRank backend is running :)"


@app.route('/health')
def health():
    try:
        data_base.client.admin.command("ping")
    except Exception:
        return {"status": "error", "database": "unreachable"}, 503
    return {"status": "ok", "database": "ok"}, 200


if __name__ == '__main__':
    app.run(debug=True)
