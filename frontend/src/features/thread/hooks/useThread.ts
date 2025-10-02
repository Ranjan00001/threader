import { useDispatch, useSelector } from "@/imports";
import { ThreadsState, Thread, createThreadWithMessage } from "@/slices/threadsSlice";
import apiClient from "@/imports/api";

export interface CreateThreadResponse {
  thread_id: string;
}


export const useThread = (threadId: string) => {
  const dispatch = useDispatch();
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  const handleCreateThread = async (query: string, id: string) => {
    console.log("Creating new thread with:", query);
    const response = await createThread(threadId, query);
    const newThreadId = response.thread_id;
    console.log("Created thread with ID:", newThreadId);
    dispatch(
        createThreadWithMessage({ threadId: newThreadId, initialMessage: {
            id: `${id}-${newThreadId}`,
            threadId: newThreadId,
            author: "assistant",
            text: "Hi there! How can I help you today?",
            createdAt: new Date().toISOString(),
          }
        }))
  };

  return {
    thread,
    createThread,
    getThread,
    handleCopy,
    handleCreateThread,
  };
};
