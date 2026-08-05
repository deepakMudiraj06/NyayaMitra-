import type { Citation } from "../../types/chat";
import {
  Scale,
  BookOpen,
  FileText,
  ChevronRight,
} from "lucide-react";

interface CitationCardProps {
  citation: Citation;
}

function CitationCard({
  citation,
}: CitationCardProps) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">

            <Scale size={18} />

          </div>

          <div>

            <h3 className="font-semibold text-black">
              {citation.act}
            </h3>

            <p className="text-xs text-gray-500">
              Indian Legal Reference
            </p>

          </div>

        </div>

        <ChevronRight
          size={18}
          className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-black"
        />

      </div>

      {/* Divider */}

      <div className="my-4 border-t border-gray-200" />

      {/* Section */}

      <div className="flex items-center gap-2">

        <BookOpen
          size={16}
          className="text-gray-700"
        />

        <span className="text-sm font-semibold">
          Section {citation.section}
        </span>

      </div>

      {/* Title */}

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-700">

        {citation.title}

      </p>

      {/* Page */}

      {citation.page !== null && (

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

          <FileText size={15} />

          Page {citation.page}

        </div>

      )}

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

        <span className="text-xs font-medium text-gray-500">

          Click to view complete section

        </span>

        <ChevronRight
          size={16}
          className="transition group-hover:translate-x-1"
        />

      </div>

    </div>
  );
}

export default CitationCard;