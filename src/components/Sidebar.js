import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import AddNotebook from "./AddNotebook";
import NewNote from "./NewNote";
import { NotebookIcon, PencilIcon, SignoutIcon } from "./Icons";
import { getNotebooks } from "../reducers/notebooks";
import { getNote } from "../reducers/note";
import { getNotebook } from "../reducers/notebook";
import { changeTheme } from "../reducers/theme";
import { logout } from "../reducers/user";
import { openNoteModal, openNotebookModal } from "../reducers/modal";
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data: user }= useSelector((state) => state.user);
  const sidebar = useSelector((state) => state.sidebar);
  const { noteModal, notebookModal } = useSelector((state) => state.modal);
  const [selectedNotebook, setSelectedNotebook] = useState({})
  const [selectedNote, setSelectedNote] = useState({})
  const { data: notebooks } = useSelector((state) => state.notebooks);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  const getNotesHandler = (notebook) => {
    setSelectedNotebook(notebook);
    dispatch(getNotebook(notebook.id))
  };

  const getNoteHandler = (note) => {
    setSelectedNote(note)
    dispatch(getNote(note.id))
  }

  const signoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  }
  
  return (
    <div className={`sidebar ${sidebar ? "mobile" : ""}`}>
      <div className="user-theme">
        <span className="user">{user.nickname}</span>
        <div
          className="theme-switch"
          onClick={() => dispatch(changeTheme())}
        ></div>
      </div>

      <ul className="notebooks">
        {notebooks && notebooks.map((notebook) => (
          <div key={notebook.id}>
            <li
              className={
                selectedNotebook.id === notebook.id ? "selected-notebook" : ""
              }
            >
              <span onClick={() => getNotesHandler(notebook)}>{notebook.name}</span>{" "}
              {selectedNotebook.id === notebook.id && (
                <PencilIcon onClick={() => dispatch(openNoteModal(notebook))} />
              )}
            </li>

            {notebook.id === selectedNotebook.id && (
              <div className="notes">
                {notebook.notes && notebook.notes.map((note) => (
                  <p
                    className={
                      selectedNote.id === note.id ? "selected-note-sidebar" : ""
                    }
                    key={note.id}
                    onClick={() => getNoteHandler(note)}
                  >
                    {note.title}
                  </p>
                ))}
              </div>
            )} 
          </div>
        ))}
      </ul>

      <div
        className="new-notebook"
        onClick={() => dispatch(openNotebookModal())}
      >
        <NotebookIcon />
        <span>Notebook</span>
      </div>
      <div
        className="signout"
        onClick={() => signoutHandler()}
      >
        <SignoutIcon />
        <span>Sign out</span>
      </div>

      {notebookModal && (
        <Modal>
          <AddNotebook />
        </Modal>
      )}

      {noteModal && (
        <Modal>
          <NewNote />
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
