const API_URL = "http://127.0.0.1:8000";

// -----------------------------------------------------
// Upload Document
// -----------------------------------------------------

export async function uploadDocument(
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/documents/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

// -----------------------------------------------------
// Get Uploaded Documents
// -----------------------------------------------------

export async function getDocuments() {
  const response = await fetch(
    `${API_URL}/documents`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch documents."
    );
  }

  return response.json();
}

// -----------------------------------------------------
// Delete Document
// -----------------------------------------------------

export async function deleteDocument(
  filename: string
) {
  const response = await fetch(
    `${API_URL}/documents/${encodeURIComponent(filename)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to delete document."
    );
  }

  return response.json();
}