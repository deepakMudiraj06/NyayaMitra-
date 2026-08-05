from typing import Optional
from pydantic import BaseModel


class ChatRequest(BaseModel):
    conversation_id: str
    question: str


class Citation(BaseModel):
    act: str
    section: str
    title: str
    page: Optional[int] = None

    # NEW
    content: str


class ChatResponse(BaseModel):
    conversation_id: str
    question: str
    answer: str
    citations: list[Citation]