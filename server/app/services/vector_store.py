import faiss
import numpy as np


class VectorStore:

    def __init__(self, dimension=None, index=None):

        if index is not None:
            self.index = index
        else:
            self.index = faiss.IndexFlatL2(dimension)

    # ------------------------------------

    def add_embeddings(self, embeddings):

        embeddings = np.array(
            embeddings,
            dtype="float32"
        )

        self.index.add(embeddings)

    # ------------------------------------

    def search(self, query_embedding, top_k=5):

        query_embedding = np.array(
            [query_embedding],
            dtype="float32"
        )

        distances, indices = self.index.search(
            query_embedding,
            top_k
        )

        return distances[0], indices[0]