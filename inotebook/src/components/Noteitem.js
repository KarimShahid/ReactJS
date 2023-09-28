import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = ({ note, updateNote, showAlert }) => {
  //   const {note, updateNote} = props
  //{note, updateNote} is props.note, props.udpateNote
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            {/* Delete Button */}
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id); //note._id is called in Notes.js. Its passed via context api
                showAlert("Deleted Successfully", "success");
              }}
            ></i>
            {/* Edit Button */}
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
                // showAlert("Updated Successfully!", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
