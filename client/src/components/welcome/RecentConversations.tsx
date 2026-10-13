import type { Conversation } from "../../types/conversation";
import RecentConversationCard from "./RecentConversationCard";

type RecentConversationsProps = {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
};

function RecentConversations({
  conversations,
  onSelectConversation,
}: RecentConversationsProps) {
  // Show only the latest 3 conversations
  const recentConversations = conversations.slice(0, 3);

  return (
    <section className="w-full max-w-5xl">

      {/* Section Heading */}

      <div className="mb-8 text-center">

        <h2 className="text-2xl font-semibold text-gray-900">

          Recent Conversations

        </h2>

        <p className="mt-2 text-gray-500">

          Continue where you left off.

        </p>

      </div>

      {/* Conversation Cards */}

      {recentConversations.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">

          <h3 className="text-lg font-semibold text-gray-800">

            No conversations yet

          </h3>

          <p className="mt-3 text-gray-500">

            Start a new chat to begin your legal research.

          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          {recentConversations.map((conversation) => (

            <RecentConversationCard
              key={conversation.id}
              title={conversation.title}
              onClick={() =>
                onSelectConversation(conversation.id)
              }
            />

          ))}

        </div>

      )}

    </section>
  );
}

export default RecentConversations;