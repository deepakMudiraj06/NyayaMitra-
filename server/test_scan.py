from app.services.indexing_service import IndexingService

index = IndexingService()

pdfs = index.scan_documents()

print(pdfs)