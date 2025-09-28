import apiClient from "@/imports/api";

export interface StartChatResponse {
  session_id: string;
}

export interface SendMessageResponse {
  response: string;
}

/**
 * Start a new chat session
 */
export const startChat = async (): Promise<StartChatResponse> => {
  const resp = await apiClient.post("/chat/start");
  return resp.data;
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
  const resp = await apiClient.post(`/chat/send/${sessionId}`, { message });
  return resp.data;
};
