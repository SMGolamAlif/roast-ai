import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RoastFormProps {
  conversation: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  showReply: boolean;
  handleNewConversation: () => void;
}

export default function RoastForm({
  conversation,
  inputValue,
  setInputValue,
  showReply,
  handleNewConversation,
}: RoastFormProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when showReply becomes true
  useEffect(() => {
    if (showReply && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showReply]);

  if (!showReply && conversation.length > 0) return null;

  return (
    <Form method="post" className="w-full max-w-xl flex flex-col gap-4 bg-zinc-900/80 p-6 rounded-xl shadow-lg">
      <textarea
        name="userInput"
        rows={3}
        ref={inputRef}
        className="rounded-md p-3 bg-zinc-800 text-blue-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        placeholder={
          conversation.length === 0
            ? "Type something about yourself..."
            : "Reply to Roast AI..."
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      {/* Hidden field to send conversation context */}
      <input
        type="hidden"
        name="conversation"
        value={JSON.stringify(conversation)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:from-blue-400 hover:to-purple-400 transition"
        >
          {conversation.length === 0 ? "Roast Me" : "Send Reply"}
        </button>
        {conversation.length > 0 && (
          <button
            type="button"
            onClick={handleNewConversation}
            className="bg-zinc-700 text-blue-200 font-semibold py-2 px-4 rounded-md border border-blue-400 hover:bg-zinc-800 transition"
          >
            New Conversation
          </button>
        )}
      </div>
    </Form>
  );
}
