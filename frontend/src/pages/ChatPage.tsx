import React, { useEffect } from "react";
import { ThreadPane } from "@/features/thread";
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
      <div className="flex flex-column h-screen text-color">
        {/* Chat area (scrollable) */}
        <div className="flex-1 overflow-y-auto p-3">
          {threadId && <ThreadPane threadId={threadId} />}
        </div>

        {/* Composer - fixed bottom center */}
        {threadId && (
          <div className="sticky bottom-0 flex p-3 px-8 bg-white">
            <ComposerPane threadId={threadId} />
          </div>
        )}
      </div>
    </ChatProvider>
  </ErrorBoundary>;
};

export default ChatPage;
