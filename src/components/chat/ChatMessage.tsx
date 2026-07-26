type ChatMessageProps = {
  role: "user" | "assistant";
  message: string;
};

function ChatMessage({ role, message }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;