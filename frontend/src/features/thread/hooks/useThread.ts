import { useSelector } from "@/imports";
import { ThreadsState } from "@/slices/threadsSlice";
import { useApi } from "@/entities/useApi";
import { API_ENDPOINTS } from "@/imports/constants/endpoints";
import { useToast } from "@/entities/useToast";

export const useThread = (threadId: string) => {
  const { get, post, loading, error } = useApi();
  const toast = useToast();
  const thread = useSelector(
    (state: { threads: ThreadsState }) => state.threads.threadsById[threadId]
  );

  const createThread = async (
    parentThreadId: string | null,
    query: string,
    context?: string,
    selectedText?: string
  ) => {
    try {
      const resp = await post(API_ENDPOINTS.THREAD.CREATE_WITH_CONTEXT, {
        parentThreadId,
        query,
        context,
        selectedText,
      });
      return resp;
    } catch (error) {
      toast?.error("Failed to create thread. Please try again.");
      console.error("Error creating thread:", error);
      throw error;
    }
  };

  const getThread = async (threadId: string) => {
    try {
      const resp = await get(API_ENDPOINTS.THREAD.GET_BY_ID(threadId));
      return resp;
    } catch (error) {
      toast?.error("Failed to fetch thread. Please try again.");
      console.error("Error fetching thread:", error);
      throw error;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };


  return {
    thread,
    loading,
    error,
    createThread,
    getThread,
    handleCopy,
  };
};
