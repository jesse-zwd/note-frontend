import { combineReducers } from "@reduxjs/toolkit";
import notebooks from "./notebooks";
import note from "./note";
import theme from "./theme";
import modal from "./modal";
import sidebar from "./sidebar";
import user from "./user";
import notebook from "./notebook";

export default combineReducers({
  notebooks,
  note,
  theme,
  modal,
  sidebar,
  user,
  notebook,
});
