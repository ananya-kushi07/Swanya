# from fastapi import APIRouter, HTTPException
# from models.map_models import Location
# from typing import List
# import uuid

# router = APIRouter()

# # In-memory storage for demonstration (replace with a database in production)
# locations = []

# @router.post("/locations", response_model=Location)
# def add_location(location: Location):
#     location.id = str(uuid.uuid4())  # Generate a unique ID for the location
#     locations.append(location)
#     return location

# @router.get("/locations", response_model=List[Location])
# def get_locations():
#     return locations


from fastapi import APIRouter, HTTPException
from models.map_models import Location
from typing import List
import uuid
from database import db


 # Import the MongoDB collection
locations_collection = db['locations']

router = APIRouter()

# Add a location to the database
@router.post("/locations", response_model=Location)
async def add_location(location: Location):
    location_id = str(uuid.uuid4())  # Generate a unique ID for the location
    location_dict = location.dict()  # Convert Pydantic model to a dictionary
    location_dict['id'] = location_id  # Add the generated ID
    result = await locations_collection.insert_one(location_dict)  # Insert into MongoDB
    location.id = location_id  # Set the ID for the returned object
    return location

# Get all locations from the database
@router.get("/locations", response_model=List[Location])
async def get_locations():
    locations = await locations_collection.find().to_list(100)  # Get up to 100 locations
    return locations