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
      className={`flex w-full mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-3 border-round-lg shadow-1 max-w-30rem whitespace-pre-wrap markdown-body ${
          isUser
            ? "bg-primary text-primary-contrast"
            : "surface-card text-color"
        }`}
      >
        <small className="block mb-1 font-medium opacity-70">
          {message.author}
        </small>
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ThreadItem;
