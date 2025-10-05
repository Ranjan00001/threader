import React from "react";
import { Tooltip } from "@/imports";

interface Props {
  threadId: string;
}

const ThreadHeaderPane: React.FC<Props> = ({ threadId }) => {

  return (
    <div className="thread-header-container flex items-center justify-between mb-2">
      <span
        className="thread-header-info-icon pi pi-info-circle text-500 cursor-pointer"
        id={`thread-info-${threadId}`}
      />
      <Tooltip
        target={`#thread-info-${threadId}`}
        content={`Thread ID: ${threadId}`}
        position="top"
      />
    </div>
  );
};

export default ThreadHeaderPane;
