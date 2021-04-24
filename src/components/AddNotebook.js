import React from "react";
import { useDispatch } from "react-redux";
import { CloseIcon } from "./Icons";
import { closeNotebookModal } from "../reducers/modal";
import { addNotebook } from "../services/api";
import { updateNotebooks } from "../reducers/notebooks";
import "./newnote.css";

const AddNotebook = () => {
  const dispatch = useDispatch();

  const addNotebookHandler = (e) => {
    if (e.keyCode === 13) {
      dispatch(closeNotebookModal());
      addNotebook(e.target.value).then((newNotebook) => {
        dispatch(updateNotebooks(newNotebook))
      });
      
    }
  };

  return (
    <div className="new-note">
      <div className="header">
        <h3>Add Notebook</h3>
        <CloseIcon onClick={() => dispatch(closeNotebookModal())} />
      </div>

      <div className="content">
        <input
          type="text"
          placeholder="GraphQL"
          onKeyDown={addNotebookHandler}
        />
      </div>
    </div>
  );
};

export default AddNotebook;
