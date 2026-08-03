export interface Citation {
  act: string;
  section: string;
  title: string;
  page: number | null;
}

export interface ChatResponse {
  question: string;
  answer: string;
  citations: Citation[];
}

export async function sendMessageToAI(
  question: string
): Promise<ChatResponse> {
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact backend");
  }

  return await response.json();
}