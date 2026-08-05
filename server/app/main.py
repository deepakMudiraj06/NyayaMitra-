from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import initialize_database

from app.routes.chat_routes import router as chat_router
from app.routes.document_routes import router as document_router

# ---------------------------------------------------------
# Create FastAPI App
# ---------------------------------------------------------

app = FastAPI(
    title="NyayaMitra AI API",
    description="AI-powered Legal Assistant using RAG and Llama 3.2",
    version="1.0.0",
)

# ---------------------------------------------------------
# Initialize SQLite Database
# ---------------------------------------------------------

initialize_database()

# ---------------------------------------------------------
# CORS Configuration
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React (Vite)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "⚖️ NyayaMitra AI API is running successfully!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# ---------------------------------------------------------
# Register API Routes
# ---------------------------------------------------------

app.include_router(chat_router)
app.include_router(document_router)