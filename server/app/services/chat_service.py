from app.services.retrieval_service import RetrievalService
from app.services.prompt_service import PromptService
from app.services.llm_service import LLMService
from app.services.embedding_service import EmbeddingService
from app.services.storage_service import StorageService


class ChatService:
    """
    Complete RAG pipeline for NyayaMitra AI.
    """

    def __init__(self):

        print("Loading Knowledge Base...")

        storage = StorageService()

        vector_store, metadata, _ = storage.load_knowledge_base()

        embedder = EmbeddingService()

        self.retriever = RetrievalService(
            embedder=embedder,
            vector_store=vector_store,
            sections=metadata
        )

        self.prompt_builder = PromptService()

        self.llm = LLMService()

        print("NyayaMitra AI Ready!")

    def chat(self, question):

        # Step 1
        retrieved_sections = self.retriever.retrieve(question)

        # Step 2
        prompt = self.prompt_builder.build_prompt(
            question,
            retrieved_sections
        )

        # Step 3
        answer = self.llm.generate(prompt)

        # Step 4
        citations = []

        for section in retrieved_sections:

            citations.append({

                "act": section["act"],

                "section": section["section_number"],

                "title": section["title"],

                "page": section["page"]

            })

        return {

            "question": question,

            "answer": answer,

            "citations": citations

        }