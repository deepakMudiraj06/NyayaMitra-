from fastapi import APIRouter

from app.models.chat_models import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()

# Load chatbot once when the server starts
chatbot = ChatService()


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    response = chatbot.chat(request.question)

    return response