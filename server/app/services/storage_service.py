import os
import json
import faiss

from app.services.vector_store import VectorStore


class StorageService:

    def __init__(self):

        self.storage_folder = "storage"

        self.index_path = os.path.join(
            self.storage_folder,
            "index.faiss"
        )

        self.metadata_path = os.path.join(
            self.storage_folder,
            "metadata.json"
        )

        os.makedirs(
            self.storage_folder,
            exist_ok=True
        )

    # ------------------------------------

    def save_index(self, index):

        faiss.write_index(
            index,
            self.index_path
        )

        print("✅ FAISS index saved.")

    # ------------------------------------

    def load_index(self):

        if not os.path.exists(self.index_path):
            return None

        return faiss.read_index(
            self.index_path
        )

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

    # ------------------------------------

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
    # High-Level Knowledge Base Operations
    # ------------------------------------

    def load_knowledge_base(self):

        faiss_index = self.load_index()

        metadata = self.load_metadata()

        if faiss_index is None:
            return None, metadata

        vector_store = VectorStore(
            index=faiss_index
        )

        return vector_store, metadata

    # ------------------------------------

    def save_knowledge_base(
        self,
        vector_store,
        metadata
    ):

        self.save_index(
            vector_store.index
        )

        self.save_metadata(
            metadata
        )