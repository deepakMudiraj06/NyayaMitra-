from sentence_transformers import CrossEncoder


class RerankerService:
    """
    Re-ranks FAISS retrieval results using a CrossEncoder.
    """

    def __init__(self):
        print("Loading reranker model...")

        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

        print("Reranker loaded successfully!")

    def rerank(self, question, retrieved_sections, top_k=3):
        """
        Re-rank retrieved sections based on semantic relevance.
        """

        pairs = [
            (question, section["content"])
            for section in retrieved_sections
        ]

        scores = self.model.predict(pairs)

        for section, score in zip(retrieved_sections, scores):
            section["rerank_score"] = float(score)

        retrieved_sections.sort(
            key=lambda x: x["rerank_score"],
            reverse=True
        )

        return retrieved_sections[:top_k]