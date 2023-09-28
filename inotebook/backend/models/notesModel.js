const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notesSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", notesSchema);
