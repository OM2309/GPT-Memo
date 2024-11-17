const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
