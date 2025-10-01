import React, { useState } from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";
import SelectableMarkdown from "@/entities/SelectableMarkdown";
import SelectionToolbar from "@/features/toolbar/components/SelectionToolbar";
interface Props {
  messageId: string;
}

const ThreadItem: React.FC<Props> = ({ messageId }) => {
  const message = useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  ) as Message;

  const [selectionInfo, setSelectionInfo] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  if (!message) return null;

  const isUser = message.author?.toLowerCase() === "user";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  const handleCreateThread = (query: string) => {
    // TODO: wire with your threadsSlice / service
    console.log("Creating new thread with:", query);
  };

  return <>
    {selectionInfo && (
      <SelectionToolbar
        x={selectionInfo.x}
        y={selectionInfo.y}
        text={selectionInfo.text}
        onCopy={handleCopy}
        onCreateThread={handleCreateThread}
        onClose={() => setSelectionInfo(null)}
      />
    )}
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-content-end" : "justify-content-start"
        }`}
    >
      <div
        className={`px-3 border-round-lg shadow-1 max-w-lg whitespace-pre-wrap relative`}
        style={{ backgroundColor: isUser ? "lavenderblush" : "mintcream" }}
      >
        <small className="block my-1 font-medium opacity-70">
          {message.author}
        </small>

        <SelectableMarkdown
          content={message.text}
          onSelect={setSelectionInfo}
          className="markdown-body"
        />
      </div>
    </div>
  </>;
};

export default ThreadItem;
