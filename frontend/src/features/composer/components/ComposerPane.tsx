// ComposerPane.tsx
import React from "react";
import { InputTextarea, Button } from "@/imports";
import { useComposer } from "../hooks/useComposer";
import { useChat } from "@/entities/ChatProvider";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const { text, reset, handleChange, handleSend } = useComposer(threadId)
  const { selectedText, setSelectedText, handleCreateThread } = useChat();

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (selectedText) {
      await handleCreateThread(text, threadId, selectedText);
      setSelectedText(undefined);
      reset()
    } else {
      await handleSend(threadId, text);
      reset()
    }
  };

  return <div className="w-full flex flex-column items-center gap-2">
    {selectedText && (
      <div className="bg-gray-100 text-sm text-gray-700 border-l-4 border-blue-500 px-3 py-2">
        {selectedText}
      </div>
    )}
    <div className="flex align-items-center gap-2 w-full max-w-3xl shadow-2 border-round-3xl">
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
        // style={{ maxHeight: '200px', overflowY: 'auto' }}
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
  </div>;
};

export default ComposerPane;
