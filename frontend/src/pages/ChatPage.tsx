import React, { useEffect } from "react";
import { ThreadPane } from "@/features/thread";
import { ComposerPane } from "@/features/composer";
import { ThreadsState } from "@/slices/threadsSlice";
import { useSelector } from "@/imports";
import { useComposer } from "@/features/composer";

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

  return (
    <div className="flex flex-column h-screen surface-ground text-color">
      {/* Chat area (scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 pb-24 h-60vh">
        {threadId && <ThreadPane threadId={threadId} />}
      </div>

      {/* Composer - fixed bottom center */}
      {threadId && (
        <div className="sticky bottom-0 left-0 w-full flex justify-center p-3 surface-500 border-top-1 border-300">
          <div className="w-full max-w-3xl">
            <ComposerPane threadId={threadId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
