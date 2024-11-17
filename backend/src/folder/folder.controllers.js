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

exports.getAllFolder = async (req, res) => {
  try {
    const getAllFolder = await FolderModel.find();
    return sendResponse(
      res,
      200,
      "Folders retrieved successfully",
      getAllFolder
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while retrieving the folders.",
      error.message
    );
  }
};

exports.updateFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const { folderName } = req.body;

    if (!folderName) {
      return sendResponse(res, 400, "Folder name is required.");
    }

    const existingFolder = await FolderModel.findOne({ folderName });

    if (existingFolder && existingFolder._id.toString() !== folderId) {
      return sendResponse(res, 400, "Folder name already exists.");
    }

    const updatedFolder = await FolderModel.findByIdAndUpdate(
      folderId,
      { folderName },
      { new: true }
    );

    if (!updatedFolder) {
      return sendResponse(res, 404, "Folder not found.");
    }

    return sendResponse(
      res,
      200,
      "Folder updated successfully.",
      updatedFolder
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while updating the folder.",
      error.message
    );
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;

    const deleteFolder = await FolderModel.findByIdAndDelete(folderId);

    if (!deleteFolder) {
      return sendResponse(res, 404, "Folder not found.");
    }

    return sendResponse(res, 200, "Folder deleted successfully.", deleteFolder);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while deleting the folder.",
      error.message
    );
  }
};
