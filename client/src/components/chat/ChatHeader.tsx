import { Scale } from "lucide-react";

function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-8 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-black text-white">
            <Scale size={22} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black">
              NyayaMitra AI
            </h1>

            <p className="text-sm text-gray-500">
              Indian Legal Assistant
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <span className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700">
            ● Online
          </span>

          <span className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700">
            Llama 3.2
          </span>

        </div>

      </div>
    </header>
  );
}

export default ChatHeader;