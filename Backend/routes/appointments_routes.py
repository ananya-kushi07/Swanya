# # from fastapi import APIRouter, HTTPException, Depends
# # from datetime import datetime
# # from bson import ObjectId
# # from typing import List
# # from database import db, get_database
# # from models.appointment_models  import AppointmentCreate, AppointmentResponse

# # router = APIRouter()

# # # Create an appointment
# # @router.post("/", response_model=AppointmentResponse)
# # async def create_appointment(appointment: AppointmentCreate):
# #     appointment_data = {
# #         "service_id": appointment.service_id,
# #         "customer_id": appointment.customer_id,
# #         "provider_id": appointment.provider_id,
# #         "appointment_time": appointment.appointment_time,
# #         "status": "pending",  # Default status
# #         "notes": appointment.notes,
# #     }
# #     result = await db["appointments"].insert_one(appointment_data)
# #     appointment_data["_id"] = str(result.inserted_id)
# #     return appointment_data

# # # Accept or cancel an appointment
# # @router.patch("/{appointment_id}")
# # async def update_appointment_status(appointment_id: str, status: str):
# #     if status not in ["accepted", "canceled"]:
# #         raise HTTPException(status_code=400, detail="Invalid status")
    
# #     result = await db["appointments"].update_one(
# #         {"_id": ObjectId(appointment_id)},
# #         {"$set": {"status": status}}
# #     )
    
# #     if result.matched_count == 0:
# #         raise HTTPException(status_code=404, detail="Appointment not found")
    
# #     # Notify customer (placeholder for notification logic)
# #     notify_customer(appointment_id, status)

# #     return {"message": f"Appointment {status}"}

# # # Helper function for notifications
# # def notify_customer(appointment_id: str, status: str):
# #     # Placeholder logic for notifications
# #     print(f"Notify customer: Appointment {appointment_id} has been {status}.")






# # @router.patch("/update-status/{service_provider_id}")
# # async def update_status(service_provider_id: str, appointment_id: str, status: str, db = Depends(get_database)):
# #     if status not in ["accepted", "canceled"]:
# #         raise HTTPException(status_code=400, detail="Invalid status")
    
# #     # Fetch the appointment based on service_provider_id and appointment_id
# #     appointment = await db["appointments"].find_one({"service_provider_id": service_provider_id, "_id": ObjectId(appointment_id)})
    
# #     if not appointment:
# #         raise HTTPException(status_code=404, detail="Appointment not found or service provider not authorized")
    
# #     result = await db["appointments"].update_one(
# #         {"service_provider_id": service_provider_id, "_id": ObjectId(appointment_id)},
# #         {"$set": {"status": status}}
# #     )
    
# #     if result.matched_count == 0:
# #         raise HTTPException(status_code=404, detail="Appointment not found")
    
# #     # Notify customer (placeholder for notification logic)
# #     notify_cust(service_provider_id, status)

# #     return {"message": f"Appointment {status}"}

# # def notify_cust(service_provider_id: str, status: str):
# #     # Placeholder logic for notifications
# #     print(f"Notify customer: Service provider {service_provider_id} has updated the appointment status to {status}.")



# # # Route to fetch all appointments received by the service provider using the provider_id
# # @router.get("/provider/{provider_id}/appointments", response_model=List[AppointmentResponse])
# # async def get_appointments_by_provider(provider_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
# #     """
# #     Endpoint to fetch all appointments received by the service provider using the provider_id.
# #     """
# #     appointments = await db["appointments"].find({"provider_id": provider_id}).to_list(100)
# #     for appointment in appointments:
# #         appointment["_id"] = str(appointment["_id"])
# #     return [AppointmentResponse(**appointment) for appointment in appointments]


# # # Route to fetch notifications for a user
# # @router.get("/notifications/{user_id}", response_model=List[dict])
# # async def get_notifications(user_id: str, db=Depends(get_database)) -> List[dict]:
# #     """
# #     Endpoint to fetch notifications for a user.
# #     """
# #     notifications = await db["notifications"].find({"user_id": user_id}).to_list(100)
# #     for notification in notifications:
# #         notification["_id"] = str(notification["_id"])
# #     return notifications



