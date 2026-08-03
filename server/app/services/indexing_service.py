import os
import numpy as np

from app.services.pdf_loader import extract_pdf_text
from app.services.legal_chunker import split_into_sections
from app.services.embedding_service import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.storage_service import StorageService
from app.services.document_registry import DocumentRegistry


class IndexingService:
    """
    Builds and maintains the legal knowledge base.

    Workflow
    --------
    Scan PDFs
            ↓
    Detect New / Modified PDFs
            ↓
    Extract Text
            ↓
    Split into Legal Sections
            ↓
    Generate Embeddings
            ↓
    Build FAISS Index
            ↓
    Save Knowledge Base
    """

    def __init__(self):

        self.documents_folder = "legal_documents"

        self.embedder = EmbeddingService()

        self.storage = StorageService()

        self.registry = DocumentRegistry()

    # ----------------------------------------------------------

    def scan_documents(self):
        """
        Scan the legal_documents folder and
        return all PDF paths.
        """

        pdf_files = []

        if not os.path.exists(self.documents_folder):

            print("Documents folder not found.")

            return pdf_files

        for file in os.listdir(self.documents_folder):

            if file.lower().endswith(".pdf"):

                pdf_files.append(
                    os.path.join(
                        self.documents_folder,
                        file
                    )
                )

        pdf_files.sort()

        return pdf_files

    # ----------------------------------------------------------

    def process_document(self, pdf_path):
        """
        Process one legal PDF.

        Returns
        -------
        sections
        embeddings
        """

        print(f"\nProcessing : {os.path.basename(pdf_path)}")

        text = extract_pdf_text(pdf_path)

        sections = split_into_sections(text)

        print(f"Sections Found : {len(sections)}")

        texts = []

        for section in sections:

            texts.append(
                section["content"]
            )

        embeddings = self.embedder.create_embeddings(
            texts
        )

        embeddings = embeddings.astype(
            "float32"
        )

        print(
            f"Embeddings Generated : {embeddings.shape[0]}"
        )

        return sections, embeddings

    # ----------------------------------------------------------

    def build_vector_store(self, embeddings):
        """
        Build a fresh FAISS vector store
        from all embeddings.
        """

        if len(embeddings) == 0:

            return None

        dimension = embeddings.shape[1]

        vector_store = VectorStore(
            dimension=dimension
        )

        vector_store.add_embeddings(
            embeddings
        )

        print(
            f"Vector Count : {vector_store.index.ntotal}"
        )

        return vector_store

    # ----------------------------------------------------------
    # build_index() continues in Part 2
    # ----------------------------------------------------------
    def build_index(self):
        """
        Build or update the complete legal knowledge base.
        """

        print("\n" + "=" * 60)
        print("Building Legal Knowledge Base")
        print("=" * 60)

        pdf_files = self.scan_documents()

        if len(pdf_files) == 0:
            print("No PDF documents found.")
            return

        # ------------------------------------------
        # Load existing knowledge base
        # ------------------------------------------

        _, existing_metadata, existing_embeddings = \
            self.storage.load_knowledge_base()

        if existing_metadata is None:
            existing_metadata = []

        if existing_embeddings is None:
            existing_embeddings = np.empty(
                (0, 384),
                dtype="float32"
            )

        metadata = list(existing_metadata)

        embeddings = existing_embeddings

        processed_documents = 0
        skipped_documents = 0

        print(f"\nFound {len(pdf_files)} PDF(s).\n")

        # ------------------------------------------
        # Process only new / modified PDFs
        # ------------------------------------------

        for pdf_path in pdf_files:

            file_name = os.path.basename(pdf_path)

            if not self.registry.should_process(pdf_path):

                print(f"Skipping : {file_name}")

                skipped_documents += 1

                continue

            print(f"\nIndexing : {file_name}")

            sections, new_embeddings = self.process_document(
                pdf_path
            )

            metadata.extend(sections)

            if embeddings.shape[0] == 0:

                embeddings = new_embeddings

            else:

                embeddings = np.vstack(
                    (
                        embeddings,
                        new_embeddings
                    )
                ).astype("float32")

            self.registry.update_document(pdf_path)

            processed_documents += 1

            print(
                f"Added {len(sections)} legal sections."
            )

        # ------------------------------------------
        # Nothing new
        # ------------------------------------------

        if processed_documents == 0:

            print("\nKnowledge Base already up to date.")

            return

        # ------------------------------------------
        # Build FAISS
        # ------------------------------------------

        print("\nBuilding FAISS Index...\n")

        vector_store = self.build_vector_store(
            embeddings
        )

        # ------------------------------------------
        # Save Everything
        # ------------------------------------------

        self.storage.save_knowledge_base(
            vector_store,
            metadata,
            embeddings
        )

        # ------------------------------------------
        # Summary
        # ------------------------------------------

        print("\n" + "=" * 60)
        print("Knowledge Base Updated Successfully")
        print("=" * 60)

        print(
            f"Processed Documents : {processed_documents}"
        )

        print(
            f"Skipped Documents   : {skipped_documents}"
        )

        print(
            f"Total Legal Sections: {len(metadata)}"
        )

        print(
            f"Total Embeddings    : {embeddings.shape[0]}"
        )

        print(
            f"FAISS Vector Count  : {vector_store.index.ntotal}"
        )

        print("=" * 60)