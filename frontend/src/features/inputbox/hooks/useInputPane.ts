import { useChat } from "@/entities/ChatProvider";
import React from "react";

interface Props {
    text: string;
    selectedText: string | undefined;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
}

// Will improve on this later, the input box should not be dependent upon the thread context

export const useInputPane = () => {
    const [text, setText] = React.useState("");

  const reset = () => setText("");

    const handleChange = (value: string) => {
        setText(value);
    };


    return {
        text,
        handleChange,
    };
};
