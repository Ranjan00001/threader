import React, { useEffect } from "react";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";
import { useComposer } from "@/features/composer";
import ErrorBoundary from "@/entities/ErrorBoundary";
import { ChatProvider } from "@/entities/ChatProvider";

const ChatPage: React.FC = () => {
  const { getSessionId } = useComposer();
  const openThreadId = useSelector(
    (state: { ui: { openThreadId?: string } }) => state.ui.openThreadId
  );
  const allThreadIds = useSelector(
    (state: { threads: ThreadsState }) => state.threads.allThreadIds
  );

  const threadId = openThreadId || allThreadIds[0];

  useEffect(() => {
    getSessionId();
  }, []);

  return <ErrorBoundary fallback={<div>Oops! Something broke in ChatPage.</div>}>
    <ChatProvider>
      <div className="chatpage flex flex-column align-items-center h-screen text-color">
        <ComposerPane threadId={threadId} />
      </div>
    </ChatProvider>
  </ErrorBoundary>;
};

export default ChatPage;
