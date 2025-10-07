import React, { useRef, useState } from "react";
import '@/features/inputbox/components/InputPane.css';
import { Card, InputTextarea, Button } from "@/imports";
import { ThreadHeaderPane, ThreadTimeline } from "@/features/thread";
import { useComposer } from "../hooks/useComposer";
import InputPane from "@/features/inputbox/components/InputPane";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  const {
    sending,
    text,
    thread,
    selectedText,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useComposer(threadId);

  if (!thread) return <div>Thread not found</div>;


  return (
    <div className="composer-pane-container flex flex-column h-screen w-full" style={{ maxWidth: "1000px" }}>
      <Card className="composer-pane-card flex flex-column overflow-y-auto flex-1 surface-card shadow-2 border-round-lg">
        <ThreadHeaderPane threadId={thread.id} />

        <ThreadTimeline threadId={thread.id} />
        <div className="mb-8"></div>
      </Card>

      <div className="composer-pane-input-container sticky bottom-0 flex flex-column items-center bg-white px-8">
        {selectedText && (
          <q className="composer-pane-selected-text bg-white text-sm border-round-top-3xl px-3 pt-2 ml-3 mr-2">
            {selectedText}
          </q>
        )}
        <div className={`composer-input-wrapper surface-50 shadow-2 ${isMultiLine ? 'multi-line' : ''}`}>
          <Button
            tooltip="Upload"
            icon="pi pi-upload"
            className="composer-upload-btn p-button-rounded p-button-secondary ml-2"
            onClick={() => alert("Upload feature coming soon!")}
          />
          <InputTextarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              handleChange(e.target.value);
              if (textareaRef.current) {
                const isMulti = textareaRef.current.scrollHeight > 80;
                if (isMulti !== isMultiLine) {
                  setIsMultiLine(isMulti);
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            autoResize
            placeholder="Type your message..."
            className="composer-textarea w-full overflow-y-auto border-none shadow-none"
            disabled={sending}
          />
          <Button
            tooltip={sending ? "Cancel" : "Send"}
            icon={`pi ${sending ? "pi-stop" : "pi-send"}`}
            className={`composer-send-btn p-button-rounded flex justify-content-end p-3 ${isMultiLine ? 'multi-line' : ''} ${sending ? "p-button-secondary" : "p-button-primary"}`}
            onClick={sending ? handleCancel : handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ComposerPane;
