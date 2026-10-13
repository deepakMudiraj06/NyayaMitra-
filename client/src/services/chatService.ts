import type { LanguageCode } from "../types/chat";

const API_URL = "http://127.0.0.1:8000";

export async function sendMessageToAI(
  message: string,
  conversationId: string,
  language: LanguageCode = "en-IN",
): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      question: message,
      language,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Chat request failed (${response.status}): ${errorDetails}`
    );
  }

  const data = await response.json();

  return data.answer;
}
