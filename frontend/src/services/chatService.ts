import apiClient from "@/imports/api";
import { CHAT_STARTED, ERROR_MESSAGE } from "@/shared/utils/constant";
import { useToast } from "@/entities/useToast";

export interface StartChatResponse {
  session_id: string;
}

export interface SendMessageResponse {
  response: string;
}

const toast = useToast()
/**
 * Start a new chat session
 */
export const startChat = async (): Promise<StartChatResponse> => {
  try {
    const resp = await apiClient.post("/chat/start");
    toast?.success(CHAT_STARTED)
    return resp.data;
  }catch (error) {
    console.error(error)
  }
  return {session_id: ''}
};

/**
 * Send a message to the chat
 * @param sessionId - active session
 * @param message - message content
 */
export const sendMessage = async (
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
