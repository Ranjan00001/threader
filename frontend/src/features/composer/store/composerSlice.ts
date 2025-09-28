import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComposerState {
  draft: string;
}

const initialState: ComposerState = {
  draft: "",
};

const composerSlice = createSlice({
  name: "composer",
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<string>) => {
      state.draft = action.payload;
    },
    clearDraft: (state) => {
      state.draft = "";
    },
  },
});

export const { setDraft, clearDraft } = composerSlice.actions;
export default composerSlice.reducer;
