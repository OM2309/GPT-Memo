const mongoose = require("mongoose");
const slugify = require("slugify");

const folderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: [3, "Folder name must be at least 3 characters long"],
    maxlength: [15, "Folder name cannot be longer than 15 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

folderSchema.pre("save", function (next) {
  if (this.folderName) {
    this.slug = slugify(this.folderName, { lower: true, strict: true });
  }
  next();
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
