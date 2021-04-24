import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Options from "./Options";
import { HamburgerIcon, OptionsIcon } from "./Icons";
import { clearNote, getNote } from "../reducers/note";
import { closeOptionsModal, openOptionsModal } from "../reducers/modal";
import { openSidebar, closeSidebar } from "../reducers/sidebar";
import { uploadImage } from "../utils";
import createNewEditor from "../utils/createNewEditor";
import { saveNote, deleteNote } from "../services/api";
import { removeNote } from "../reducers/notebook";
import DefaultCover from "../assets/default_cover.png";
import "./editor.css";

const Editor = () => {
  const [editor, setEditor] = useState(null);

  const dispatch = useDispatch();
  const { data: note } = useSelector((state) => state.note);
  const { optionsModal } = useSelector((state) => state.modal);
  
  const deleteNoteHandler = () => {
    deleteNote(note.id).then(() => {
      dispatch(closeOptionsModal());
      dispatch(removeNote(note.id))
      dispatch(clearNote());
    });
  };

  const addCoverHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const res = await uploadImage(file);
      const payload = {
        ...note,
        cover: res.file.url,
      }
      saveNote({ id: note.id, payload }).then(() => {
        dispatch(getNote(note.id));
      });
    }
  };

  const saveNoteHandler = async () => {
    const data = await editor.save();

    const title = data.blocks[0];

    if (title.type !== "header" || !note.id) {
      console.log("Note cannot be saved without title or note id");
      return;
    }

    const description = data.blocks.find((block) => block.type === "paragraph");

    const payload = {
      ...note,
      title: title.data.text,
      description: description?.data?.text ? description.data.text : "",
      data: data ? JSON.stringify(data) : "",
    };

    saveNote({ id: note.id, payload }).then(() => {
      dispatch(getNote(note.id));
    });
  };

  useEffect(() => {
    if (editor && editor.isReady) {
      editor.isReady.then(() => editor.destroy());
    }
    
    if (note.data) {
      setEditor(createNewEditor(JSON.parse(note.data)));
    } 
  }, [note.data]);

  return (
    <div className="editor">
      <div className="editor-header">
        <HamburgerIcon onClick={() => dispatch(openSidebar())} />
        <h3 onClick={() => dispatch(closeSidebar())}>Remember</h3>
      </div>

      <div className="input-cover">
        <label htmlFor="add-cover">
          <img
            className="note-cover"
            src={note.cover ? note.cover : DefaultCover}
            alt="cover"
          />
        </label>
        {note.id && (
          <input id="add-cover" type="file" onChange={addCoverHandler} />
        )}
      </div>

      {note.id && (
        <div className="save-options">
          <button className="app-btn" onClick={saveNoteHandler}>
            Save
          </button>

          <OptionsIcon onClick={() => dispatch(openOptionsModal())} />
        </div>
      )}

      {optionsModal && (
        <Modal>
          <Options deleteNoteHandler={deleteNoteHandler} />
        </Modal>
      )}

      <div id="editorjs" style={{ display: !note.id ? "none" : "" }}></div>
    </div>
  );
};

export default Editor;
