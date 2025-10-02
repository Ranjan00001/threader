import React from "react";
import { Card, Tooltip } from "@/imports";
import ThreadTimeline from "./ThreadTimeline";
import { useThread } from "../hooks/useThread";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  threadId: string;
}

const ThreadPane: React.FC<Props> = ({ threadId }) => {
  const { thread } = useThread(threadId);

  const expandedThreadId = useSelector(
    (state: RootState) => state.threads.expandedThreadId
  );
  const isExpanded = expandedThreadId === thread?.id;

  if (!thread) return <div>Thread not found</div>;

  return (
    <Card className="flex-1 w-full surface-card shadow-2 border-round-lg mb-8">
      <div className="flex items-center justify-between mb-2">
        <span
          className="pi pi-info-circle text-500 cursor-pointer"
          id={`thread-info-${thread.id}`}
        />
        <Tooltip
          target={`#thread-info-${thread.id}`}
          content={`Thread ID: ${thread.id}`}
          position="top"
        />
      </div>

      {/* Timeline for messages and their child threads (recursive) */}
      <div>
        <ThreadTimeline threadId={thread.id} />
      </div>
    </Card>
  );
};

export default ThreadPane;
