export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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