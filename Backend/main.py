# from fastapi import FastAPI
# from starlette.middleware.cors import CORSMiddleware
# from routes import user_routes, service_routes, appointments_routes




# app = FastAPI()

# # Enable CORS for localhost:3000 (your frontend URL)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow only from your frontend's origin
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
#     allow_headers=["*"],  # Allow all headers
# )

# # Include routes for users, services, and appointments
# app.include_router(user_routes.router, prefix="/users", tags=["Users"])
# app.include_router(service_routes.router, prefix="/services", tags=["Services"])
# app.include_router(appointments_routes.router, prefix="/api", tags=["Appointments"])

# @app.get("/")
# async def root():
#     return {"message": "Welcome to ZETAONE!"}

from typing import List
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, FileResponse
from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from starlette.middleware.cors import CORSMiddleware
from routes import user_routes, service_routes, appointments_routes, map_routes
import json

app = FastAPI()
templates = Jinja2Templates(directory="templates")
clients = []  # Store connected clients

@app.websocket("/ws")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast received message to all connected clients except sender
            for client in clients:
                if client != websocket:
                    await client.send_text(data)
    except WebSocketDisconnect:
        clients.remove(websocket)

# Enable CORS for localhost:3000 (your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only from your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routes for users, services, and appointments
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(service_routes.router, prefix="/services", tags=["Services"])
app.include_router(appointments_routes.router, prefix="/api", tags=["Appointments"])
app.include_router(map_routes.router, prefix="/api", tags=["Map"])

@app.get("/")
async def root():
    return {"message": "Welcome to One Stop Solutions!"}