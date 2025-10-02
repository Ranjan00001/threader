import React, { useState } from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";
import SelectableMarkdown from "@/entities/SelectableMarkdown";
import SelectionToolbar from "@/features/toolbar/components/SelectionToolbar";
import { useThread } from "../hooks/useThread";
import { useChat } from "@/entities/ChatProvider";
interface Props {
  messageId: string;
}

interface SelectionInfo {
  text: string;
  x: number;
  y: number;
}

const ThreadItem: React.FC<Props> = ({ messageId }) => {
  const message = useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  ) as Message;

  const { setSelectedText, setActiveMessage } = useChat()

  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(null);

  const { handleCopy } = useThread(message.threadId);

  const isUser = message.author?.toLowerCase() === "user";

  if (!message) return null;

  return <>
    {selectionInfo && (
      <SelectionToolbar
        x={selectionInfo.x}
        y={selectionInfo.y}
        text={selectionInfo.text}
        onCopy={handleCopy}
        onCreateThread={(text) => {
          setSelectedText(text);
          setActiveMessage(message);
        }}
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
