import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  threadId: string;
  parentId?: string;
  author: "user" | "assistant" | "system";
  text: string;
  createdAt: string;
  metadata?: {
    childrenThreads?: string[]; // NEW: child threads per message
    [key: string]: any;
  };
}

export interface Thread {
  id: string;
  parentThreadId?: string;
  originMessageId?: string; // message that spawned this thread
  messages: string[];
}

export interface ThreadsState {
  threadsById: Record<string, Thread>;
  messagesById: Record<string, Message>;
  allThreadIds: string[];
  expandedThreadId?: string;
}

const initialState: ThreadsState = {
  threadsById: {},
  messagesById: {},
  allThreadIds: [],
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    addThread: (state, action: PayloadAction<Thread>) => {
      const thread = action.payload;
      state.threadsById[thread.id] = thread;
      state.allThreadIds.push(thread.id);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      state.messagesById[msg.id] = msg;
      const thread = state.threadsById[msg.threadId];
      if (thread) thread.messages.push(msg.id);
    },
    setExpandedThread: (state, action: PayloadAction<string | undefined>) => {
      state.expandedThreadId = action.payload;
    },
    createThreadWithMessage: (
      state,
      action: PayloadAction<{
        threadId: string;
        initialMessage: Message;
        parentMessageId?: string;
        parentThreadId?: string;
      }>
    ) => {
      const { threadId, initialMessage, parentMessageId, parentThreadId } = action.payload;

      // Create the new thread
      state.threadsById[threadId] = {
        id: threadId,
        parentThreadId,
        originMessageId: parentMessageId,
        messages: [initialMessage.id],
      };
      state.allThreadIds.push(threadId);

      // Add initial message
      state.messagesById[initialMessage.id] = initialMessage;

      // Attach child thread to parent message if provided
      if (parentMessageId) {
        const parentMsg = state.messagesById[parentMessageId];
        if (!parentMsg.metadata) parentMsg.metadata = {};
        if (!parentMsg.metadata.childrenThreads) parentMsg.metadata.childrenThreads = [];
        parentMsg.metadata.childrenThreads.push(threadId);
      }

      // Expand new thread
      state.expandedThreadId = threadId;
    },
  },
});

export const { addThread, addMessage, setExpandedThread, createThreadWithMessage } = threadsSlice.actions;
export default threadsSlice.reducer;
