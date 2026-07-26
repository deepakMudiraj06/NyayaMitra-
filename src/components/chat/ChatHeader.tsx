import { Scale } from "lucide-react";

function ChatHeader() {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <Scale className="h-8 w-8" />
        <div>
          <h1 className="text-xl font-bold">NyayaMitra AI</h1>
          <p className="text-sm text-gray-500">
            Your AI-powered legal assistant
          </p>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;