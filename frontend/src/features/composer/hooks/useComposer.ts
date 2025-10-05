import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/slices/threadsSlice";
import { generateId } from "@/imports";
import { useApi } from "@/entities/useApi";
import { ERROR_MESSAGE } from "@/shared/utils/constant";
import { useToast } from "@/entities/useToast";
import { useThread } from "@/features/thread";
import { useChat } from "@/entities/ChatProvider";

export interface SendMessageResponse {
  response: string;
}

interface ComposerHookResult {
  sending: boolean;
  text: string;
  reset: () => void;
  handleChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  handleCancel: () => void;
  selectedText?: string;
  thread: any;
}

export const useComposer = (threadId: string = ""): ComposerHookResult => {
  const [text, setText] = useState("");

  const stopRef = useRef(false);

  const { loading, post } = useApi();
  const toast = useToast();
  const dispatch = useDispatch();
  const { selectedText, setSelectedText } = useChat();
  const { thread, handleCreateThread } = useThread(threadId);

  

  const sendMessage = async (
    sessionId: string,
    message: string
  ): Promise<SendMessageResponse> => {
    try {
      const resp = await post<SendMessageResponse>(`/chat/send/${sessionId}`, { message });
      return resp;
    } catch (error) {
      toast?.error(ERROR_MESSAGE);
      console.error(error);
    }
    return { response: ERROR_MESSAGE };
  };

  const reset = () => setText("");

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    stopRef.current = false;
    const currentText = text;
    reset();

    if (selectedText) {
      if (!stopRef.current) {
        await handleCreateThread(currentText, threadId, selectedText);
        setSelectedText(undefined);
      }
    } else {
      dispatch(
        addMessage({
          id: generateId(),
          threadId,
          author: "user",
          text: currentText,
          createdAt: new Date().toISOString(),
        })
      );

      const response = await sendMessage(threadId, currentText);

      if (stopRef.current) {
        dispatch(
          addMessage({
            id: generateId(),
            threadId,
            author: "system",
            text: "Response generation was cancelled.",
            createdAt: new Date().toISOString(),
          })
        );
      } else {
          dispatch(
            addMessage({
              id: generateId(),
              threadId,
              author: "assistant",
              text: response.response,
              createdAt: new Date().toISOString(),
            })
          );
      }
    }
  };

  const handleCancel = () => {
    stopRef.current = true;
    setSelectedText(undefined);
    reset();
  };

  return {
    sending: loading,
    text,
    reset,
    handleChange,
    handleSubmit,
    handleCancel,
    selectedText,
    thread,
  };
};
