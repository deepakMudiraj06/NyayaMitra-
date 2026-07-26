import { MessageSquarePlus, MessageSquare } from "lucide-react";

function ChatSidebar() {
  const chats = [
    "Consumer Rights",
    "Property Dispute",
    "Rental Agreement",
    "Cyber Crime",
  ];

  return (
    <aside className="w-72 border-r bg-gray-50 h-screen p-4">

      <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-black text-white py-3 hover:bg-gray-800 transition">
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
              key={chat}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-200 transition"
            >
              <MessageSquare size={18} />
              {chat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;