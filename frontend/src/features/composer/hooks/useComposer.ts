import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, addThread } from "@/slices/threadsSlice";
import { generateId } from "@/imports";
import apiClient from "@/imports/api";
import { CHAT_STARTED, ERROR_MESSAGE } from "@/shared/utils/constant";
import { useToast } from "@/entities/useToast";

export interface StartChatResponse {
  session_id: string;
}

export interface SendMessageResponse {
  response: string;
}


export const useComposer = (threadId: string = "") => {
  const [text, setText] = useState('');
  
  const toast = useToast()
  const dispatch = useDispatch();

  const startChat = async (): Promise<StartChatResponse> => {
    try {
      const resp = await apiClient.post("/chat/start");
      toast?.success(CHAT_STARTED)
      return resp.data;
    }catch (error) {
      console.error(error)
    }
    return {session_id: ''}
  };
  
  const sendMessage = async (
    sessionId: string,
    message: string
  ): Promise<SendMessageResponse> => {
    try {
      const resp = await apiClient.post(`/chat/send/${sessionId}`, { message });
      return resp.data;
    } catch (error) {
      toast?.error(ERROR_MESSAGE)
      console.error(error)
    }
    return {response:ERROR_MESSAGE}
  };

  const reset = () => setText("");

  const handleChange = (value: string) => {
    setText(value)
  }

  const handleSend = async (sessionId: string, text: string) => {
    if (!text.trim()) return;
  
    dispatch(
      addMessage({
        id: generateId(),
        threadId,
        author: "user",
        text,
        createdAt: new Date().toISOString(),
      })
    );
  
    reset();
  
    // Add backend call here
    const response = await sendMessage(sessionId, text);
    console.log(response)
    dispatch(
      addMessage({
        id: generateId(),
        threadId,
        author: "assistant",
        text: response.response,
        createdAt: new Date().toISOString(),
      })
    );
  };

  const getSessionId = async () => {
    const response = await startChat()
    dispatch(addThread({
      id: response.session_id,
      messages: [],
      children: [],
    }));
  }
  

  return {
    text,
    startChat,
    handleSend,
    handleChange,
    getSessionId,
  };
};
