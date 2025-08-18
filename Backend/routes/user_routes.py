from fastapi import APIRouter, HTTPException, Depends
from models.user_models import UserRegistration, UserLogin, UserProfile, UserInDB, userprof
from core.auth import hash_password

from database import get_database, db
from core.auth import hash_password, verify_password 
router = APIRouter()

# MongoDB client setup


users_collection = db["users"]

# Password hashing setup



@router.post("/register")
async def register_user(user: UserRegistration):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password
    result = await db.users.insert_one(user_data)
    return {"id": str(result.inserted_id), "message": "User registered successfully"}


@router.post("/auth/login/")
async def login_user(user: UserLogin, db = Depends(get_database)):
    users_collection = db["users"]
    
    # Fetch the user from the database
    db_user = await users_collection.find_one({"email": user.email})

    # Verify if user exists and the password matches
    if db_user is None or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Return success response
    return {
        "message": "Login successful",
        "user_id": str(db_user["_id"]),
        "role": db_user.get("role"),
        "email": db_user.get("email"),
        "name": db_user.get("full_name"),
        "location": db_user.get("location"),
        "preferences": db_user.get("preferences")
    }

# @router.get("/profile")
# async def profile(email: str):
#     return await get_user_profile(email)

# @router.put("/profile")
# async def update_profile(email: str, profile: UserProfile):
#     return await update_user_profile(email, profile)

