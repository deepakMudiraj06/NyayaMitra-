from app.services.embedding_service import EmbeddingService
from app.services.storage_service import StorageService
from app.services.retrieval_service import RetrievalService

# Load saved knowledge base
storage = StorageService()
vector_store, metadata = storage.load_knowledge_base()

# Create embedder
embedder = EmbeddingService()

# Create retrieval service
retriever = RetrievalService(
    embedder=embedder,
    vector_store=vector_store,
    sections=metadata
)

# Ask a question
question = "What is rash driving?"

results = retriever.retrieve(question)

print("\nTop Results:\n")

for i, result in enumerate(results, start=1):
    print(f"Result {i}")
    print(f"Act: {result.get('act')}")
    print(f"Section: {result.get('section_number')}")
    print(f"Title: {result.get('title')}")
    print(f"Score: {result.get('score')}")
    print(f"Content: {result.get('content')[:300]}...")
    print("-" * 80)
