import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadDocument } from "../../services/documentService";

function UploadDocumentButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const loadingToast = toast.loading(
        "Uploading and indexing document..."
      );

      await uploadDocument(file);

      toast.dismiss(loadingToast);

      toast.success(
        `${file.name} uploaded successfully!`
      );

      // Reset input so the same file can be uploaded again later
      event.target.value = "";

      // Refresh the document list
      window.dispatchEvent(
        new Event("documents-updated")
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to upload document."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black px-4 py-3 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Upload size={18} />

        {uploading
          ? "Uploading..."
          : "Upload PDF"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleUpload}
      />
    </>
  );
}

export default UploadDocumentButton;