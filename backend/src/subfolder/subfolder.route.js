const express = require("express");
const router = express.Router();
const {
  createSubfolder,
  getSubFolderByFolder,
  deleteSubfolder,
  updateSubfolder,
} = require("./subfolder.controllers");

router.get("/get-subfolders-by-folder/:slug", getSubFolderByFolder);
router.post("/create-sub-folder", createSubfolder);
router.post("/update-subfolder/:subfolderId", updateSubfolder);
router.post("/delete-subfolder/:subfolderId", deleteSubfolder);

module.exports = router;