# from fastapi import APIRouter, HTTPException, Depends
# from datetime import datetime
# from bson import ObjectId
# from typing import List
# from database import db, get_database
# from models.appointment_models import AppointmentCreate, AppointmentResponse

# router = APIRouter()

# # Create an appointment
# @router.patch("/booking", response_model=AppointmentResponse)
# async def create_appointment(appointment: AppointmentCreate):
#     appointment_data = {
#         "service_id": appointment.service_id,
#         "customer_id": appointment.customer_id,
#         "provider_id": appointment.provider_id,
#         "appointment_time": appointment.appointment_time,
#         "status": "pending",  # Default status
#         "notes": appointment.notes,
#     }
#     result = await db["appointments"].insert_one(appointment_data)
#     appointment_data["_id"] = str(result.inserted_id)
#     return appointment_data

# # Accept or cancel an appointment
# @router.patch("/{appointment_id}")
# async def update_appointment_status(appointment_id: str, status: str):
#     if status not in ["accepted", "canceled"]:
#         raise HTTPException(status_code=400, detail="Invalid status")
    
#     result = await db["appointments"].update_one(
#         {"_id": ObjectId(appointment_id)},
#         {"$set": {"status": status}}
#     )
    
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     # Notify customer (placeholder for notification logic)
#     await notify_customer(appointment_id, status)

#     return {"message": f"Appointment {status}"}

# # Helper function for notifications
# async def notify_customer(appointment_id: str, status: str):
#     appointment = await db["appointments"].find_one({"_id": ObjectId(appointment_id)})
#     if not appointment:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     service = await db["services"].find_one({"_id": ObjectId(appointment["service_id"])})
#     if not service:
#         raise HTTPException(status_code=404, detail="Service not found")
    
#     user = await db["users"].find_one({"_id": ObjectId(service["provider_id"])})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     notification = {
#         "user_id": appointment["customer_id"],
#         "message": f"Service provider {user['full_name']} has updated the appointment status to {status}.",
#         "timestamp": datetime.utcnow()
#     }
#     await db["notifications"].insert_one(notification)

# @router.patch("/update-status/{service_provider_id}")
# async def update_status(service_provider_id: str, appointment_id: str, status: str, db=Depends(get_database)):
#     if status not in ["accepted", "canceled"]:
#         raise HTTPException(status_code=400, detail="Invalid status")
    
#     # Fetch the appointment based on service_provider_id and appointment_id
#     appointment = await db["appointments"].find_one({"provider_id": service_provider_id, "_id": ObjectId(appointment_id)})
    
#     if not appointment:
#         raise HTTPException(status_code=404, detail="Appointment not found or service provider not authorized")
    
#     result = await db["appointments"].update_one(
#         {"provider_id": service_provider_id, "_id": ObjectId(appointment_id)},
#         {"$set": {"status": status}}
#     )
    
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     # Notify customer (placeholder for notification logic)
#     await notify_customer(appointment_id, status)

#     return {"message": f"Appointment {status}"}

# # Route to fetch all appointments received by the service provider using the provider_id
# @router.get("/provider/{provider_id}/appointments", response_model=List[AppointmentResponse])
# async def get_appointments_by_provider(provider_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
#     """
#     Endpoint to fetch all appointments received by the service provider using the provider_id.
#     """
#     appointments = await db["appointments"].find({"provider_id": provider_id}).to_list(100)
#     for appointment in appointments:
#         appointment["_id"] = str(appointment["_id"])
#     return [AppointmentResponse(**appointment) for appointment in appointments]

# # Route to fetch notifications for a user
# # @router.get("/notifications/{user_id}", response_model=List[dict])
# # async def get_notifications(user_id: str, db=Depends(get_database)) -> List[dict]:
# #     """
# #     Endpoint to fetch notifications for a user.
# #     """
# #     notifications = await db["notifications"].find({"user_id": user_id}).to_list(100)
# #     for notification in notifications:
# #         notification["_id"] = str(notification["_id"])
# #     return notifications




