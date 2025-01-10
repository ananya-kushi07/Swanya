from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from bson import ObjectId

class Message(BaseModel):
    text: str
    session_id: str