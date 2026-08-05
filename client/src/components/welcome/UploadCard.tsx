import { UploadCloud } from "lucide-react";
import UploadDocumentButton from "../chat/UploadDocumentButton";

function UploadCard() {
  return (
    <div className="mt-12 w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-xl">

      <div className="flex flex-col items-center">

        <div className="rounded-full bg-gray-100 p-5">
          <UploadCloud size={36} />
        </div>

        <h3 className="mt-5 text-xl font-semibold">
          Upload Legal PDF
        </h3>

        <p className="mt-2 text-center text-gray-500">
          Upload an Indian law, judgement, or legal document
          and ask questions instantly.
        </p>

        <div className="mt-8 w-full">
          <UploadDocumentButton />
        </div>

      </div>

    </div>
  );
}

export default UploadCard;