# # Route to fetch all appointments made by a user using the user_id
# @router.get("/user/{user_id}/appointments", response_model=List[AppointmentResponse])
# async def get_appointments_by_user(user_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
#     """
#     Endpoint to fetch all appointments made by a user using the user_id.
#     """
#     appointments = await db["appointments"].find({"customer_id": user_id}).to_list(100)
#     for appointment in appointments:
#         appointment["_id"] = str(appointment["_id"])
#     return [AppointmentResponse(**appointment) for appointment in appointments]


# from fastapi import APIRouter, HTTPException, Depends
# from datetime import datetime
# from bson import ObjectId
# from typing import List
# from database import db, get_database
# from models.appointment_models  import AppointmentCreate, AppointmentResponse

# router = APIRouter()

# # Create an appointment
# @router.post("/", response_model=AppointmentResponse)
# async def create_appointment(appointment: AppointmentCreate):
#     appointment_data = {
#         "service_id": appointment.service_id,
#         "customer_id": appointment.customer_id,
#         "provider_id": appointment.provider_id,
#         "appointment_time": appointment.appointment_time,
#         "status": "pending",  # Default status
#         "notes": appointment.notes,
#     }
#     result = await db["appointments"].insert_one(appointment_data)
#     appointment_data["_id"] = str(result.inserted_id)
#     return appointment_data

# # Accept or cancel an appointment
# @router.patch("/{appointment_id}")
# async def update_appointment_status(appointment_id: str, status: str):
#     if status not in ["accepted", "canceled"]:
#         raise HTTPException(status_code=400, detail="Invalid status")
    
#     result = await db["appointments"].update_one(
#         {"_id": ObjectId(appointment_id)},
#         {"$set": {"status": status}}
#     )
    
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     # Notify customer (placeholder for notification logic)
#     notify_customer(appointment_id, status)

#     return {"message": f"Appointment {status}"}

# # Helper function for notifications
# def notify_customer(appointment_id: str, status: str):
#     # Placeholder logic for notifications
#     print(f"Notify customer: Appointment {appointment_id} has been {status}.")






# @router.patch("/update-status/{service_provider_id}")
# async def update_status(service_provider_id: str, appointment_id: str, status: str, db = Depends(get_database)):
#     if status not in ["accepted", "canceled"]:
#         raise HTTPException(status_code=400, detail="Invalid status")
    
#     # Fetch the appointment based on service_provider_id and appointment_id
#     appointment = await db["appointments"].find_one({"service_provider_id": service_provider_id, "_id": ObjectId(appointment_id)})
    
#     if not appointment:
#         raise HTTPException(status_code=404, detail="Appointment not found or service provider not authorized")
    
#     result = await db["appointments"].update_one(
#         {"service_provider_id": service_provider_id, "_id": ObjectId(appointment_id)},
#         {"$set": {"status": status}}
#     )
    
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     # Notify customer (placeholder for notification logic)
#     notify_cust(service_provider_id, status)

#     return {"message": f"Appointment {status}"}

# def notify_cust(service_provider_id: str, status: str):
#     # Placeholder logic for notifications
#     print(f"Notify customer: Service provider {service_provider_id} has updated the appointment status to {status}.")



# # Route to fetch all appointments received by the service provider using the provider_id
# @router.get("/provider/{provider_id}/appointments", response_model=List[AppointmentResponse])
# async def get_appointments_by_provider(provider_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
#     """
#     Endpoint to fetch all appointments received by the service provider using the provider_id.
#     """
#     appointments = await db["appointments"].find({"provider_id": provider_id}).to_list(100)
#     for appointment in appointments:
#         appointment["_id"] = str(appointment["_id"])
#     return [AppointmentResponse(**appointment) for appointment in appointments]


# # Route to fetch notifications for a user
# @router.get("/notifications/{user_id}", response_model=List[dict])
# async def get_notifications(user_id: str, db=Depends(get_database)) -> List[dict]:
#     """
#     Endpoint to fetch notifications for a user.
#     """
#     notifications = await db["notifications"].find({"user_id": user_id}).to_list(100)
#     for notification in notifications:
#         notification["_id"] = str(notification["_id"])
#     return notifications



