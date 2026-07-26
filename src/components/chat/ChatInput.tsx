import { useState } from "react";
import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  return (
    <div className="border-t bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-center gap-3"
      >
        <input
          type="text"
          placeholder="Ask your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="rounded-xl bg-black p-3 text-white hover:bg-gray-800 transition"
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;