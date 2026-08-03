from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat_routes import router as chat_router

app = FastAPI(
    title="NyayaMitra AI",
    description="AI-powered Indian Legal Assistant",
    version="1.0.0"
)

# Allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # We'll restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to NyayaMitra AI 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }