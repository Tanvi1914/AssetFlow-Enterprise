from pymongo import MongoClient
from app.config import Config

client = MongoClient(Config.MONGO_URI)

db = client["assetflow"]
users = db["users"]
assets = db["assets"]
employees = db["employees"]
vendors = db["vendors"]
categories = db["categories"]
assignments = db["assignments"]
activity_logs = db["activity_logs"]