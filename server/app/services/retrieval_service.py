from typing import List, Dict

from app.services.reranker_service import RerankerService


class RetrievalService:
    """
    Handles semantic retrieval of legal sections using embeddings,
    FAISS search, and CrossEncoder re-ranking.
    """

    def __init__(self, embedder, vector_store, sections):

        self.embedder = embedder
        self.vector_store = vector_store
        self.sections = sections

        # Load reranker once
        self.reranker = RerankerService()

    def retrieve(
        self,
        question: str,
        k: int = 3
    ) -> List[Dict]:

        # Convert question into embedding
        query_embedding = self.embedder.create_embeddings(
            [question]
        )[0]

        # Retrieve more candidates from FAISS
        distances, indices = self.vector_store.search(
            query_embedding,
            10          # retrieve top 10 instead of top 3
        )

        retrieved_sections = []

        for distance, idx in zip(distances, indices):

            if idx == -1:
                continue

            section = self.sections[idx].copy()

            section["score"] = float(distance)

            retrieved_sections.append(section)

        # Re-rank using CrossEncoder
        reranked = self.reranker.rerank(
            question,
            retrieved_sections,
            top_k=k
        )

        return reranked