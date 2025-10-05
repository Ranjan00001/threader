import React from "react";
import { InputTextarea, Button } from "@/imports";

interface Props {
    text: string;
    selectedText: string | undefined;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
}

const InputPane: React.FC<Props> = ({ text, selectedText, handleChange, handleSubmit }) => {

    return (
        <div className="inputbox-pane-container flex flex-column h-full w-full" style={{ maxWidth: "1000px" }}>
            <div className="inputbox-pane-input-container sticky bottom-0 flex flex-column items-center gap-2 p-3 px-8 border-t">
                {selectedText && (
                    <div className="inputbox-pane-selected-text bg-gray-900 text-sm border-l-4 border-blue-500 px-3 py-2 w-full max-w-3xl">
                        {selectedText}
                    </div>
                )}
                <div className="inputbox-pane-input-wrapper flex align-items-center gap-2 w-full max-w-3xl shadow-2 border-round-3xl bg-white">
                    <Button
                        tooltip="Upload"
                        icon="pi pi-upload"
                        className="inputbox-pane-upload-btn p-button-rounded p-button-secondary ml-3"
                        onClick={() => alert("Upload feature coming soon!")}
                    />
                    <InputTextarea
                        value={text}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        autoResize
                        placeholder="Type your message..."
                        className="inputbox-pane-textarea flex-1 p-inputtext-lg w-full max-h-10rem overflow-y-auto border-none shadow-none"
                    />
                    <Button
                        tooltip="Send"
                        icon="pi pi-send"
                        className="inputbox-pane-send-btn p-button-rounded p-button-primary mr-3"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputPane;
