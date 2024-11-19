const mongoose = require("mongoose");
const slugify = require("slugify");

const threadSchema = new mongoose.Schema({
  threadTitle: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Thread title must be at least 3 characters long"],
    maxlength: [50, "Thread title cannot be longer than 50 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, "Content must be at least 10 characters long"],
  },
  subfolderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subfolder",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
});

threadSchema.pre("save", function (next) {
  if (this.threadTitle) {
    this.slug = slugify(this.threadTitle, { lower: true, strict: true });
  }
  next();
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
