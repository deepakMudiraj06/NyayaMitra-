from typing import Optional
from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class Citation(BaseModel):
    act: str
    section: str
    title: str
    page: Optional[int] = None


class ChatResponse(BaseModel):
    question: str
    answer: str
    citations: list[Citation]