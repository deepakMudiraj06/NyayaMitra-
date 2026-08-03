from app.services.pdf_loader import extract_pdf_text
from app.services.legal_chunker import split_into_sections
from app.services.embedding_service import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.retrieval_service import RetrievalService


def main():
    pdf_path = "legal_documents/motor_vehicle_act.pdf"

    # Extract text
    text = extract_pdf_text(pdf_path)

    # Split into sections
    sections = split_into_sections(text)

    # Extract content for embeddings
    texts = [section["content"] for section in sections]

    # Load embedding model
    embedder = EmbeddingService()

    # Create embeddings
    embeddings = embedder.create_embeddings(texts)

    # Create FAISS index
    vector_store = VectorStore(embeddings.shape[1])

    # Add embeddings
    vector_store.add_embeddings(embeddings)

    print("✅ FAISS Index Created Successfully!")

    retriever = RetrievalService(
        embedder,
        vector_store,
        sections
    )

    while True:
        question = input("\nAsk a legal question (or type 'exit'): ")

        if question.lower() == "exit":
            print("Goodbye!")
            break

        results = retriever.retrieve(question)

        print("\nTop Results:\n")

        for result in results:
            print("=" * 70)
            print(f"Act      : {result['act']}")
            print(f"Section  : {result['section_number']}")
            print(f"Title    : {result['title']}")
            print(f"Page     : {result['page']}")
            print("-" * 70)
            print(result["content"][:1000])
            print()


if __name__ == "__main__":
    main()