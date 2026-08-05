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

        if not retrieved_sections:
            return []

        # Build question-content pairs
        pairs = [
            (question, section["content"])
            for section in retrieved_sections
        ]

        # Predict relevance scores
        scores = self.model.predict(pairs)

        # Attach scores
        for section, score in zip(retrieved_sections, scores):
            section["rerank_score"] = float(score)

        # Sort by score (highest first)
        retrieved_sections.sort(
            key=lambda x: x["rerank_score"],
            reverse=True
        )

        # ---------------------------------------------------
        # Keep only results close to the best score
        # ---------------------------------------------------

        top_score = retrieved_sections[0]["rerank_score"]

        filtered = []

        for section in retrieved_sections:

            # Keep sections that are within 85% of the best score
            if section["rerank_score"] >= top_score * 0.85:
                filtered.append(section)

        # If filtering removes everything, return the original ranking
        if not filtered:
            filtered = retrieved_sections

        return filtered[:top_k]