import ChatHeader from "../components/chat/ChatHeader";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

import { useChat } from "../hooks/useChat";

function Chat() {
  const {
    conversations,
    currentConversationId,
    messages,
    isTyping,
    handleSendMessage,
    handleNewChat,
    setCurrentConversationId,
  } = useChat();

  return (
    <div className="flex h-screen bg-white">

      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewChat={handleNewChat}
      />

      <div className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput
          onSend={handleSendMessage}
        />

      </div>

    </div>
  );
}

export default Chat;