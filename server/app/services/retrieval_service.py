from typing import List, Dict


class RetrievalService:
    """
    Handles semantic retrieval of legal sections using embeddings and FAISS.
    """

    def __init__(self, embedder, vector_store, sections):
        """
        Parameters:
            embedder      : EmbeddingService object
            vector_store  : VectorStore object (FAISS)
            sections      : List of section dictionaries
        """
        self.embedder = embedder
        self.vector_store = vector_store
        self.sections = sections

    def retrieve(self, question: str, k: int = 3) -> List[Dict]:
        """
        Retrieve the top-k most relevant legal sections.

        Parameters:
            question : User's legal question
            k        : Number of results to return

        Returns:
            List of dictionaries containing:
                - act
                - section_number
                - title
                - page
                - content
                - score
        """

        # Convert question into embedding
        query_embedding = self.embedder.create_embeddings([question])[0]

        # Search FAISS
        distances, indices = self.vector_store.search(query_embedding, k)

        results = []

        # Combine metadata with similarity score
        for distance, idx in zip(distances, indices):

            # Ignore invalid indices
            if idx == -1:
                continue

            section = self.sections[idx].copy()

            section["score"] = float(distance)

            results.append(section)

        return results