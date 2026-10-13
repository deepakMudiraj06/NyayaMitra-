import ChatMessage from "./ChatMessage";
import type { Message } from "../../types/chat";

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
  language: string;
};

function ChatMessages({
  messages,
  isTyping,
  language,
}: ChatMessagesProps) {
  return (
    <main className="flex-1 overflow-y-auto p-8 space-y-6">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          role={msg.role}
          message={msg.content}
          language={language}
          isError={msg.isError}
          inputMethod={msg.inputMethod}
        />
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl bg-gray-100 px-5 py-4 text-gray-600 italic">
            NyayaMitra AI is typing...
          </div>
        </div>
      )}
    </main>
  );
}

export default ChatMessages;
