import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { searchNotes } from "../reducers/notebook";
import { getNotebook } from "../reducers/notebook";
import DeleteNotebook from "../components/DeleteNotebook";
import "./notes.css";  

const Notes = () => {
  const dispatch = useDispatch(); 
  const {data: notebook} = useSelector((state) => state.notebook);
  
  const searchNotesHandler = (e) => {
    if (e.target.value.trim()) {
      dispatch(searchNotes(e.target.value));
    } else {
      dispatch(getNotebook(notebook.id))
    }
  };

  return (
    <div className="notes-panel">
      <div className="search-notes">
        <input
          type="text"
          placeholder="search notes"
          onChange={searchNotesHandler}
        />
      </div>

      {notebook && notebook.notes && notebook.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      {notebook && notebook.notes && notebook.notes.length < 1 && (
          <DeleteNotebook notebook={ notebook}/>
      )}
    </div>
  );
};

export default Notes;
