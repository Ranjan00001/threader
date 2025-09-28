import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThreadPane } from "@/features/thread";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";
import { addThread } from "@/slices/threadsSlice";
import { useComposer } from "@/features/composer";

const ChatPage: React.FC = () => {
  
  const dispatch = useDispatch();
  const {startChat} = useComposer()
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
      <div style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem" }}>
        {threadId && <ThreadPane threadId={threadId} />}
        {threadId && <ComposerPane threadId={threadId} />}
      </div>
  );
};

export default ChatPage;
