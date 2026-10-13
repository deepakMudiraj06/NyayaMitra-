import type { ReactNode } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import type { Conversation } from "../types/conversation";

type AIWorkspaceLayoutProps = {
  children: ReactNode;
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  renameConversation: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
};

function AIWorkspaceLayout({
  children,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  renameConversation,
  deleteConversation,
}: AIWorkspaceLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">

      {/* Sidebar */}

      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={onSelectConversation}
        onNewChat={onNewChat}
        renameConversation={renameConversation}
        deleteConversation={deleteConversation}
      />

      {/* Main Workspace */}

      <main className="flex flex-1 flex-col overflow-hidden">

        {children}

      </main>

    </div>
  );
}

export default AIWorkspaceLayout;