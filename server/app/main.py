
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import initialize_database
from app.routes.chat_routes import router as chat_router
from app.routes.document_routes import router as document_router

app = FastAPI(
    title="NyayaMitra AI",
    description="AI-powered legal assistance",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initialize_database()


@app.get("/")
def home():
    return {
        "message": "Welcome to NyayaMitra AI Backend"
    }


app.include_router(chat_router)
app.include_router(document_router)
