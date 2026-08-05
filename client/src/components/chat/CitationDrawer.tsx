import type { Citation } from "../../types/chat";
import {
  X,
  Scale,
  BookOpen,
  FileText,
} from "lucide-react";

type Props = {
  citation: Citation | null;
  isOpen: boolean;
  onClose: () => void;
};

function CitationDrawer({
  citation,
  isOpen,
  onClose,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
    >
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`absolute right-0 top-0 flex h-full w-[500px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">

              <Scale size={18} />

            </div>

            <div>

              <h2 className="text-lg font-bold">

                Legal Reference

              </h2>

              <p className="text-sm text-gray-500">

                Complete Legal Section

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {citation && (

          <div className="flex-1 overflow-y-auto p-6">

            {/* Act */}

            <div className="mb-6">

              <p className="text-xs uppercase tracking-wide text-gray-500">

                Act

              </p>

              <h3 className="mt-1 text-xl font-bold">

                {citation.act}

              </h3>

            </div>

            {/* Section */}

            <div className="mb-6 flex items-center gap-2">

              <BookOpen
                size={18}
              />

              <span className="font-semibold">

                Section {citation.section}

              </span>

            </div>

            {/* Title */}

            <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="text-xs uppercase tracking-wide text-gray-500">

                Title

              </p>

              <p className="mt-2 font-medium">

                {citation.title}

              </p>

            </div>

            {/* Legal Text */}

            <div>

              <p className="mb-3 text-xs uppercase tracking-wide text-gray-500">

                Complete Legal Text

              </p>

              <div className="rounded-xl border border-gray-200 bg-white p-5 leading-8 whitespace-pre-wrap">

                {citation.content}

              </div>

            </div>

            {/* Page */}

            {citation.page !== null && (

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">

                <FileText size={16} />

                Page {citation.page}

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default CitationDrawer;