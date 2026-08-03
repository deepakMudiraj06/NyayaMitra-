import hashlib
import json
import os
from datetime import datetime


class DocumentRegistry:
    """
    Manages processed legal documents.

    Responsibilities:
    - Track processed PDFs
    - Detect new/modified PDFs
    - Store document metadata
    """

    def __init__(self):

        self.registry_path = os.path.join(
            "storage",
            "document_registry.json"
        )

        os.makedirs("storage", exist_ok=True)

        if not os.path.exists(self.registry_path):

            with open(
                self.registry_path,
                "w",
                encoding="utf-8"
            ) as f:

                json.dump([], f, indent=4)

    # ----------------------------------

    def load_registry(self):

        with open(
            self.registry_path,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    # ----------------------------------

    def save_registry(self, registry):

        with open(
            self.registry_path,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                registry,
                f,
                indent=4
            )

    # ----------------------------------

    def generate_hash(self, file_path):

        sha256 = hashlib.sha256()

        with open(file_path, "rb") as f:

            while chunk := f.read(8192):

                sha256.update(chunk)

        return sha256.hexdigest()

    # ----------------------------------

    def get_document(self, file_name):

        registry = self.load_registry()

        for doc in registry:

            if doc["file_name"] == file_name:
                return doc

        return None

    # ----------------------------------

    def should_process(self, file_path):

        file_name = os.path.basename(file_path)

        current_hash = self.generate_hash(file_path)

        document = self.get_document(file_name)

        # New PDF
        if document is None:
            return True

        # Existing PDF modified
        if document["file_hash"] != current_hash:
            return True

        # No changes
        return False

    # ----------------------------------

    def update_document(self, file_path):

        registry = self.load_registry()

        file_name = os.path.basename(file_path)

        current_hash = self.generate_hash(file_path)

        last_modified = datetime.fromtimestamp(
            os.path.getmtime(file_path)
        ).isoformat()

        new_entry = {

            "document_id": file_name.replace(".pdf", "").lower(),

            "file_name": file_name,

            "file_hash": current_hash,

            "last_modified": last_modified

        }

        updated = False

        for i, doc in enumerate(registry):

            if doc["file_name"] == file_name:

                registry[i] = new_entry

                updated = True

                break

        if not updated:
            registry.append(new_entry)

        self.save_registry(registry)

    # ----------------------------------

    def remove_document(self, file_name):

        registry = self.load_registry()

        registry = [
            doc
            for doc in registry
            if doc["file_name"] != file_name
        ]

        self.save_registry(registry)