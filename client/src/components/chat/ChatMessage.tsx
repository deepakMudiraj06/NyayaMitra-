import { useState } from "react";

import type { Citation } from "../../types/chat";

import CitationCard from "./CitationCard";
import CitationDrawer from "./CitationDrawer";

type ChatMessageProps = {
  role: "user" | "assistant";
  message: string;
  citations?: Citation[];
};

function ChatMessage({
  role,
  message,
  citations,
}: ChatMessageProps) {

  const isUser = role === "user";

  const [selectedCitation, setSelectedCitation] =
    useState<Citation | null>(null);

  return (
    <>
      <div
        className={`flex ${
          isUser
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div className="max-w-3xl">

          {/* Chat Bubble */}

          <div
            className={`rounded-2xl px-5 py-4 ${
              isUser
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {message}
          </div>

          {/* Citation Cards */}

          {!isUser &&
            citations &&
            citations.length > 0 && (

              <div className="mt-3 space-y-2">

                <p className="text-sm font-semibold text-gray-600">

                  📚 Legal References

                </p>

                {citations.map(
                  (citation, index) => (

                    <div
                      key={index}
                      onClick={() =>
                        setSelectedCitation(
                          citation
                        )
                      }
                      className="cursor-pointer transition hover:scale-[1.02]"
                    >

                      <CitationCard
                        citation={citation}
                      />

                    </div>

                  )
                )}

              </div>

            )}

        </div>
      </div>

      {/* Drawer */}

      <CitationDrawer

        citation={selectedCitation}

        isOpen={
          selectedCitation !== null
        }

        onClose={() =>
          setSelectedCitation(null)
        }

      />

    </>
  );
}

export default ChatMessage;