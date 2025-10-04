import React from "react";
import { Card, Tooltip, InputTextarea, Button } from "@/imports";
import { ThreadTimeline } from "@/features/thread";
import { useThread } from "@/features/thread";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useComposer } from "../hooks/useComposer";
import { useChat } from "@/entities/ChatProvider";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const { thread } = useThread(threadId);
  const { text, reset, handleChange, handleSend } = useComposer(threadId);
  const { selectedText, setSelectedText, handleCreateThread } = useChat();

  const expandedThreadId = useSelector(
    (state: RootState) => state.threads.expandedThreadId
  );
  const isExpanded = expandedThreadId === thread?.id;

  if (!thread) return <div>Thread not found</div>;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (selectedText) {
      await handleCreateThread(text, threadId, selectedText);
      setSelectedText(undefined);
      reset();
    } else {
      await handleSend(threadId, text);
      reset();
    }
  };

  return (
    <div className="flex flex-column h-full w-full" style={{ maxWidth: "1000px" }}>
      <Card className="flex flex-column overflow-y-auto flex-1 surface-card shadow-2 border-round-lg">
        <div className="flex items-center justify-between mb-2">
          <span
            className="pi pi-info-circle text-500 cursor-pointer"
            id={`thread-info-${thread.id}`}
          />
          <Tooltip
            target={`#thread-info-${thread.id}`}
            content={`Thread ID: ${thread.id}`}
            position="top"
          />
        </div>

        <ThreadTimeline threadId={thread.id} />
        <div className="mb-8"></div>
      </Card>

      <div className="sticky bottom-0 flex flex-column items-center gap-2 p-3 px-8 border-t">
        {selectedText && (
          <div className="bg-gray-900 text-sm border-l-4 border-blue-500 px-3 py-2 w-full max-w-3xl">
            {selectedText}
          </div>
        )}
        <div className="flex align-items-center gap-2 w-full max-w-3xl shadow-2 border-round-3xl bg-white">
          <Button
            tooltip="Upload"
            icon="pi pi-upload"
            className="p-button-rounded p-button-secondary ml-3"
            onClick={() => alert("Upload feature coming soon!")}
          />
          <InputTextarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            autoResize
            placeholder="Type your message..."
            className="flex-1 p-inputtext-lg w-full max-h-10rem overflow-y-auto border-none shadow-none"
          />
          <Button
            tooltip="Send"
            icon="pi pi-send"
            className="p-button-rounded p-button-primary mr-3"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ComposerPane;
