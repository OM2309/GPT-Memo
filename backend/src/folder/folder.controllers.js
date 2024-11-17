const sendResponse = require("../../utils/sendResponse");
const FolderModel = require("./folder.model");

exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;

    if (!folderName) {
      return sendResponse(res, 400, "Folder name is required.");
    }

    const existingFolder = await FolderModel.findOne({ folderName });

    if (existingFolder) {
      return sendResponse(res, 400, "Folder name already exists.");
    }

    const newFolder = new FolderModel({ folderName });

    await newFolder.save();

    return sendResponse(res, 201, "Folder created successfully.", newFolder);
  } catch (err) {
    console.log(err);

    return sendResponse(
      res,
      500,
      "An error occurred while creating the folder.",
      err.message
    );
  }
};
