import { useState } from "react";
import type { Message } from "../types/chat";
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

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: text,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);

  setIsTyping(true);

  try {
    const aiReply = await sendMessageToAI(text);

    const aiMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: aiReply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    const errorMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: "Sorry, something went wrong.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
  return {
    messages,
    isTyping,
    handleSendMessage,
  };
}