const mongoose = require("mongoose");
const slugify = require("slugify");

const subfolderSchema = new mongoose.Schema({
  subfolderName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Subfolder name must be at least 3 characters long"],
    maxlength: [15, "Subfolder name cannot be longer than 15 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

subfolderSchema.pre("save", function (next) {
  if (this.subfolderName) {
    this.slug = slugify(this.subfolderName, { lower: true, strict: true });
  }
  next();
});

const Subfolder = mongoose.model("Subfolder", subfolderSchema);

module.exports = Subfolder;
