import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

import type { Message } from "../types/chat";
import type { Conversation } from "../types/conversation";

import {
  sendMessageToAI,
  resetConversation,
} from "../services/chatService";

import {
  loadConversations,
  saveConversations,
  loadActiveConversation,
  saveActiveConversation,
} from "../utils/storage";

// ------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------

const createWelcomeMessage = (): Message => ({
  id: Date.now(),
  role: "assistant",
  content: "Hello! I'm NyayaMitra AI. How can I help you today?",
  timestamp: new Date(),
});

const createConversation = (): Conversation => ({
  id: uuid(),
  title: "New Chat",
  createdAt: new Date(),
  messages: [createWelcomeMessage()],
});

// ------------------------------------------------------------

export function useChat() {

  // ---------------- Load Saved Conversations ----------------

  const storedConversations = loadConversations();

  const initialConversation =
    storedConversations.length > 0
      ? storedConversations[0]
      : createConversation();

  const savedConversationId =
    loadActiveConversation();

  const initialConversationId =
    savedConversationId &&
    storedConversations.some(
      (conversation) =>
        conversation.id === savedConversationId
    )
      ? savedConversationId
      : initialConversation.id;

  // ---------------- State ----------------

  const [conversations, setConversations] =
    useState<Conversation[]>(
      storedConversations.length > 0
        ? storedConversations
        : [initialConversation]
    );

  const [
    currentConversationId,
    setCurrentConversationId,
  ] = useState(initialConversationId);

  const [isTyping, setIsTyping] =
    useState(false);

  // ---------------- Current Conversation ----------------

  const currentConversation = useMemo(() => {

    return (
      conversations.find(
        (conversation) =>
          conversation.id === currentConversationId
      ) || conversations[0]

    );

  }, [conversations, currentConversationId]);

  const messages =
    currentConversation?.messages ?? [];

  // ---------------- Save Conversations ----------------

  useEffect(() => {

    saveConversations(
      conversations
    );

  }, [conversations]);

  // ---------------- Save Active Conversation ----------------

  useEffect(() => {

    saveActiveConversation(
      currentConversationId
    );

  }, [currentConversationId]);

  // ------------------------------------------------------------
  // Send Message
  // ------------------------------------------------------------

  const handleSendMessage = async (
    text: string
  ) => {

    if (!text.trim()) return;

    const userMessage: Message = {

      id: Date.now(),

      role: "user",

      content: text,

      timestamp: new Date(),

    };

    // Add user message

    setConversations((prev) =>
      prev.map((conversation) => {

        if (
          conversation.id !== currentConversationId
        ) {
          return conversation;
        }

        return {

          ...conversation,

          title:
            conversation.title === "New Chat"
              ? text
              : conversation.title,

          messages: [
            ...conversation.messages,
            userMessage,
          ],

        };

      })
    );

    setIsTyping(true);

    try {

      const response =
        await sendMessageToAI(
          currentConversationId,
          text
        );

      const aiMessage: Message = {

        id: Date.now() + 1,

        role: "assistant",

        content: response.answer,

        citations: response.citations,

        timestamp: new Date(),

      };

      setConversations((prev) =>
        prev.map((conversation) => {

          if (
            conversation.id !== currentConversationId
          ) {
            return conversation;
          }

          return {

            ...conversation,

            messages: [
              ...conversation.messages,
              aiMessage,
            ],

          };

        })
      );

    } catch (error) {

      console.error(error);

      const errorMessage: Message = {

        id: Date.now() + 1,

        role: "assistant",

        content:
          "Sorry, something went wrong.",

        timestamp: new Date(),

      };

      setConversations((prev) =>
        prev.map((conversation) => {

          if (
            conversation.id !== currentConversationId
          ) {
            return conversation;
          }

          return {

            ...conversation,

            messages: [
              ...conversation.messages,
              errorMessage,
            ],

          };

        })
      );

    } finally {

      setIsTyping(false);

    }

  };

  // ------------------------------------------------------------
  // New Chat
  // ------------------------------------------------------------

  const handleNewChat = () => {

    const newConversation =
      createConversation();

    setConversations((prev) => [

      newConversation,

      ...prev,

    ]);

    setCurrentConversationId(
      newConversation.id
    );

  };

  // ------------------------------------------------------------
  // Rename Conversation
  // ------------------------------------------------------------

  const renameConversation = (
    id: string,
    title: string
  ) => {

    setConversations((prev) =>
      prev.map((conversation) =>

        conversation.id === id
          ? {
              ...conversation,
              title,
            }
          : conversation

      )
    );

  };

  // ------------------------------------------------------------
  // Delete Conversation
  // ------------------------------------------------------------

  const deleteConversation = async (
    id: string
  ) => {

    try {

      await resetConversation(id);

    } catch (error) {

      console.error(error);

    }

    const remaining =
      conversations.filter(
        (conversation) =>
          conversation.id !== id
      );

    if (remaining.length === 0) {

      const newConversation =
        createConversation();

      setConversations([
        newConversation,
      ]);

      setCurrentConversationId(
        newConversation.id
      );

      return;

    }

    setConversations(
      remaining
    );

    if (
      currentConversationId === id
    ) {

      setCurrentConversationId(
        remaining[0].id
      );

    }

  };

  // ------------------------------------------------------------

  return {

    conversations,

    currentConversationId,

    messages,

    isTyping,

    handleSendMessage,

    handleNewChat,

    setCurrentConversationId,

    renameConversation,

    deleteConversation,

  };

}