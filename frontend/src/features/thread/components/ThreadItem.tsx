import React from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";

interface Props {
  messageId: string;
}

const ThreadItem: React.FC<Props> = ({ messageId }) => {
  const message = useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  ) as Message;

  if (!message) return null;

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <strong>{message.author}</strong>: {message.text}
    </div>
  );
};

export default ThreadItem;
