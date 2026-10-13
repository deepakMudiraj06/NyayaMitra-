from typing import Literal, Optional
from pydantic import BaseModel

LanguageCode = Literal[
    "en-IN",
    "te-IN",
    "hi-IN",
    "kn-IN",
    "ta-IN",
]


class ChatRequest(BaseModel):
    conversation_id: str
    question: str
    language: LanguageCode = "en-IN"


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
