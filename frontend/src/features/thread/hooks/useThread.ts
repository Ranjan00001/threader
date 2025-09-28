import { useSelector } from "@/imports";
import { ThreadsState, Thread } from "@/slices/threadsSlice";

export const useThread = (threadId: string): Thread | undefined => {
  return useSelector((state: { threads: ThreadsState }) => state.threads.threadsById[threadId]);
};
