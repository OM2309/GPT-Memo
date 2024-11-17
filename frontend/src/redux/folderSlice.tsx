import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FolderState {
  data: any[]; // Adjust the type based on your actual folder data structure
}

const initialState: FolderState = {
  data: [],
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addFolder, removeFolder } = folderSlice.actions;

export default folderSlice.reducer;
