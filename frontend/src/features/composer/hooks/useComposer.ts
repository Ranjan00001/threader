import { useState } from "react";
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
    reset();  // By the time this state will ve cleared, the redux would have been already updated

    if (selectedText) {
      await handleCreateThread(text, threadId, selectedText);
      setSelectedText(undefined);
    } else {
      dispatch(
        addMessage({
          id: generateId(),
          threadId,
          author: "user",
          text,
          createdAt: new Date().toISOString(),
        })
      );

      const response = await sendMessage(threadId, text);
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
  };

  const handleCancel = () => {
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
