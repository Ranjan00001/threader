import React, { useState } from "react";
import { InputTextarea, Button } from "@/imports";
import { useComposer } from "../hooks/useComposer";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const { text, handleChange, handleSend } = useComposer(threadId)

  return (
    <div className="flex align-items-center gap-2 w-full max-w-3xl shadow-2 border-round-3xl">
      <Button
        tooltip="Upload"
        icon="pi pi-upload"
        className="p-button-rounded p-button-secondary ml-3"
        onClick={() => handleSend(threadId, text)}
      />
      <InputTextarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(threadId, text);
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
        onClick={() => handleSend(threadId, text)}
      />
    </div>
  );
};

export default ComposerPane;
