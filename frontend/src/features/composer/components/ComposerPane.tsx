import React, { useState } from "react";
import { InputText, Button } from "@/imports";
import { useComposer } from "../hooks/useComposer";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const {text, handleChange, handleSend} = useComposer(threadId)  

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <InputText
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1 }}
      />
      <Button label="Send" onClick={() => handleSend(threadId, text)} />
    </div>
  );
};

export default ComposerPane;
