from app.services.storage_service import StorageService

storage = StorageService()

vector_store, metadata = storage.load_knowledge_base()

if vector_store is None:
    print("No knowledge base found.")
else:
    print("FAISS vectors:", vector_store.index.ntotal)

print("Metadata entries:", len(metadata))