import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:4000";
  // {children} is props.children
  const notesInitial = [];
  const [Notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getNotes = async () => {
    // API Calls
    const response = await fetch(`${host}/api/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    console.log("Getting all notes");
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new Note");
    // API Calls
    const response = await fetch(`${host}/api/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(Notes.concat(note));
    console.log("Returning json after adding note" + note);
    console.log(Notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = response.json();
    console.log(json);
    console.log("Deleeting note with id: " + id);
    const newNotes = Notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit notes
  const editNote = async (id, title, description, tag) => {
    // API Calls
    const response = await fetch(`${host}/api/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(Notes));
    console.log(newNotes);
    // Logic to edit in client
    console.log("Editing the note with id: " + id);
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
    // We can use getNote() instead from line 86 to 99
    // getNotes();
  };

  return (
    <NoteContext.Provider
      value={{ Notes, getNotes, addNote, editNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
