from app.services.indexing_service import IndexingService

indexer = IndexingService()

vector_store, metadata = indexer.build_index()

print(f"\nIndexed Sections: {len(metadata)}")