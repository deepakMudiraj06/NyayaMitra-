import { MessageSquare } from "lucide-react";

interface Props {
  title: string;
  onClick: () => void;
}

function RecentConversationCard({
  title,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-black hover:shadow-lg"
    >
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-black group-hover:text-white">

          <MessageSquare size={22} />

        </div>

        <div className="flex-1">

          <h3 className="truncate font-semibold text-gray-900">

            {title}

          </h3>

          <p className="mt-1 text-sm text-gray-500">

            Click to continue conversation

          </p>

        </div>

      </div>

    </button>
  );
}

export default RecentConversationCard;