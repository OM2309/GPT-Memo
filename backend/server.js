const express = require("express");
const dotenv = require("dotenv");
const folerRoutes = require("./src/folder/folder.route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api/folder", folerRoutes);

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("server listening on", PORT);
});
