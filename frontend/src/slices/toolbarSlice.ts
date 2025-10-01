import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToolbarState {
  activeTool: string | null;
}

const initialState: ToolbarState = {
  activeTool: null,
};

const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setActiveTool: (state, action: PayloadAction<string>) => {
      state.activeTool = action.payload;
    },
    clearActiveTool: (state) => {
      state.activeTool = null;
    },
  },
});

export const { setActiveTool, clearActiveTool } = toolbarSlice.actions;
export default toolbarSlice.reducer;
