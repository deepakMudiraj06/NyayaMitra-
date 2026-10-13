
import os
import numpy as np

from app.services.pdf_loader import extract_pdf_text
from app.services.legal_chunker import split_into_sections
from app.services.embedding_service import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.storage_service import StorageService
from app.services.document_registry import DocumentRegistry


class IndexingService:
    """Build the legal document FAISS knowledge base."""

    def __init__(self):
        self.documents_folder = "legal_documents"
        self.embedder = EmbeddingService()
        self.storage = StorageService()
        self.registry = DocumentRegistry()

    def scan_documents(self):
        """Return the paths of all legal PDF files."""
        if not os.path.isdir(self.documents_folder):
            os.makedirs(self.documents_folder, exist_ok=True)

        return sorted(
            os.path.join(self.documents_folder, filename)
            for filename in os.listdir(self.documents_folder)
            if filename.lower().endswith(".pdf")
        )

    def process_document(self, pdf_path):
        """Extract text, split it into sections, and embed them."""
        print(f"Processing: {os.path.basename(pdf_path)}")

        text = extract_pdf_text(pdf_path)
        sections = split_into_sections(text)

        if not sections:
            print(f"Warning: No legal sections found in {pdf_path}")
            return [], np.empty((0, 0), dtype="float32")

        texts = [section["content"] for section in sections]

        embeddings = np.asarray(
            self.embedder.create_embeddings(texts),
            dtype="float32"
        )

        if embeddings.ndim != 2 or embeddings.shape[0] != len(sections):
            raise ValueError(
                f"Embedding count does not match sections in {pdf_path}"
            )

        return sections, embeddings

    def build_index(self):
        """
        Rebuild the knowledge base from all PDFs.
        This avoids retaining stale sections after a document is deleted
        or modified.
        """
        print("\n" + "=" * 50)
        print("Building Legal Knowledge Base")
        print("=" * 50)

        pdf_files = self.scan_documents()

        if not pdf_files:
            print("No PDF documents found. Nothing to index.")
            return

        all_sections = []
        all_embeddings = []

        for pdf_path in pdf_files:
            sections, embeddings = self.process_document(pdf_path)

            if not sections:
                continue

            all_sections.extend(sections)
            all_embeddings.append(embeddings)

            self.registry.update_document(pdf_path)

            print(f"Indexed {len(sections)} sections.")

        if not all_sections:
            raise ValueError(
                "No indexable legal sections were found. "
                "The existing knowledge base was not replaced."
            )

        embeddings = np.vstack(all_embeddings).astype("float32")

        if len(all_sections) != embeddings.shape[0]:
            raise ValueError(
                "Section count and embedding count do not match."
            )

        vector_store = VectorStore(
            dimension=embeddings.shape[1]
        )
        vector_store.add_embeddings(embeddings)

        # Your current StorageService accepts exactly two arguments.
        self.storage.save_knowledge_base(
            vector_store,
            all_sections
        )

        print("\nKnowledge Base Updated Successfully!")
        print(f"PDF files scanned: {len(pdf_files)}")
        print(f"Legal sections indexed: {len(all_sections)}")
        print(f"Embeddings stored: {embeddings.shape[0]}")
