from app.services.storage_service import StorageService

storage = StorageService()

sections = storage.load_metadata()

print("Total Sections:", len(sections))

seen = {}

for section in sections:

    key = (
        section["act"],
        section["section_number"]
    )

    seen[key] = seen.get(key, 0) + 1

print("\nDuplicate Sections\n")

for key, count in seen.items():

    if count > 1:
        print(key, count)