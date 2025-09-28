import React, { useEffect } from "react";
import { ThreadPane } from "@/features/thread";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";
import { useComposer } from "@/features/composer";

const ChatPage: React.FC = () => {
  
  const {getSessionId} = useComposer()
  // Select the currently open thread
  const openThreadId = useSelector((state: { ui: { openThreadId?: string } }) => state.ui.openThreadId);
  const allThreadIds = useSelector((state: { threads: ThreadsState }) => state.threads.allThreadIds);

  // Fallback to first thread if no openThreadId
  const threadId = openThreadId || allThreadIds[0];

  useEffect(() => {
    getSessionId()
  }, [])

  return (
      <div className="flex flex-column h-screen surface-ground text-color">
      <div className="flex flex-1 overflow-y-auto p-3">
        {threadId && <ThreadPane threadId={threadId} />}
      </div>
      <div className="border-top-1 border-300 p-3">
        {threadId && <ComposerPane threadId={threadId} />}
      </div>
    </div>
  );
};

export default ChatPage;
