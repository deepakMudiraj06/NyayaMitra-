
import { useRef, useState } from "react";
import type { InputMethod, LanguageCode, Message } from "../types/chat";
import { sendMessageToAI } from "../services/chatService";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm NyayaMitra AI. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  // Keep the same conversation ID for every message in this chat.
  const [conversationId] = useState(
    () => crypto.randomUUID()
  );

  const [isTyping, setIsTyping] = useState(false);
  const isSendingRef = useRef(false);

  const handleSendMessage = async (
    text: string,
    language: LanguageCode = "en-IN",
    inputMethod: InputMethod = "text",
  ) => {
    const trimmedText = text.trim();

    if (!trimmedText || isSendingRef.current) return;

    isSendingRef.current = true;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiReply = await sendMessageToAI(
        trimmedText,
        conversationId,
        language,
      );

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiReply,
        timestamp: new Date(),
        inputMethod,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("NyayaMitra chat error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      isSendingRef.current = false;
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    handleSendMessage,
  };
}
