import React from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";
import ReactMarkdown from "react-markdown";

interface Props {
  messageId: string;
}

const ThreadItem: React.FC<Props> = ({ messageId }) => {
  const message = useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  ) as Message;

  if (!message) return null;

  const isUser = message.author?.toLowerCase() === "user";

  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-content-end" : "justify-content-start"
        }`}
    >
      <div
        className={`px-3 border-round-lg shadow-1 max-w-lg whitespace-pre-wrap markdown-body`}
        style={{ backgroundColor: isUser ? "lavenderblush" : "mintcream" }}
      >
        <small className="block my-1 font-medium opacity-70">
          {message.author}
        </small>
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ThreadItem;
