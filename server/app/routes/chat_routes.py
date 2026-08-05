from fastapi import APIRouter
from pydantic import BaseModel

from app.models.chat_models import (
    ChatRequest,
    ChatResponse,
)

from app.services.chat_service import ChatService


router = APIRouter()

# ---------------------------------------------------------
# Load Chat Service
# ---------------------------------------------------------

chatbot = ChatService()

# ---------------------------------------------------------
# Request Models
# ---------------------------------------------------------

class ResetConversationRequest(BaseModel):
    conversation_id: str


# ---------------------------------------------------------
# Chat
# ---------------------------------------------------------

@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    return chatbot.chat(
        conversation_id=request.conversation_id,
        question=request.question
    )


# ---------------------------------------------------------
# Reset Conversation
# ---------------------------------------------------------

@router.post("/chat/reset")
def reset_chat(request: ResetConversationRequest):

    chatbot.reset_conversation(
        request.conversation_id
    )

    return {

        "message": "Conversation cleared.",

        "conversation_id": request.conversation_id

    }


# ---------------------------------------------------------
# List Conversations
# ---------------------------------------------------------

@router.get("/chat/conversations")
def list_conversations():

    return {

        "conversations": chatbot.list_conversations()

    }


# ---------------------------------------------------------
# Delete Conversation
# ---------------------------------------------------------

@router.delete("/chat/{conversation_id}")
def delete_conversation(
    conversation_id: str
):

    chatbot.delete_conversation(
        conversation_id
    )

    return {

        "message": "Conversation deleted.",

        "conversation_id": conversation_id

    }