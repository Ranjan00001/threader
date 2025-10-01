import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThreadLocalState {
  isExpanded: boolean;
}

const initialState: ThreadLocalState = {
  isExpanded: true,
};

const threadLocalSlice = createSlice({
  name: "threadLocal",
  initialState,
  reducers: {
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleExpanded } = threadLocalSlice.actions;
export default threadLocalSlice.reducer;
