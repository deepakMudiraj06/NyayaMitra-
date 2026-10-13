import type { ReactNode } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import type { Conversation } from "../types/conversation";

type ChatLayoutProps = {
  children: ReactNode;
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  renameConversation: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
};

function ChatLayout({
  children,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  renameConversation,
  deleteConversation,
}: ChatLayoutProps) {
  return (
    <div className="flex h-screen bg-[#FAFAFA]">

      {/* Sidebar */}

      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={onSelectConversation}
        onNewChat={onNewChat}
        renameConversation={renameConversation}
        deleteConversation={deleteConversation}
      />

      {/* Main */}

      <main className="flex flex-1 overflow-hidden">

        <div className="mx-auto flex h-full w-full max-w-7xl flex-col">

          {children}

        </div>

      </main>

    </div>
  );
}

export default ChatLayout;