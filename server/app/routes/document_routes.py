from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.services.indexing_service import IndexingService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

# -------------------------------------------------------
# Document Folder
# -------------------------------------------------------

DOCUMENT_FOLDER = Path("legal_documents")
DOCUMENT_FOLDER.mkdir(exist_ok=True)

# -------------------------------------------------------
# Indexing Service
# -------------------------------------------------------

indexer = IndexingService()

# -------------------------------------------------------
# Upload PDF
# -------------------------------------------------------

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):
    """
    Upload a legal PDF and rebuild
    the FAISS knowledge base.
    """

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    destination = DOCUMENT_FOLDER / file.filename

    with open(destination, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    print(f"\nUploaded: {file.filename}")

    # Rebuild FAISS Index
    indexer.build_index()

    return {
        "status": "success",
        "document": file.filename,
        "message": "Document indexed successfully."
    }

# -------------------------------------------------------
# List Documents
# -------------------------------------------------------

@router.get("")
def list_documents():
    """
    Returns all uploaded PDFs.
    """

    documents = []

    for file in DOCUMENT_FOLDER.glob("*.pdf"):

        documents.append({

            "name": file.name,

            "size": round(
                file.stat().st_size / (1024 * 1024),
                2
            )

        })

    documents.sort(
        key=lambda document: document["name"]
    )

    return {
        "documents": documents
    }

# -------------------------------------------------------
# Delete Document
# -------------------------------------------------------

@router.delete("/{filename}")
def delete_document(
    filename: str
):
    """
    Delete a PDF and rebuild
    the FAISS knowledge base.
    """

    file_path = DOCUMENT_FOLDER / filename

    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    # Delete file
    file_path.unlink()

    print(f"\nDeleted: {filename}")

    # Rebuild FAISS
    print("\nRebuilding Knowledge Base...")

    indexer.build_index()

    print("Knowledge Base Updated Successfully!")

    return {

        "status": "success",

        "document": filename,

        "message": "Document deleted successfully."

    }