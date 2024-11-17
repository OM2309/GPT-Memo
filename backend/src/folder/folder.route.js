const express = require("express");
const router = express.Router();
const { createFolder } = require("./folder.controllers");

router.post("/", createFolder);

module.exports = router;
