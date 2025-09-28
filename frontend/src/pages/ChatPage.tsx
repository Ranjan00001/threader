import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/store";
import { ThreadPane } from "@/features/thread";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";
import { addThread } from "@/slices/threadsSlice";
import { startChat } from "@/services/chatService";

const ChatPage: React.FC = () => {
  
  const dispatch = useDispatch();
  
  // Select the currently open thread
  const openThreadId = useSelector((state: { ui: { openThreadId?: string } }) => state.ui.openThreadId);
  const allThreadIds = useSelector((state: { threads: ThreadsState }) => state.threads.allThreadIds);

  // Fallback to first thread if no openThreadId
  const threadId = openThreadId || allThreadIds[0];

  useEffect(() => {
    const getSessionId = async () => {
      const response = await startChat()
        dispatch(addThread({
          id: response.session_id,
          messages: [],
          children: [],
        }));
      }
    getSessionId()
  }, [])

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
