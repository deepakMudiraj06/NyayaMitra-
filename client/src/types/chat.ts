export interface Message {
  id: number;

  role: "user" | "assistant";

  content: string;

  timestamp: Date;

  citations?: Citation[];
}

export interface Citation {
  act: string;

  section: string;

  title: string;

  page: number | null;

  content: string;
}

export interface ChatResponse {
  conversation_id: string;

  question: string;

  answer: string;

  citations: Citation[];
}