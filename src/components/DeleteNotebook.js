import React from "react";
import { DeleteIcon } from "./Icons";
import { useDispatch } from "react-redux";
import { deleteNotebook } from "../services/api";
import { removeNotebook } from "../reducers/notebooks";

const DeleteNotebook = ({ notebook }) => {
    const dispatch = useDispatch()

    const deleteNotebookHandler = () => {
        deleteNotebook(notebook.id).then(() => {
            dispatch(removeNotebook(notebook.id))
        });
    };

    return (
        <div className="delete-notebook" onClick={deleteNotebookHandler}>
            <DeleteIcon/> <span>Delete Notebook</span>
        </div>
    )
}

export default DeleteNotebook