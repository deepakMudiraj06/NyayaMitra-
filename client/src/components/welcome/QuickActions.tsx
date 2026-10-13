import { UploadCloud, MessageSquarePlus } from "lucide-react";

import QuickActionCard from "./QuickActionCard";
import UploadDocumentButton from "../chat/UploadDocumentButton";

type QuickActionsProps = {
  onNewChat: () => void;
};

function QuickActions({
  onNewChat,
}: QuickActionsProps) {
  return (
    <section className="mt-8 w-full max-w-5xl">

      <h2 className="mb-5 text-center text-2xl font-semibold text-gray-900">
        What would you like to do?
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {/* Upload */}

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <QuickActionCard
            icon={<UploadCloud size={30} />}
            title="Upload Document"
            description="Upload legal Acts, Judgements and PDFs to ask AI-powered legal questions."
            onClick={() => {}}
          />

          <div className="mt-10">
            <UploadDocumentButton />
          </div>

        </div>

        {/* Start Chat */}

        <QuickActionCard
          icon={<MessageSquarePlus size={30} />}
          title="Start New Chat"
          description="Begin a fresh legal conversation with NyayaMitra AI."
          onClick={onNewChat}
        />

      </div>

    </section>
  );
}

export default QuickActions;