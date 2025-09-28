import React, { useState } from "react";
import { InputText, Button } from "@/imports";
import { useDispatch } from "@/imports";
import { addMessage } from "@/slices/threadsSlice";
import { generateId } from "@/imports";
import { sendMessage } from "@/services/chatService";

interface Props {
  threadId: string;
  onSend?: (text: string) => void;
}

const ComposerPane: React.FC<Props> = ({ threadId, onSend }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSend = async (sessionId: string, text: string) => {
    if (!text.trim()) return;
  
    const messageId = generateId();
    dispatch(
      addMessage({
        id: messageId,
        threadId,
        author: "user",
        text,
        createdAt: new Date().toISOString(),
      })
    );
  
    setText("");
  
    // Add backend call here
    const response = await sendMessage(sessionId, text);
    dispatch(
      addMessage({
        id: generateId(),
        threadId,
        author: "assistant",
        text: response.response,
        createdAt: new Date().toISOString(),
      })
    );
  };
  

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <InputText
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1 }}
      />
      <Button label="Send" onClick={() => handleSend(sessionId, text)} />
    </div>
  );
};

export default ComposerPane;
