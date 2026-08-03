from app.services.indexing_service import IndexingService

index = IndexingService()

pdf_files = index.scan_documents()

if not pdf_files:
    print("No PDF files found.")
    exit()

sections, embeddings = index.process_document(pdf_files[0])

print("\n--------------------------------")
print(f"Total Sections : {len(sections)}")
print(f"Embedding Shape: {embeddings.shape}")

vector_store = index.build_vector_store(embeddings)

print(f"Vector Count   : {vector_store.index.ntotal}")
print("--------------------------------")