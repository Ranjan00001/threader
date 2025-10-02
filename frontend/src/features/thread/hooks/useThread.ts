import { useDispatch, useSelector } from "@/imports";
import { ThreadsState, createThreadWithMessage } from "@/slices/threadsSlice";
import apiClient from "@/imports/api";

export interface CreateThreadResponse {
  thread_id: string;
}

export const useThread = (threadId: string) => {
  const dispatch = useDispatch();
  const thread = useSelector(
    (state: { threads: ThreadsState }) => state.threads.threadsById[threadId]
  );

  const createThread = async (
    parentThreadId: string | null,
    query: string,
    context?: string,
    selectedText?: string
  ): Promise<CreateThreadResponse> => {
    const resp = await apiClient.post("/thread/create", {
      parentThreadId,
      query,
      context,
      selectedText,
    });
    return resp.data;
  };

  const getThread = async (threadId: string) => {
    const resp = await apiClient.get(`/thread/${threadId}`);
    return resp.data;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };


  return {
    thread,
    createThread,
    getThread,
    handleCopy,
  };
};
