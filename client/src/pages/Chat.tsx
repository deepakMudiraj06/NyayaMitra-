import { useState } from "react";

import ChatHeader from "../components/chat/ChatHeader";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import type { LanguageCode } from "../types/chat";

import { useChat } from "../hooks/useChat";

function Chat() {
  const [language, setLanguage] = useState<LanguageCode>("en-IN");
  const {
    messages,
    isTyping,
    handleSendMessage,
  } = useChat();

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar />

      <div className="flex flex-1 flex-col">
        <ChatHeader />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          language={language}
        />

        <ChatInput
          onSend={handleSendMessage}
          language={language}
          onLanguageChange={setLanguage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}

export default Chat;
