import os
import json

import faiss
import numpy as np

from app.services.vector_store import VectorStore


class StorageService:

    def __init__(self):

        self.storage_folder = "storage"

        os.makedirs(
            self.storage_folder,
            exist_ok=True
        )

        self.index_path = os.path.join(
            self.storage_folder,
            "index.faiss"
        )

        self.metadata_path = os.path.join(
            self.storage_folder,
            "metadata.json"
        )

        self.embeddings_path = os.path.join(
            self.storage_folder,
            "embeddings.npy"
        )

    # ------------------------------------
    # FAISS
    # ------------------------------------

    def save_index(self, index):

        faiss.write_index(
            index,
            self.index_path
        )

        print("✅ FAISS index saved.")

    def load_index(self):

        if not os.path.exists(self.index_path):
            return None

        return faiss.read_index(
            self.index_path
        )

    # ------------------------------------
    # Metadata
    # ------------------------------------

    def save_metadata(self, metadata):

        with open(
            self.metadata_path,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                metadata,
                f,
                indent=4,
                ensure_ascii=False
            )

        print("✅ Metadata saved.")

    def load_metadata(self):

        if not os.path.exists(self.metadata_path):
            return []

        with open(
            self.metadata_path,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    # ------------------------------------
    # Embeddings
    # ------------------------------------

    def save_embeddings(self, embeddings):

        np.save(
            self.embeddings_path,
            embeddings
        )

        print("✅ Embeddings saved.")

    def load_embeddings(self):

        if not os.path.exists(self.embeddings_path):
            return None

        return np.load(
            self.embeddings_path
        )

    # ------------------------------------
    # Complete Knowledge Base
    # ------------------------------------

    def load_knowledge_base(self):

        faiss_index = self.load_index()

        metadata = self.load_metadata()

        embeddings = self.load_embeddings()

        if faiss_index is None:

            return None, metadata, embeddings

        vector_store = VectorStore(
            index=faiss_index
        )

        return vector_store, metadata, embeddings

    def save_knowledge_base(
        self,
        vector_store,
        metadata,
        embeddings
    ):

        self.save_index(
            vector_store.index
        )

        self.save_metadata(
            metadata
        )

        self.save_embeddings(
            embeddings
        )