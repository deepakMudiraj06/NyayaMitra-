from app.services.retrieval_service import RetrievalService
from app.services.prompt_service import PromptService
from app.services.llm_service import LLMService
from app.services.embedding_service import EmbeddingService
from app.services.storage_service import StorageService

from app.database.conversation_repository import ConversationRepository


class ChatService:
    """
    Complete RAG pipeline for NyayaMitra AI
    with persistent SQLite conversations.
    """

    def __init__(self):

        print("Loading Knowledge Base...")

        storage = StorageService()

        vector_store, metadata, _ = (
            storage.load_knowledge_base()
        )

        embedder = EmbeddingService()

        self.retriever = RetrievalService(
            embedder=embedder,
            vector_store=vector_store,
            sections=metadata
        )

        self.prompt_builder = PromptService()

        self.llm = LLMService()

        # SQLite Repository
        self.repository = ConversationRepository()

        print("NyayaMitra AI Ready!")

    # =====================================================
    # Chat
    # =====================================================

    def chat(
        self,
        conversation_id: str,
        question: str
    ):

        # ---------------------------------------------
        # Create conversation (only once)
        # ---------------------------------------------

        title = question.strip()[:60]

        self.repository.create_conversation(
            conversation_id=conversation_id,
            title=title
        )

        # ---------------------------------------------
        # Save user message
        # ---------------------------------------------

        self.repository.save_message(
            conversation_id=conversation_id,
            role="user",
            content=question
        )

        # ---------------------------------------------
        # Load conversation history
        # ---------------------------------------------

        history = self.repository.get_messages(
            conversation_id=conversation_id
        )

        # ---------------------------------------------
        # Retrieve relevant legal sections
        # ---------------------------------------------

        retrieved_sections = self.retriever.retrieve(
            question=question
        )

        # ---------------------------------------------
        # Build prompt
        # ---------------------------------------------

        prompt = self.prompt_builder.build_prompt(
            question=question,
            retrieved_sections=retrieved_sections,
            history=history
        )

        # ---------------------------------------------
        # Generate answer
        # ---------------------------------------------

        answer = self.llm.generate(prompt)

        # ---------------------------------------------
        # Save assistant response
        # ---------------------------------------------

        self.repository.save_message(
            conversation_id=conversation_id,
            role="assistant",
            content=answer
        )

        # ---------------------------------------------
        # Build citations
        # ---------------------------------------------

        citations = []

        for section in retrieved_sections:

            citations.append({

                "act": section["act"],

                "section": section["section_number"],

                "title": section["title"],

                "page": section.get("page"),

                "content": section["content"]

            })

        # ---------------------------------------------
        # Response
        # ---------------------------------------------

        return {

            "conversation_id": conversation_id,

            "question": question,

            "answer": answer,

            "citations": citations

        }

    # =====================================================
    # Reset Conversation
    # =====================================================

    def reset_conversation(
        self,
        conversation_id: str
    ):

        self.repository.clear_conversation(
            conversation_id
        )

    # =====================================================
    # Delete Conversation
    # =====================================================

    def delete_conversation(
        self,
        conversation_id: str
    ):

        self.repository.delete_conversation(
            conversation_id
        )

    # =====================================================
    # List Conversations
    # =====================================================

    def list_conversations(self):

        return self.repository.list_conversations()