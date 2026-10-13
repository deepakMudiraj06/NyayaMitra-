import { MessageSquarePlus, MessageSquare } from "lucide-react";
import type { Conversation } from "../../types/conversation";

type ChatSidebarProps = {
  conversations?: Conversation[];
  currentConversationId?: string;
  onSelectConversation?: (id: string) => void;
  onNewChat?: () => void;
  renameConversation?: (id: string, title: string) => void;
  deleteConversation?: (id: string) => void;
};

function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const fallbackChats = [
    { id: "consumer-rights", title: "Consumer Rights" },
    { id: "property-dispute", title: "Property Dispute" },
    { id: "rental-agreement", title: "Rental Agreement" },
    { id: "cyber-crime", title: "Cyber Crime" },
  ];
  const chats = conversations?.length
    ? conversations.map((conversation) => ({
        id: conversation.id,
        title: conversation.title,
      }))
    : fallbackChats;

  return (
    <aside className="w-72 border-r bg-gray-50 h-screen p-4">

      <button
        type="button"
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-black text-white py-3 hover:bg-gray-800 transition"
      >
        <MessageSquarePlus size={18} />
        New Chat
      </button>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          Recent Chats
        </h2>

        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectConversation?.(chat.id)}
              aria-current={currentConversationId === chat.id ? "page" : undefined}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-200 transition"
            >
              <MessageSquare size={18} />
              {chat.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;
