import React, { useState } from "react";
import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";
import SelectableMarkdown from "@/entities/SelectableMarkdown";
import SelectionToolbar from "@/features/toolbar/components/SelectionToolbar";
import { useThread } from "../hooks/useThread";
import { useChat } from "@/entities/ChatProvider";
import ErrorBoundary from "@/entities/ErrorBoundary";

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

  if (!message) return null;

  const isUser = message.author?.toLowerCase() === "user";

  const alignmentClass = isUser ? "justify-content-end" : "justify-content-start";
  const bubbleColor = isUser ? "lavenderblush" : "mintcream";

  const renderContent = () =>
    isUser ? (
      <div className="thread-item-user-content" style={{ padding: "12px", whiteSpace: "pre-wrap" }}>{message.text}</div>
    ) : (
      <SelectableMarkdown
        content={message.text}
        onSelect={setSelectionInfo}
        className="thread-item-markdown markdown-body"
      />
    );

  const renderToolbar = () =>
    selectionInfo && (
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
    );

  return (
    <ErrorBoundary>
      {renderToolbar()}
      <div className={`thread-item-container flex w-full mb-3 ${alignmentClass}`}>
        <div
          className={`thread-item-bubble px-3 border-round-lg shadow-1 max-w-lg whitespace-pre-wrap relative`}
          style={{ backgroundColor: bubbleColor }}
        >
          <small className="thread-item-author block my-1 font-medium opacity-70">
            {message.author}
          </small>
          {renderContent()}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ThreadItem;
