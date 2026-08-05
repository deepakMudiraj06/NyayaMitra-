import { useMemo, useState } from "react";
import {
  MessageSquarePlus,
  Search,
  Settings,
} from "lucide-react";

import type { Conversation } from "../../types/conversation";

import {
  getConversationIcon,
  groupConversations,
} from "../../utils/sidebar";

import ConversationMenu from "./ConversationMenu";
import UploadDocumentButton from "./UploadDocumentButton";
import UploadedDocuments from "./UploadedDocuments";

type ChatSidebarProps = {
  conversations: Conversation[];
  currentConversationId: string;

  onSelectConversation: (
    id: string
  ) => void;

  onNewChat: () => void;

  renameConversation: (
    id: string,
    title: string
  ) => void;

  deleteConversation: (
    id: string
  ) => void;
};

function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  renameConversation,
  deleteConversation,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations;

    return conversations.filter((conversation) =>
      conversation.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, conversations]);

  const {
    today,
    yesterday,
    lastWeek,
    older,
  } = groupConversations(filteredConversations);

  const renderSection = (
    title: string,
    items: Conversation[]
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-8">

        <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h2>

        <div className="space-y-1">

          {items.map((conversation) => (

            <div
              key={conversation.id}
              className={`group flex items-center rounded-xl transition-all duration-200 ${
                currentConversationId === conversation.id
                  ? "border-l-4 border-black bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >

              <button
                onClick={() =>
                  onSelectConversation(
                    conversation.id
                  )
                }
                className="flex flex-1 items-center gap-3 px-3 py-3 text-left"
              >

                <span className="text-lg">
                  {getConversationIcon(
                    conversation.title
                  )}
                </span>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium text-black">
                    {conversation.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    {conversation.messages.length} messages
                  </p>

                </div>

              </button>

              <div
                className="mr-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <ConversationMenu

                  onRename={() => {

                    const title =
                      window.prompt(
                        "Rename conversation",
                        conversation.title
                      );

                    if (
                      title &&
                      title.trim() !== ""
                    ) {

                      renameConversation(
                        conversation.id,
                        title
                      );

                    }

                  }}

                  onDelete={() => {

                    if (
                      window.confirm(
                        "Delete this conversation?"
                      )
                    ) {

                      deleteConversation(
                        conversation.id
                      );

                    }

                  }}

                />

              </div>

            </div>

          ))}

        </div>

      </div>
    );
  };

    return(
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">

      {/* Header */}
      <div className="border-b border-gray-200 p-6">

        <h1 className="text-2xl font-bold">
          ⚖️ NyayaMitra
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Indian Legal AI Assistant
        </p>

        {/* New Chat */}
        <button
          onClick={onNewChat}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-white transition hover:bg-gray-800"
        >
          <MessageSquarePlus size={18} />
          New Chat
        </button>

        {/* Upload PDF */}
        <UploadDocumentButton />

        {/* Uploaded Documents */}
        <UploadedDocuments />

        {/* Search */}
        <div className="mt-5">

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">

            <Search
              size={16}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

          </div>

        </div>

      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4 py-5">

        {renderSection(
          "Today",
          today
        )}

        {renderSection(
          "Yesterday",
          yesterday
        )}

        {renderSection(
          "Last 7 Days",
          lastWeek
        )}

        {renderSection(
          "Older",
          older
        )}

        {filteredConversations.length === 0 && (

          <div className="mt-10 text-center text-sm text-gray-500">

            No conversations found.

          </div>

        )}

      </div>
            {/* Footer */}

      <div className="border-t border-gray-200 p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-100">

          <Settings size={18} />

          <span>
            Settings
          </span>

        </button>

      </div>

    </aside>
  );
}

export default ChatSidebar;