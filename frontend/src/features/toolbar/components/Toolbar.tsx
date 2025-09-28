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
    <div className="flex align-items-center gap-2 mb-3">
      <Button
        label="Toggle Thread"
        icon="pi pi-exchange"
        className="p-button-text p-button-sm"
        onClick={handleToggle}
      />
      {/* Future: Collapse All, Expand All, New Thread */}
    </div>
  );
};

export default Toolbar;
