const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./database/database");
const folderRoutes = require("./src/folder/folder.route");
const subfolderRoutes = require("./src/subfolder/subfolder.route");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/folder", folderRoutes);
app.use("/api/sub-folder", subfolderRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server listening on port", PORT);
});
