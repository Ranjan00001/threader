import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface Props {
  x: number;
  y: number;
  text: string;
  onCreateThread: (query: string) => void;
  onCopy: (text: string) => void;
  onClose: () => void;
}

const SelectionToolbar: React.FC<Props> = ({
  x,
  y,
  text,
  onCreateThread,
  onCopy,
  onClose,
}) => {
  console.log(window.scrollY);
  return (
    <div
      className="absolute flex z-5 gap-2 shadow-3 border-round-xl"
      style={{
        top: y,
        left: x,
        transform: "translateX(-50%)",
        backgroundColor: "lavenderblush",
      }}
    >
      <Button
        icon="pi pi-plus"
        tooltip="Create Thread"
        tooltipOptions={{ position: "top" }}
        className="p-button-sm p-button-text p-button-rounded"
        onClick={() => {
          onCreateThread(text);
          onClose();
        }}
      />
      <Button
        icon="pi pi-copy"
        tooltip="Copy"
        tooltipOptions={{ position: "top" }}
        className="p-button-sm p-button-text p-button-rounded"
        onClick={() => {
          onCopy(text);
          onClose();
        }}
      />
    </div>
  );
};

export default SelectionToolbar;
