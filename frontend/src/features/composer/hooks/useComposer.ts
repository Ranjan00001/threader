import { useState } from "react";

export const useComposer = (initialText: string = "") => {
  const [text, setText] = useState(initialText);

  const reset = () => setText("");

  return {
    text,
    setText,
    reset,
  };
};
