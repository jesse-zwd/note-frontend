import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../services/http";
import authHeader from "../services/header";

export const getNotebooks = createAsyncThunk(
  "notebooks/getNotebooks",
  async () => {
    const res = await http.get(`notebooks/`, { headers: authHeader() })
    return res.data
  }
);

const notebooksSlice = createSlice({
  name: "notebooks",
  initialState: {
    data: []
  },
  reducers: {
    updateNotebooks(state, action) {
      state.data = [action.payload, ...state.data]
    },
    removeNotebook(state, action) {
      state.data = state.data.filter((notebook) => notebook.id !== action.payload)
    },
  },
  extraReducers: {
    [getNotebooks.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  updateNotebooks,
  removeNotebook,
} = notebooksSlice.actions

export default notebooksSlice.reducer;
