const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./database/database");
const folderRoutes = require("./src/folder/folder.route");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/folder", folderRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server listening on port", PORT);
});
