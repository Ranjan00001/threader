import React, { useState } from "react";
import { Button, useSelector } from "@/imports";
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

  const isAssistant = message.author?.toLowerCase() === "assistant";

  const alignmentClass = isAssistant ? "justify-content-start" : "justify-content-end";
  const bubbleColor = isAssistant ? "mintcream" : "lavenderblush";

  const renderContent = () =>
    isAssistant ? (
      <SelectableMarkdown
        content={message.text}
        onSelect={setSelectionInfo}
        className="thread-item-markdown markdown-body pr-3"
      />
    ) : (
      <div className="thread-item-user-content" style={{ padding: "12px", whiteSpace: "pre-wrap" }}>{message.text}</div>
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
          className={`thread-item-bubble pl-3 border-round-lg shadow-1 max-w-lg whitespace-pre-wrap relative`}
          style={{ backgroundColor: bubbleColor }}
        >
          <div className="thread-header flex justify-content-between">
            <small className="thread-item-author block my-1 font-medium opacity-70">
              {message.author}
            </small>
            <div
              className="top-0 right-0 shadow-1 pt-1 px-2"
            >
              <Button
                icon="pi pi-copy"
                className="thread-item-copy-btn p-button-sm p-button-text p-button-secondary p-0 justify-content-end"
                style={{ width: 'fit-content', height: 'fit-content' }}
                onClick={() => handleCopy(message.text)}
              />
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ThreadItem;
