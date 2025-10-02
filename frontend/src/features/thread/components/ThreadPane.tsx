import React, { useState } from "react";
import { Button, Card, Tooltip } from "@/imports";
import ThreadTimeline from "./ThreadTimeline";
import { useThread } from "../hooks/useThread";

interface Props {
  threadId: string;
}

const ThreadPane: React.FC<Props> = ({ threadId }) => {
  const { thread } = useThread(threadId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!thread) return <div>Thread not found</div>;

  return (
    <Card className="flex-1 w-full surface-card shadow-2 border-round-lg mb-8">
      <div>
        <span
          className="pi pi-info-circle text-500 cursor-pointer"
          id={`thread-info-${thread.id}`}
        />
        <Tooltip
          target={`#thread-info-${thread.id}`}
          content={`Thread ID: ${thread.id}`}
          position="top"
        />
        <Button
          icon={isExpanded ? "pi pi-angle-up" : "pi pi-angle-down"}
          className="toggle-thread py-0 w-1rem text-xl focus:shadow-none focus:outline-none"
          text
          onClick={() => setIsExpanded((prev) => !prev)}
        />

        {isExpanded && (
          <>
            {/* Timeline for messages */}
            <ThreadTimeline threadId={thread.id} />

            {/* Recursive children */}
            {thread.children.length > 0 && (
              <div className="ml-4 mt-3 border-left-2 pl-3 border-300">
                {thread.children.map((childId) => (
                  <ThreadPane key={childId} threadId={childId} />
                ))}
              </div>
            )}
          </>
        )}
        {!isExpanded && <div> ... </div>}
      </div>
    </Card>
  );
};

export default ThreadPane;
