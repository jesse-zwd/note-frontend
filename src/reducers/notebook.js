import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../services/http";
import authHeader from "../services/header";

export const getNotebook = createAsyncThunk(
  "/notebooks/getNotebook",
  async (id) => {
    const res = await http.get(`notebooks/${id}`, {headers: authHeader()})
    return res.data
  }
);

const notebookSlice = createSlice({
    name: "notebook",
    initialState: {
        data: {}
    },
  reducers: {
    updateNotes(state, action) {
      state.data = {
        ...state.data,
        notes: [action.payload, ...state.data.notes],
      };
    },
    removeNote(state, action) {
      state.data = {
        ...state.data,
        notes: state.data.notes.filter(
          (note) => note.id !== action.payload
        ),
      };
    },
      searchNotes(state, action) {
        state.data = {
          ...state.data,
          notes: state.data.notes.filter((note) =>
            note.title.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };
      },
    },
    extraReducers: {
        [getNotebook.fulfilled]: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {
  searchNotes,
  updateNotes,
  removeNote,
} = notebookSlice.actions

export default notebookSlice.reducer