import { useEffect, useState } from "react";
import {
  FileText,
  Loader2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getDocuments,
  deleteDocument,
} from "../../services/documentService";

type DocumentInfo = {
  name: string;
  size: number;
};

function UploadedDocuments() {
  const [documents, setDocuments] =
    useState<DocumentInfo[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadDocuments() {
    try {
      setLoading(true);

      const response =
        await getDocuments();

      setDocuments(
        response.documents
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load documents."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void loadDocuments();
    }, 0);

    const refresh = () => {
      void loadDocuments();
    };

    window.addEventListener(
      "documents-updated",
      refresh
    );

    return () => {
      window.clearTimeout(initialLoad);

      window.removeEventListener(
        "documents-updated",
        refresh
      );
    };
  }, []);

  async function handleDelete(
    filename: string
  ) {
    const confirmed = window.confirm(
      `Delete "${filename}"?`
    );

    if (!confirmed) return;

    try {
      const loadingToast = toast.loading(
        "Deleting document..."
      );

      await deleteDocument(filename);

      toast.dismiss(loadingToast);

      toast.success(
        "Document deleted successfully."
      );

      await loadDocuments();

      window.dispatchEvent(
        new Event("documents-updated")
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete document."
      );
    }
  }

  return (
    <div className="mt-5">

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Uploaded Documents
      </h2>

      {loading && (
        <div className="flex items-center gap-2 px-2 py-2 text-sm text-gray-500">

          <Loader2
            size={16}
            className="animate-spin"
          />

          Loading...

        </div>
      )}

      {!loading &&
        documents.length === 0 && (
          <p className="px-2 text-sm text-gray-500">
            No documents uploaded.
          </p>
        )}

      <div className="space-y-2">

        {documents.map((document) => (

          <div
            key={document.name}
            className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 transition hover:bg-gray-50"
          >

            <FileText size={18} />

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium">
                {document.name}
              </p>

              <p className="text-xs text-gray-500">
                {document.size} MB
              </p>

            </div>

            <button
              onClick={() =>
                handleDelete(
                  document.name
                )
              }
              className="rounded-lg p-2 text-red-500 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
              title="Delete Document"
            >
              <Trash2 size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default UploadedDocuments;
