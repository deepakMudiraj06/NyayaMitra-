
from app.services.retrieval_service import RetrievalService
from app.services.prompt_service import PromptService
from app.services.llm_service import LLMService
from app.services.embedding_service import EmbeddingService
from app.services.storage_service import StorageService
from app.models.chat_models import LanguageCode

from app.database.conversation_repository import ConversationRepository


class ChatService:
    """
    RAG pipeline for NyayaMitra AI with persistent
    SQLite conversations and citation-backed responses.
    """

    def __init__(self):
        print("Loading Knowledge Base...")

        storage = StorageService()

        # StorageService.load_knowledge_base() returns
        # exactly two values: vector_store and metadata.
        vector_store, metadata = storage.load_knowledge_base()

        if vector_store is None:
            raise RuntimeError(
                "FAISS index not found. Build the knowledge base "
                "before starting NyayaMitra. Check storage/index.faiss."
            )

        if not metadata:
            raise RuntimeError(
                "Knowledge-base metadata is empty. Check "
                "storage/metadata.json and rebuild the index if needed."
            )

        embedder = EmbeddingService()

        self.retriever = RetrievalService(
            embedder=embedder,
            vector_store=vector_store,
            sections=metadata,
        )

        self.prompt_builder = PromptService()
        self.llm = LLMService()
        self.repository = ConversationRepository()

        print("NyayaMitra AI Ready!")

    # -----------------------------------------------------
    # Chat
    # -----------------------------------------------------

    def chat(
        self,
        conversation_id: str,
        question: str,
        language: LanguageCode = "en-IN",
    ):
        question = question.strip()

        if not conversation_id or not conversation_id.strip():
            raise ValueError("conversation_id cannot be empty.")

        if not question:
            raise ValueError("Question cannot be empty.")

        title = question[:60]

        # Create or retrieve the conversation.
        self.repository.create_conversation(
            conversation_id=conversation_id,
            title=title,
        )

        # Save the user's message.
        self.repository.save_message(
            conversation_id=conversation_id,
            role="user",
            content=question,
        )

        # Load conversation history.
        history = self.repository.get_messages(
            conversation_id=conversation_id,
        )

        # Retrieve relevant legal sections.
        retrieved_sections = self.retriever.retrieve(
            question=question,
        )

        # Build the prompt using retrieved context and history.
        prompt = self.prompt_builder.build_prompt(
            question=question,
            retrieved_sections=retrieved_sections,
            history=history,
            language=language,
        )

        # Generate the response using the configured LLM.
        answer = self.llm.generate(prompt)

        # Save the assistant's response.
        self.repository.save_message(
            conversation_id=conversation_id,
            role="assistant",
            content=answer,
        )

        # Build citations from retrieved sections.
        citations = []

        for section in retrieved_sections:
            citations.append(
                {
                    "act": section.get("act"),
                    "section": section.get("section_number"),
                    "title": section.get("title"),
                    "page": section.get("page"),
                    "content": section.get("content"),
                }
            )

        return {
            "conversation_id": conversation_id,
            "question": question,
            "answer": answer,
            "citations": citations,
        }

    # -----------------------------------------------------
    # Reset Conversation
    # -----------------------------------------------------

    def reset_conversation(self, conversation_id: str):
        self.repository.clear_conversation(conversation_id)

        return {
            "message": "Conversation cleared.",
            "conversation_id": conversation_id,
        }

    # -----------------------------------------------------
    # Delete Conversation
    # -----------------------------------------------------

    def delete_conversation(self, conversation_id: str):
        self.repository.delete_conversation(conversation_id)

        return {
            "message": "Conversation deleted.",
            "conversation_id": conversation_id,
        }

    # -----------------------------------------------------
    # List Conversations
    # -----------------------------------------------------

    def list_conversations(self):
        return self.repository.list_conversations()
