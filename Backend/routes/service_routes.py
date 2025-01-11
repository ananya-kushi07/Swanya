# from fastapi import APIRouter, HTTPException, Depends
# from models.service_models import ServiceCreate, ServiceSearch, ServiceResponse
# from models.user_models import UserProfile
# from motor.motor_asyncio import AsyncIOMotorClient
# from typing import List
# from database import get_database, db
# from bson import ObjectId

# router = APIRouter()

# # MongoDB client setup
# client = AsyncIOMotorClient("mongodb://localhost:27017")
# db = client["your_database_name"]
# services_collection = db["services"]

# # Route for service providers to create a service
# @router.post("/create", response_model=ServiceResponse)
# async def create_service(service: ServiceCreate, db=Depends(get_database)) -> ServiceResponse:
#     """
#     Endpoint for service providers to create a service.
#     """
#     services_collection = db["services"]
#     service_data = service.dict()

#     # Use the provider_id from the service input
#     service_data["provider_id"] = service.provider_id  # Assume provider_id is a field in ServiceCreate

#     result = await services_collection.insert_one(service_data)
#     service_data["_id"] = str(result.inserted_id)
#     return ServiceResponse(**service_data)





# # Route for customers to view all services
# @router.get("/", response_model=List[ServiceResponse])
# async def list_services(db = Depends(get_database)) -> List[ServiceResponse]:
#     """
#     Endpoint for customers to list all available services.
#     """
#     services_collection = db["services"]
#     services = await services_collection.find().to_list(100)
#     for service in services:
#         service["_id"] = str(service["_id"])
#     return [ServiceResponse(**service) for service in services]

# # Route for customers to search and filter services
# @router.post("/search", response_model=List[ServiceResponse])
# async def search_services(filters: ServiceSearch, db = Depends(get_database)) -> List[ServiceResponse]:
#     """
#     Endpoint for customers to search and filter services.
#     """
#     services_collection = db["services"]
#     query = {}
#     if filters.category:
#         query["category"] = filters.category
#     if filters.min_price is not None:
#         query["price"] = {"$gte": filters.min_price}
#     if filters.max_price is not None:
#         query.setdefault("price", {})["$lte"] = filters.max_price
#     if filters.availability is not None:
#         query["availability"] = filters.availability

#     services = await services_collection.find(query).to_list(100)
#     for service in services:
#         service["_id"] = str(service["_id"])
#     return [ServiceResponse(**service) for service in services]


# # Route to fetch the details of the service_provider using the service_provider_id

# @router.get("/provider/{provider_id}", response_model=UserProfile)
# async def get_service_provider(provider_id: str, db=Depends(get_database)) -> UserProfile:
#     """
#     Endpoint to fetch the details of the service provider using the provider_id.
#     """
#     users_collection = db["users"]
#     service_provider = await users_collection.find_one({"_id": ObjectId(provider_id)})
#     if not service_provider:
#         raise HTTPException(status_code=404, detail="Service provider not found")
#     service_provider["_id"] = str(service_provider["_id"])
#     return UserProfile(**service_provider)


# # Route to fetch the details of a service by service ID
# # @router.get("/service/{service_id}", response_model=ServiceResponse)
# # async def get_service_by_id(service_id: str, db=Depends(get_database)) -> ServiceResponse:
# #     """
# #     Endpoint to fetch the details of a service by service ID.
# #     """
# #     service = await services_collection.find_one({"_id": ObjectId(service_id)})
# #     if not service:
# #         raise HTTPException(status_code=404, detail="Service not found")
# #     service["_id"] = str(service["_id"])
# #     return ServiceResponse(**service)



# services_collection = db["services"]


# @router.get("/service/{service_id}", response_model=ServiceResponse)
# async def get_service_by_id(service_id: str, db=Depends(get_database)) -> ServiceResponse:
#     """
#     Endpoint to fetch the details of a service by service ID.
#     """
#     services_collection = db["services"]
#     if not ObjectId.is_valid(service_id):
#         raise HTTPException(status_code=400, detail="Invalid service ID")
#     try:
#         service = await services_collection.find_one({"_id": ObjectId(service_id)})
#         if not service:
#             raise HTTPException(status_code=404, detail="Service not found")
#         service["_id"] = str(service["_id"])  # Convert ObjectId to string
#         return ServiceResponse(**service)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


from fastapi import APIRouter, HTTPException, Depends
from models.service_models import ServiceCreate, ServiceSearch, ServiceResponse
from models.user_models import UserProfile
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from database import get_database, db
from bson import ObjectId

