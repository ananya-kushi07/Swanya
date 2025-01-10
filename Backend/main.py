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
from routes import user_routes, service_routes, appointments_routes

app = FastAPI()
templates = Jinja2Templates(directory="templates")

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
        
    async def broadcast(self, message: str, websocket: WebSocket):
        for connection in self.active_connections:
            if connection == websocket:
                continue
            await connection.send_text(message)

connectionmanager = ConnectionManager()

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    return FileResponse('frontend/public/index.html')

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await connectionmanager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await connectionmanager.send_personal_message(f"You: {data}", websocket)
            await connectionmanager.broadcast(f"Client #{client_id}: {data}", websocket)
    except WebSocketDisconnect:
        connectionmanager.disconnect(websocket)
        await connectionmanager.broadcast(f"Client #{client_id} left the chat", websocket)

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

@app.get("/")
async def root():
    return {"message": "Welcome to ZETAONE!"}