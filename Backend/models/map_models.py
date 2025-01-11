from pydantic import BaseModel
from typing import Optional

class Location(BaseModel):
    id: Optional[str] = None
    name: str
    service: str
    lat: float
    lng: float