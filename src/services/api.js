import http from "./http";
import authHeader from "./header";

export const saveNote = async ({ id, payload}) => {
    http.put(`notes/${id}/`, payload, {headers: authHeader()})
};
  
export const addNote = async (payload) => {
    const res = await http.post(`notes/`, payload, { headers: authHeader() })
    return res.data
}
    
export const deleteNote = async (noteId) => {
    http.delete(`notes/${noteId}/`, {headers: authHeader()})
};
  
export const deleteNotebook = async (notebookId) => {
    http.delete(`notebooks/${notebookId}`, {headers: authHeader()})
};
  
export const addNotebook = async (name) => {
    const res = await http.post(`notebooks/`, { name: name }, { headers: authHeader() })
    return res.data
}
    
  