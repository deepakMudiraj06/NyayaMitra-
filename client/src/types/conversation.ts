import type { Message } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}