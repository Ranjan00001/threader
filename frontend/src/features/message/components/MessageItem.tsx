import React from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";

interface Props {
  messageId: string;
}

const MessageItem: React.FC<Props> = ({ messageId }) => {
  const message = useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  ) as Message;

  if (!message) return null;

  return (
    <div style={{ marginBottom: "0.5rem", padding: "0.25rem", borderRadius: "4px", backgroundColor: "#f4f4f4" }}>
      <div>
        <strong>{message.author}</strong> - <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
      </div>
      <div>{message.text}</div>
    </div>
  );
};

export default MessageItem;
