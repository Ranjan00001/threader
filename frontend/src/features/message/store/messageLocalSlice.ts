import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageLocalState {
  highlightedTerms: Record<string, string[]>; // messageId -> array of terms
}

const initialState: MessageLocalState = {
  highlightedTerms: {},
};

const messageLocalSlice = createSlice({
  name: "messageLocal",
  initialState,
  reducers: {
    setHighlightedTerms: (state, action: PayloadAction<{ messageId: string; terms: string[] }>) => {
      const { messageId, terms } = action.payload;
      state.highlightedTerms[messageId] = terms;
    },
    clearHighlightedTerms: (state, action: PayloadAction<string>) => {
      delete state.highlightedTerms[action.payload];
    },
  },
});

export const { setHighlightedTerms, clearHighlightedTerms } = messageLocalSlice.actions;
export default messageLocalSlice.reducer;
