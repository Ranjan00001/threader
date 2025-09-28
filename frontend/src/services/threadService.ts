import apiClient from "@/imports/api";

export interface CreateThreadResponse {
  thread_id: string;
}

/**
 * Create a new thread
 * @param parentThreadId - optional parent thread
 * @param content - initial message
 */
export const createThread = async (
  parentThreadId: string | null,
  content: string
): Promise<CreateThreadResponse> => {
  const resp = await apiClient.post("/thread/create", { parentThreadId, content });
  return resp.data;
};

/**
 * Get a thread by ID
 */
export const getThread = async (threadId: string) => {
  const resp = await apiClient.get(`/thread/${threadId}`);
  return resp.data;
};
