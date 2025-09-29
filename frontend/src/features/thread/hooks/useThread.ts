import { useSelector } from "@/imports";
import { ThreadsState, Thread } from "@/slices/threadsSlice";
import apiClient from "@/imports/api";

export interface CreateThreadResponse {
  thread_id: string;
}


export const useThread = (threadId: string) => {

  const thread = useSelector((state: { threads: ThreadsState }) => state.threads.threadsById[threadId]);

  const createThread = async (
    parentThreadId: string | null,
    content: string
  ): Promise<CreateThreadResponse> => {
    const resp = await apiClient.post("/thread/create", { parentThreadId, content });
    return resp.data;
  };
  
  const getThread = async (threadId: string) => {
    const resp = await apiClient.get(`/thread/${threadId}`);
    return resp.data;
  };

  return {
    thread,
    createThread,
    getThread,
  }

};
