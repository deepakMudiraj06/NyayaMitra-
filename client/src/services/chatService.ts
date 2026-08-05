export interface Citation {
  act: string;
  section: string;
  title: string;
  page: number | null;
}

export interface ChatResponse {
  conversation_id: string;
  question: string;
  answer: string;
  citations: Citation[];
}

export interface Conversation {
  id: string;
  title: string;
}

const API_URL = "http://127.0.0.1:8000";

// ---------------------------------------------------------
// Send Message
// ---------------------------------------------------------

export async function sendMessageToAI(
  conversationId: string,
  question: string
): Promise<ChatResponse> {

  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        conversation_id: conversationId,
        question,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to contact backend");
  }

  return response.json();
}

// ---------------------------------------------------------
// Reset Conversation
// ---------------------------------------------------------

export async function resetConversation(
  conversationId: string
): Promise<void> {

  const response = await fetch(
    `${API_URL}/chat/reset`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        conversation_id: conversationId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reset conversation");
  }
}

// ---------------------------------------------------------
// Get Conversations
// ---------------------------------------------------------

export async function getConversations(): Promise<
  Conversation[]
> {

  const response = await fetch(
    `${API_URL}/chat/conversations`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load conversations."
    );
  }

  const data = await response.json();

  return data.conversations;
}

// ---------------------------------------------------------
// Delete Conversation
// ---------------------------------------------------------

export async function deleteConversation(
  conversationId: string
): Promise<void> {

  const response = await fetch(
    `${API_URL}/chat/${conversationId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete conversation."
    );
  }
}