router = APIRouter()

# MongoDB client setup
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["your_database_name"]
services_collection = db["services"]


@router.post("/search", response_model=List[ServiceResponse])
async def search_services(filters: ServiceSearch, db = Depends(get_database)) -> List[ServiceResponse]:
    """
    Endpoint for customers to search and filter services.
    """
    services_collection = db["services"]
    query = {}
    if filters.category:
        query["category"] = filters.category
    if filters.min_price is not None:
        query["price"] = {"$gte": filters.min_price}
    if filters.max_price is not None:
        query.setdefault("price", {})["$lte"] = filters.max_price
    if filters.availability is not None:
        query["availability"] = filters.availability

    services = await services_collection.find(query).to_list(100)
    for service in services:
        service["_id"] = str(service["_id"])
    return [ServiceResponse(**service) for service in services]


# Route for service providers to create a service
@router.post("/create", response_model=ServiceResponse)
async def create_service(service: ServiceCreate, db=Depends(get_database)) -> ServiceResponse:
    """
    Endpoint for service providers to create a service.
    """
    services_collection = db["services"]
    service_data = service.dict()

    # Use the provider_id from the service input
    service_data["provider_id"] = service.provider_id  # Assume provider_id is a field in ServiceCreate

    result = await services_collection.insert_one(service_data)
    service_data["_id"] = str(result.inserted_id)
    return ServiceResponse(**service_data)





# Route for customers to view all services
@router.get("/", response_model=List[ServiceResponse])
async def list_services(db = Depends(get_database)) -> List[ServiceResponse]:
    """
    Endpoint for customers to list all available services.
    """
    services_collection = db["services"]
    services = await services_collection.find().to_list(100)
    for service in services:
        service["_id"] = str(service["_id"])
    return [ServiceResponse(**service) for service in services]

# Route for customers to search and filter services
@router.get("/provider/{provider_id}/services", response_model=List[ServiceResponse])
async def get_services_by_provider(provider_id: str, db=Depends(get_database)) -> List[ServiceResponse]:
    """
    Endpoint to fetch the details of the services provided by a service provider using the provider_id.
    """
    services_collection = db["services"]  # Assuming 'services' is the collection name
    services_cursor = services_collection.find({"provider_id": provider_id})

    services = await services_cursor.to_list(length=None)
    if not services:
        raise HTTPException(status_code=404, detail="No services found for the provider")

    # Convert ObjectId to string for each service before returning
    for service in services:
        service["_id"] = str(service["_id"])
    
    return [ServiceResponse(**service) for service in services]


# Route to fetch the details of the service_provider using the service_provider_id

@router.get("/provider/{provider_id}", response_model=UserProfile)
async def get_service_provider(provider_id: str, db=Depends(get_database)) -> UserProfile:
    """
    Endpoint to fetch the details of the service provider using the provider_id.
    """
    users_collection = db["users"]
    service_provider = await users_collection.find_one({"_id": ObjectId(provider_id)})
    if not service_provider:
        raise HTTPException(status_code=404, detail="Service provider not found")
    service_provider["_id"] = str(service_provider["_id"])
    return UserProfile(**service_provider)


# Route to fetch the details of a service by service ID
# @router.get("/service/{service_id}", response_model=ServiceResponse)
# async def get_service_by_id(service_id: str, db=Depends(get_database)) -> ServiceResponse:
#     """
#     Endpoint to fetch the details of a service by service ID.
#     """
#     service = await services_collection.find_one({"_id": ObjectId(service_id)})
#     if not service:
#         raise HTTPException(status_code=404, detail="Service not found")
#     service["_id"] = str(service["_id"])
#     return ServiceResponse(**service)



services_collection = db["services"]


@router.get("/service/{service_id}", response_model=ServiceResponse)
async def get_service_by_id(service_id: str, db=Depends(get_database)) -> ServiceResponse:
    """
    Endpoint to fetch the details of a service by service ID.
    """
    services_collection = db["services"]
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    try:
        service = await services_collection.find_one({"_id": ObjectId(service_id)})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        service["_id"] = str(service["_id"])  # Convert ObjectId to string
        return ServiceResponse(**service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get('/customers/{user_id}', response_model=UserProfile)
async def get_user_by_id(user_id: str, db=Depends(get_database)) -> UserProfile:
    """
    Endpoint to fetch the details of a user by user ID.
    """
    users_collection = db["users"]
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    try:
        user = await users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return UserProfile(**user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))