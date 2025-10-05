import React, { useEffect } from "react";
import { ComposerPane } from "@/features/composer";
import ErrorBoundary from "@/entities/ErrorBoundary";
import { ChatProvider } from "@/entities/ChatProvider";
import { ProgressSpinner } from "@/imports";
import { ThreadProvider } from "@/features/thread/context/ThreadProvider";
import { useChatPage } from "./useChatPage";

const ChatPage: React.FC = () => {
  const { loading, threadId, getSessionId } = useChatPage();

  useEffect(() => {
    getSessionId();
  }, []);

  return <ErrorBoundary fallback={<div>Oops! Something broke in ChatPage.</div>}>
    <ChatProvider>
      <ThreadProvider>
        <div className="chatpage flex flex-column align-items-center h-screen text-color">
          {loading ? <ProgressSpinner /> : <ComposerPane threadId={threadId} />}
        </div>
      </ThreadProvider>
    </ChatProvider>
  </ErrorBoundary>;
};

export default ChatPage;
