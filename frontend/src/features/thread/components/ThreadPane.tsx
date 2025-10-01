import React from "react";
import { Card } from "@/imports";
import ThreadItem from "./ThreadItem";
import { useThread } from "../hooks/useThread";
import { Toolbar } from "@/features/toolbar";
import { useSelector } from "react-redux";
import { Tooltip } from "primereact/tooltip";

interface Props {
  threadId: string;
}

const ThreadPane: React.FC<Props> = ({ threadId }) => {
  const { thread } = useThread(threadId);

  const isExpanded = useSelector(
    (state: { threadLocal: { isExpanded: boolean } }) => state.threadLocal.isExpanded
  );

  if (!thread) return <div>Thread not found</div>;

  return (
    <Card className="flex-1 w-full surface-card shadow-2 border-round-lg mb-8">
      {/* <Toolbar threadId={threadId} /> */}
      <div className="">
        <span className={`pi pi-info-circle text-500 cursor-pointer`} id={`thread-info-${thread.id}`} />
        <Tooltip target={`#thread-info-${thread.id}`} content={`Thread ID: ${thread.id}`} position="top" />
        {isExpanded && (
          <>
            <div className="flex flex-column">
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
