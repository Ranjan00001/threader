import React from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { ThreadPane } from "@/features/thread";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";

const ChatPage: React.FC = () => {
  // Select the currently open thread
  const openThreadId = useSelector((state: { ui: { openThreadId?: string } }) => state.ui.openThreadId);
  const allThreadIds = useSelector((state: { threads: ThreadsState }) => state.threads.allThreadIds);

  // Fallback to first thread if no openThreadId
  const threadId = openThreadId || allThreadIds[0];

  return (
    <Provider store={store}>
      <div style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem" }}>
        {threadId && <ThreadPane threadId={threadId} />}
        {threadId && <ComposerPane threadId={threadId} />}
      </div>
    </Provider>
  );
};

export default ChatPage;
