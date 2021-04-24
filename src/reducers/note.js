import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../services/http";
import authHeader from "../services/header";

export const getNote = createAsyncThunk(
  "/note/getNote",
  async (id) => {
    const res = await http.get(`notes/${id}`, {headers: authHeader()})
    return res.data
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    data: {}
  },
  reducers: {
    clearNote(state, action) {
      state.data = {};
    },
    updateNote(state, action) {
      return { ...state.data, ...action.payload };
    },
  },
  extraReducers: {
    [getNote.fulfilled]: (state, action) => {
      state.data = action.payload; 
    },
  },
});

export const {
  updateNote,
  clearNote,
} = noteSlice.actions;

export default noteSlice.reducer;
