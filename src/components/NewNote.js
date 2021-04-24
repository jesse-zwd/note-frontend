import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseIcon } from "./Icons";
import { closeNoteModal } from "../reducers/modal";
import { createNewNote } from "../utils";
import { addNote } from "../services/api";
import { updateNotes } from "../reducers/notebook";
import "./newnote.css";

const NewNote = () => {
  const dispatch = useDispatch();
  const { notebook } = useSelector((state) => state.modal);

  const closeNoteModalHandler = () => {
    dispatch(closeNoteModal());
  };

  const addNoteHandler = (e) => {
    if (e.keyCode === 13) {
      closeNoteModalHandler();

      const payload = {
        notebook: notebook.id,
        title: e.target.value,
        data: createNewNote(e.target.value),
      };

      addNote(payload).then((newNote) => {
        dispatch(updateNotes(newNote))
      })
    }
  };

  return (
    <div className="new-note">
      <div className="header">
        <h3>New Note</h3>
        <CloseIcon onClick={closeNoteModalHandler} />
      </div>

      <div className="content">
        <input
          type="text"
          placeholder="State Management"
          onKeyDown={addNoteHandler}
        />
      </div>
    </div>
  );
};

export default NewNote;
