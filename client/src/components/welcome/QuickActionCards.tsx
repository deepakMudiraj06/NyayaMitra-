import {
  UploadCloud,
  MessageSquarePlus,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";
import UploadDocumentButton from "../chat/UploadDocumentButton";

type QuickActionsProps = {
  onNewChat: () => void;
};

function QuickActions({
  onNewChat,
}: QuickActionsProps) {
  return (
    <section className="mt-14 w-full max-w-5xl">

      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">

        What would you like to do?

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Upload */}

        <div className="rounded-3xl">

          <QuickActionCard
            icon={<UploadCloud size={30} />}
            title="Upload Document"
            description="Upload Acts, Judgements, Legal PDFs and ask questions using AI."
            onClick={() => {}}
          />

          <div className="mt-4">

            <UploadDocumentButton />

          </div>

        </div>

        {/* New Chat */}

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