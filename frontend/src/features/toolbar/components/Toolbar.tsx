import React from "react";
import { Button } from "@/imports";
import { useDispatch } from "@/imports";
import { toggleExpanded } from "@/features/thread/store/threadLocalSlice";

interface Props {
  threadId: string;
}

const Toolbar: React.FC<Props> = ({ threadId }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleExpanded());
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
      <Button label="Toggle Thread" onClick={handleToggle} />
      {/* Add more buttons here, like "Collapse All", "Expand All", "New Thread" */}
    </div>
  );
};

export default Toolbar;
