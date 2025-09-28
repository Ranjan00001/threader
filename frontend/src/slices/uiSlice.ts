import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StreamingState {
  [threadId: string]: {
    messageId: string;
    progress: number;
  };
}

export interface UIState {
  openThreadId?: string;
  streaming: StreamingState;
}

const initialState: UIState = {
  openThreadId: undefined,
  streaming: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenThread: (state, action: PayloadAction<string | undefined>) => {
      state.openThreadId = action.payload;
    },
    setStreamingProgress: (
      state,
      action: PayloadAction<{ threadId: string; messageId: string; progress: number }>
    ) => {
      const { threadId, messageId, progress } = action.payload;
      state.streaming[threadId] = { messageId, progress };
    },
    clearStreaming: (state, action: PayloadAction<string>) => {
      delete state.streaming[action.payload];
    },
  },
});

export const { setOpenThread, setStreamingProgress, clearStreaming } = uiSlice.actions;
export default uiSlice.reducer;
