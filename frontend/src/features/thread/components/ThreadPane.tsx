import React from "react";
import { Card } from "@/imports";
import ThreadItem from "./ThreadItem";
import { useThread } from "../hooks/useThread";
import { Toolbar } from "@/features/toolbar";
import { useSelector } from "react-redux";

interface Props {
  threadId: string;
}

const ThreadPane: React.FC<Props> = ({ threadId }) => {
  const {thread} = useThread(threadId);

  const isExpanded = useSelector(
    (state: { threadLocal: { isExpanded: boolean } }) => state.threadLocal.isExpanded
  );

  if (!thread) return <div>Thread not found</div>;

  return (
    <Card className="flex-1 w-full surface-card shadow-2 border-round-lg">
      <Toolbar threadId={threadId} />
      <div className="p-3">
        <h3 className="m-0 mb-3 text-lg font-semibold">Thread {thread.id}</h3>
        {isExpanded && (
          <>
            <div className="flex flex-column gap-3">
              {thread.messages.map((msgId) => (
                <ThreadItem key={msgId} messageId={msgId} />
              ))}
            </div>
            {thread.children.length > 0 && (
              <div className="ml-4 mt-3 border-left-2 pl-3 border-300">
                {thread.children.map((childId) => (
                  <ThreadPane key={childId} threadId={childId} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default ThreadPane;