from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from bson import ObjectId
from typing import List
from database import db, get_database
from models.appointment_models import AppointmentCreate, AppointmentResponse

router = APIRouter()

# Create an appointment
@router.patch("/booking", response_model=AppointmentResponse)
async def create_appointment(appointment: AppointmentCreate):
    appointment_data = {
        "service_id": appointment.service_id,
        "customer_id": appointment.customer_id,
        "provider_id": appointment.provider_id,
        "appointment_time": appointment.appointment_time,
        "status": "pending",  # Default status
        "notes": appointment.notes,
    }
    result = await db["appointments"].insert_one(appointment_data)
    appointment_data["_id"] = str(result.inserted_id)
    return appointment_data

# Accept or cancel an appointment
@router.patch("/{appointment_id}")
async def update_appointment_status(appointment_id: str, status: str):
    if status not in ["accepted", "canceled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db["appointments"].update_one(
        {"_id": ObjectId(appointment_id)},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Notify customer (placeholder for notification logic)
    await notify_customer(appointment_id, status)

    return {"message": f"Appointment {status}"}

# Helper function for notifications
async def notify_customer(appointment_id: str, status: str):
    appointment = await db["appointments"].find_one({"_id": ObjectId(appointment_id)})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    service = await db["services"].find_one({"_id": ObjectId(appointment["service_id"])})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    user = await db["users"].find_one({"_id": ObjectId(service["provider_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    notification = {
        "user_id": appointment["customer_id"],
        "message": f"Service provider {user['full_name']} has updated the appointment status to {status}.",
        "timestamp": datetime.utcnow()
    }
    await db["notifications"].insert_one(notification)

@router.patch("/update-status/{service_provider_id}")
async def update_status(service_provider_id: str, appointment_id: str, status: str, db=Depends(get_database)):
    if status not in ["accepted", "canceled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    # Fetch the appointment based on service_provider_id and appointment_id
    appointment = await db["appointments"].find_one({"provider_id": service_provider_id, "_id": ObjectId(appointment_id)})
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found or service provider not authorized")
    
    result = await db["appointments"].update_one(
        {"provider_id": service_provider_id, "_id": ObjectId(appointment_id)},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Notify customer (placeholder for notification logic)
    await notify_customer(appointment_id, status)

    return {"message": f"Appointment {status}"}

# Route to fetch all appointments received by the service provider using the provider_id
@router.get("/provider/{provider_id}/appointments", response_model=List[AppointmentResponse])
async def get_appointments_by_provider(provider_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
    """
    Endpoint to fetch all appointments received by the service provider using the provider_id.
    """
    appointments = await db["appointments"].find({"provider_id": provider_id}).to_list(100)
    for appointment in appointments:
        appointment["_id"] = str(appointment["_id"])
    return [AppointmentResponse(**appointment) for appointment in appointments]

# Route to fetch notifications for a user
# @router.get("/notifications/{user_id}", response_model=List[dict])
# async def get_notifications(user_id: str, db=Depends(get_database)) -> List[dict]:
#     """
#     Endpoint to fetch notifications for a user.
#     """
#     notifications = await db["notifications"].find({"user_id": user_id}).to_list(100)
#     for notification in notifications:
#         notification["_id"] = str(notification["_id"])
#     return notifications




# Route to fetch all appointments made by a user using the user_id
@router.get("/user/{user_id}/appointments", response_model=List[AppointmentResponse])
async def get_appointments_by_user(user_id: str, db=Depends(get_database)) -> List[AppointmentResponse]:
    """
    Endpoint to fetch all appointments made by a user using the user_id.
    """
    appointments = await db["appointments"].find({"customer_id": user_id}).to_list(100)
    for appointment in appointments:
        appointment["_id"] = str(appointment["_id"])
    return [AppointmentResponse(**appointment) for appointment in appointments]