from app.services.indexing_service import IndexingService

def main():
    indexer = IndexingService()

    vector_store, metadata = indexer.build_index()

    print(f"\nIndexed Sections: {len(metadata)}")

if __name__ == "__main__":
    main()