export type LanguageCode =
  | "en-IN"
  | "te-IN"
  | "hi-IN"
  | "kn-IN"
  | "ta-IN";

export type InputMethod = "text" | "voice";

export type Citation = {
  act: string;
  section: string;
  title: string;
  page: number | null;
  content: string;
};

export type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
  inputMethod?: InputMethod;
};
