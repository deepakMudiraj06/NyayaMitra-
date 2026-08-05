import type { Conversation } from "../types/conversation";

const CONVERSATIONS_KEY = "nyayamitra_conversations";
const ACTIVE_CONVERSATION_KEY = "nyayamitra_active_conversation";

// -----------------------------
// Conversations
// -----------------------------

export function saveConversations(
  conversations: Conversation[]
) {
  localStorage.setItem(
    CONVERSATIONS_KEY,
    JSON.stringify(conversations)
  );
}

export function loadConversations(): Conversation[] {
  const data = localStorage.getItem(CONVERSATIONS_KEY);

  if (!data) return [];

  try {
    const conversations = JSON.parse(data);

    return conversations.map((conversation: Conversation) => ({
      ...conversation,
      createdAt: new Date(conversation.createdAt),
      messages: conversation.messages.map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      })),
    }));
  } catch {
    return [];
  }
}

// -----------------------------
// Active Conversation
// -----------------------------

export function saveActiveConversation(
  conversationId: string
) {
  localStorage.setItem(
    ACTIVE_CONVERSATION_KEY,
    conversationId
  );
}

export function loadActiveConversation() {
  return localStorage.getItem(
    ACTIVE_CONVERSATION_KEY
  );
}

// -----------------------------

export function clearStorage() {
  localStorage.removeItem(CONVERSATIONS_KEY);
  localStorage.removeItem(ACTIVE_CONVERSATION_KEY);
}