import React from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Editor from "./components/Editor";

const Router = () => (
  <>
    <Sidebar />
    <Notes />
    <Editor />
  </>
);

export default Router;
