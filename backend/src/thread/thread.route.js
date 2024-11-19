const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreadsBySubfolder,
  deleteThread,
  updateThread,
} = require("./thread.controllers");

router.get("/get-threads-by-subfolder/:slug", getThreadsBySubfolder);
router.post("/create-thread", createThread);
router.post("/update-thread/:threadId", updateThread);
router.post("/delete-thread/:threadId", deleteThread);

module.exports = router;
