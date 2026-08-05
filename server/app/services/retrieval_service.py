from typing import List, Dict

from app.services.reranker_service import RerankerService


class RetrievalService:
    """
    Handles semantic retrieval of legal sections using
    SentenceTransformer embeddings + FAISS + CrossEncoder reranking.
    """

    def __init__(self, embedder, vector_store, sections):
        self.embedder = embedder
        self.vector_store = vector_store
        self.sections = sections

        # Load CrossEncoder once
        self.reranker = RerankerService()

    def retrieve(
        self,
        question: str,
        k: int = 3
    ) -> List[Dict]:

        # ------------------------------------------
        # Create embedding for the user question
        # ------------------------------------------
        query_embedding = self.embedder.create_embeddings(
            [question]
        )[0]

        # ------------------------------------------
        # Retrieve Top-10 candidates from FAISS
        # ------------------------------------------
        distances, indices = self.vector_store.search(
            query_embedding,
            10
        )

        retrieved_sections = []

        for distance, idx in zip(distances, indices):

            if idx == -1:
                continue

            section = self.sections[idx].copy()

            # Store FAISS similarity score
            section["score"] = float(distance)

            retrieved_sections.append(section)

        # Nothing retrieved
        if not retrieved_sections:
            return []

        # ------------------------------------------
        # CrossEncoder Re-ranking
        # ------------------------------------------
        reranked = self.reranker.rerank(
            question,
            retrieved_sections,
            top_k=k
        )

        return reranked