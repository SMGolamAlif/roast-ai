import { forwardRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationDisplayProps {
  conversation: Message[];
}

const ConversationDisplay = forwardRef<HTMLDivElement, ConversationDisplayProps>(
  ({ conversation }, ref) => {
    if (conversation.length === 0) return null;

    return (
      <div ref={ref} className="w-full max-w-xl mb-4 p-4 bg-black rounded-lg">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Roast AI
          </h2>
        </div>
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "text-blue-300 bg-zinc-900 border-l-4 border-blue-400 rounded-md px-4 py-2 my-2"
                : "text-purple-200 bg-zinc-800 border-l-4 border-purple-400 rounded-md px-4 py-2 my-2 animate-fade-in"
            }
          >
            <span className="block text-xs font-bold mb-1">
              {msg.role === "user" ? "You" : "Roast AI"}
            </span>
            <span className="whitespace-pre-line">{msg.content}</span>
          </div>
        ))}
      </div>
    );
  }
);

ConversationDisplay.displayName = "ConversationDisplay";

export default ConversationDisplay;
