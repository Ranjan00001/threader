import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  threadId: string;
  parentId?: string;
  author: "user" | "assistant" | "system";
  text: string;
  createdAt: string;
  metadata?: any;
}

export interface Thread {
  id: string;
  parentThreadId?: string;
  originMessageId?: string;
  messages: string[]; // message IDs
  children: string[]; // nested threads
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
      if (thread.parentThreadId) {
        state.threadsById[thread.parentThreadId].children.push(thread.id);
      }
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
  },
});

export const { addThread, addMessage, setExpandedThread } = threadsSlice.actions;
export default threadsSlice.reducer;
