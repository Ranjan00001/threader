import { useSelector } from "@/imports";
import { ThreadsState, Message } from "@/slices/threadsSlice";

export const useMessage = (messageId: string): Message | undefined => {
  return useSelector(
    (state: { threads: ThreadsState }) => state.threads.messagesById[messageId]
  );
};
