
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Volume2, VolumeX } from "lucide-react";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import type { InputMethod } from "../../types/chat";

type ChatMessageProps = {
  role: "user" | "assistant";
  message: string;
  language: string;
  isError?: boolean;
  inputMethod?: InputMethod;
};

function ChatMessage({
  role,
  message,
  language,
  isError = false,
  inputMethod,
}: ChatMessageProps) {
  const isUser = role === "user";
  const autoSpokenRef = useRef(false);
  const {
    error: speechError,
    hasSpoken,
    isSpeaking,
    isSupported,
    speak,
    stop,
  } = useSpeechSynthesis(language);

  useEffect(() => {
    if (
      isUser ||
      isError ||
      inputMethod !== "voice" ||
      autoSpokenRef.current
    ) {
      return;
    }

    autoSpokenRef.current = true;
    speak(message);
  }, [inputMethod, isError, isUser, message, speak]);

  const formattedMessage = message
    .replace(/\\n/g, "\n")
    .replace(
      /^(Rash Driving Explained|Legal Summary|Relevant Law|Important Points|Conclusion)\s*$/gm,
      "## $1"
    );

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser ? "bg-black text-white" : "bg-gray-100 text-black"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message}</div>
        ) : (
          <div className="prose prose-sm max-w-none break-words prose-headings:text-black prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-p:text-black prose-li:text-black prose-strong:text-black prose-ul:my-2 prose-ol:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formattedMessage}
            </ReactMarkdown>
          </div>
        )}

        {!isUser && !isError && (
          <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-2">
            <button
              type="button"
              onClick={isSpeaking ? stop : () => speak(message)}
              disabled={!isSupported}
              aria-label={isSpeaking ? "Stop speaking" : hasSpoken ? "Replay answer" : "Read answer aloud"}
              title={
                isSupported
                  ? isSpeaking
                    ? "Stop speaking"
                    : hasSpoken
                      ? "Replay answer"
                      : "Read answer aloud"
                  : "Speech playback is not supported in this browser"
              }
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <span className="text-xs text-gray-500">
              {isSpeaking ? "Speaking..." : hasSpoken ? "Replay" : "Read aloud"}
            </span>
            {(!isSupported || speechError) && (
              <span className="text-xs text-gray-500" role="status">
                {speechError ?? "Speech playback is not supported in this browser. You can read the answer on screen."}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
