import { useState } from "react";
import { useApi } from "@/entities/useApi";
import { useToast } from "@/entities/useToast";
import { API_ENDPOINTS } from "@/imports/constants/endpoints";
import { createThreadWithMessage } from "@/imports/store";
import { CHAT_STARTED, ERROR_MESSAGE } from "@/shared/utils/constant";
import { useDispatch } from "react-redux";

export interface StartChatResponse {
  session_id: string;
}

export const useChatPage = () => {
  const dispatch = useDispatch();
  const [threadId, setThreadId] = useState<string>("");
  const { loading, post } = useApi();
  const toast = useToast();

  const startChat = async (): Promise<StartChatResponse> => {
    try {
      const resp = await post<StartChatResponse>(API_ENDPOINTS.CHAT.START);
      toast?.success(CHAT_STARTED);
      return resp;
    } catch (error) {
      toast?.error(ERROR_MESSAGE);
      console.error(error);
    }
    return { session_id: "" };
  };

  const getSessionId = async () => {
    const response = await startChat();
    const { session_id = "" } = response;
    setThreadId(session_id);
    dispatch(
      createThreadWithMessage({
        threadId: session_id,
        initialMessage: {
          id: "000",
          threadId: session_id,
          author: "assistant",
          text: "Hi there! How can I help you today?",
          createdAt: new Date().toISOString(),
        },
      })
    );
  };

  return {
    loading,
    threadId,
    getSessionId,
  };
};
