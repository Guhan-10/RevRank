from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()


# Fail fast instead of hanging for 30s when the database can't be reached.
client = MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
db = client.car_preformance_analyzer
cars = db.cars
