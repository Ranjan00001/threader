import React from "react";
import { Card } from "@/imports";
import ThreadItem from "./ThreadItem";
import { useThread } from "../hooks/useThread";
import { Toolbar } from "@/features/toolbar";
import { useSelector as useReduxSelector } from "react-redux";
import { ThreadsState } from "@/slices/threadsSlice";

interface Props {
  threadId: string;
}

const ThreadPane: React.FC<Props> = ({ threadId }) => {
  const thread = useThread(threadId);

  const isExpanded = useReduxSelector(
    (state: { threadLocal: { isExpanded: boolean } }) => state.threadLocal.isExpanded
  );

  if (!thread) return <div>Thread not found</div>;

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Toolbar threadId={threadId} />
      <h3>Thread {thread.id}</h3>
      {isExpanded && (
        <>
          <div>
            {thread.messages.map((msgId) => (
              <ThreadItem key={msgId} messageId={msgId} />
            ))}
          </div>
          <div>
            {thread.children.map((childId) => (
              <ThreadPane key={childId} threadId={childId} />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default ThreadPane;
