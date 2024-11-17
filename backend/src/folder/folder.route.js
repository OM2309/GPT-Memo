const express = require("express");
const router = express.Router();
const {
  createFolder,
  getAllFolder,
  deleteFolder,
  updateFolder,
} = require("./folder.controllers");

router.get("/get-all-folder", getAllFolder);
router.post("/create-folder", createFolder);
router.post("/update-folder/:folderId", updateFolder);
router.post("/delete-folder/:folderId", deleteFolder);

module.exports = router;
