import { useRef, useState } from "react";
import { Languages, Mic, MicOff, SendHorizontal } from "lucide-react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import type { InputMethod, LanguageCode } from "../../types/chat";

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en-IN", label: "English (India)" },
  { code: "te-IN", label: "Telugu" },
  { code: "hi-IN", label: "Hindi" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ta-IN", label: "Tamil" },
];

type ChatInputProps = {
  onSend: (
    message: string,
    language: LanguageCode,
    inputMethod: InputMethod,
  ) => void;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  isTyping: boolean;
};

function ChatInput({
  onSend,
  language,
  onLanguageChange,
  isTyping,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef("");
  const inputMethodRef = useRef<InputMethod>("text");

  const handleTranscript = (transcript: string) => {
    inputRef.current = transcript;
    setInput(transcript);

    if (transcript.trim()) {
      inputMethodRef.current = "voice";
    }
  };

  const {
    error: recognitionError,
    isListening,
    isSupported,
    start: startListening,
    stop: stopListening,
  } = useSpeechRecognition(language, handleTranscript);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = inputRef.current.trim();

    if (!message || isTyping) return;

    if (isListening) {
      stopListening();
    }

    onSend(message, language, inputMethodRef.current);

    inputRef.current = "";
    inputMethodRef.current = "text";
    setInput("");
  };

  return (
    <div className="border-t bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <Languages size={16} aria-hidden="true" />
          <label htmlFor="chat-language">Voice language</label>
          <select
            id="chat-language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            disabled={isListening}
            className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-gray-900 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
          >
            {LANGUAGES.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
          {isListening && (
            <span className="font-medium text-red-600" role="status">
              Listening...
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask your legal question..."
            value={input}
            onChange={(e) => {
              inputRef.current = e.target.value;
              setInput(e.target.value);
            }}
            className="min-w-0 flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={!isSupported && !isListening}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            title={isSupported ? (isListening ? "Stop listening" : "Start voice input") : "Voice input is not supported in this browser"}
            className={`rounded-xl p-3 transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ${
              isListening
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="rounded-xl bg-black p-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            aria-label="Send message"
          >
            <SendHorizontal size={20} />
          </button>
        </div>

        {(!isSupported || recognitionError) && (
          <p className="mt-2 text-sm text-gray-600" role="status">
            {recognitionError ?? "Voice input is not supported in this browser. You can still type your question."}
          </p>
        )}
      </form>
    </div>
  );
}

export default ChatInput;
