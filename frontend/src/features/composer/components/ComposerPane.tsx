import React from "react";
import { Card, InputTextarea, Button } from "@/imports";
import { ThreadHeaderPane, ThreadTimeline } from "@/features/thread";
import { useComposer } from "../hooks/useComposer";
import InputPane from "@/features/inputbox/components/InputPane";

interface Props {
  threadId: string;
}

const ComposerPane: React.FC<Props> = ({ threadId }) => {
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

      <div className="composer-pane-input-container sticky bottom-0 flex flex-column items-center p-3 px-8 border-t">
        {selectedText && (
          <q className="composer-pane-selected-text bg-white text-sm border-round-top-3xl px-3 pt-2 ml-3 mr-2">
            {selectedText}
          </q>
        )}
        <div className="composer-pane-input-wrapper flex align-items-center gap-2 w-full max-w-3xl shadow-2 border-round-3xl bg-white">
          <Button
            tooltip="Upload"
            icon="pi pi-upload"
            className="composer-pane-upload-btn p-button-rounded p-button-secondary ml-3"
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
            className="composer-pane-textarea flex-1 p-inputtext-lg w-full max-h-10rem overflow-y-auto border-none shadow-none"
            disabled={sending}
          />
          <Button
            tooltip={sending ? "Cancel" : "Send"}
            icon={`pi ${sending ? "pi-stop" : "pi-send"}`}
            className={`composer-pane-send-btn p-button-rounded mr-3 ${sending ? "p-button-secondary" : "p-button-primary"}`}
            onClick={sending ? handleCancel : handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ComposerPane;
