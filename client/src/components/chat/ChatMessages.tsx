import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import type { Message } from "../../types/chat";

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
};

function ChatMessages({
  messages,
  isTyping,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="mx-auto flex max-w-4xl flex-col space-y-6">

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            message={msg.content}
            citations={msg.citations}
          />
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">

            {/* AI Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow">
              ⚖️
            </div>

            {/* Typing Bubble */}
            <div className="rounded-2xl bg-white px-5 py-4 shadow">
              <div className="flex items-center gap-1">
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "0ms" }}
                ></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "150ms" }}
                ></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>

          </div>
        )}

        {/* Auto Scroll Target */}
        <div ref={bottomRef} />

      </div>
    </main>
  );
}

export default ChatMessages;