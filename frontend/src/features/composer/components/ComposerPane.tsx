import React, { useState } from "react";
import { InputText, Button } from "@/imports";
import { useComposer } from "../hooks/useComposer";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const {text, handleChange, handleSend} = useComposer(threadId)  

  return (
    <div className="flex align-items-center gap-2 w-full">
      <InputText
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-inputtext-lg w-full"
      />
      <Button
        label="Send"
        icon="pi pi-send"
        className="p-button-rounded p-button-primary"
        onClick={() => handleSend(threadId, text)}
      />
    </div>
  );
};

export default ComposerPane;
