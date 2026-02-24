from flask import Flask
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()


client = MongoClient(os.getenv("MONGO_URI"))
db = client.car_preformance_analyzer
cars = db.cars
