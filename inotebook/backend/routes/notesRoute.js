const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { validationResult, body } = require("express-validator");

const Note = require("../models/notesModel");

// ROUTE 1
// Get all the notes using: GET "/api/fetchallnotes" login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2
// Add notes using: POST "/api/addnote" login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title should be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description should be more than 5 letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // obj destructuring
      const { title, description, tag } = req.body;
      // if there are error, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3
// UPdate existing notes using: PUT "/api/updatenote/:id" login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create new note obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated, then update it
    // params = :id --> particular notes id
    let note = await Note.findById(req.params.id);

    // if note doesnt exists, cannot update
    if (!note) {
      return res.status(404).send("Not found!");
    }
    // allow user to update only if it owns the note
    // note.user = user id of the owner of the notes
    // req.user.id = user id of the logged in person
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Haha! Not Allowed!");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4
// Delete existing notes using: DELETE "/api/deletenote/:id" login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // finding the particular note
    let note = await Note.findById(req.params.id);

    // if not availbale, cannot delete
    if (!note) {
      return res.status(404).send("Not found!");
    }

    // allow user to delete only if it owns the note
    // note.user = user id of the owner of the notes
    // req.user.id = user id of the logged in person
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Haha! Not Allowed!");
    }
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Success, Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
