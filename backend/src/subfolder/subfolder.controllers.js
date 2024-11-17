const sendResponse = require("../../utils/sendResponse");
const SubfolderModel = require("./subfolder.model");
const FolderModel = require("../folder/folder.model");

exports.createSubfolder = async (req, res) => {
  try {
    const { subfolderName, folderId } = req.body;

    if (!subfolderName || !folderId) {
      return sendResponse(
        res,
        400,
        "Subfolder name and folder ID are required."
      );
    }

    const existingSubfolder = await SubfolderModel.findOne({
      subfolderName,
      folder: folderId,
    });

    if (existingSubfolder) {
      return sendResponse(
        res,
        400,
        "Subfolder name already exists in this folder."
      );
    }

    const newSubfolder = new SubfolderModel({
      subfolderName,
      folder: folderId,
    });

    await newSubfolder.save();

    return sendResponse(
      res,
      201,
      "Subfolder created successfully.",
      newSubfolder
    );
  } catch (err) {
    console.log(err);

    return sendResponse(
      res,
      500,
      "An error occurred while creating the subfolder.",
      err.message
    );
  }
};

exports.getSubFolderByFolder = async (req, res) => {
  try {
    const { slug } = req.params;

    const folder = await FolderModel.findOne({ slug: slug });

    if (!folder) {
      return sendResponse(res, 404, "Folder not found.");
    }

    const subfolders = await SubfolderModel.find({ folderId: folder._id });

    return sendResponse(
      res,
      200,
      "Subfolders retrieved successfully",
      subfolders
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while retrieving the subfolders.",
      error.message
    );
  }
};

exports.updateSubfolder = async (req, res) => {
  try {
    const subfolderId = req.params.subfolderId;
    const { subfolderName } = req.body;

    if (!subfolderName) {
      return sendResponse(res, 400, "Subfolder name is required.");
    }

    const existingSubfolder = await SubfolderModel.findOne({ subfolderName });

    if (existingSubfolder && existingSubfolder._id.toString() !== subfolderId) {
      return sendResponse(res, 400, "Subfolder name already exists.");
    }

    const updatedSubfolder = await SubfolderModel.findByIdAndUpdate(
      subfolderId,
      { subfolderName },
      { new: true }
    );

    if (!updatedSubfolder) {
      return sendResponse(res, 404, "Subfolder not found.");
    }

    return sendResponse(
      res,
      200,
      "Subfolder updated successfully.",
      updatedSubfolder
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while updating the subfolder.",
      error.message
    );
  }
};

exports.deleteSubfolder = async (req, res) => {
  try {
    const subfolderId = req.params.subfolderId;

    const deleteSubfolder = await SubfolderModel.findByIdAndDelete(subfolderId);

    if (!deleteSubfolder) {
      return sendResponse(res, 404, "Subfolder not found.");
    }

    return sendResponse(
      res,
      200,
      "Subfolder deleted successfully.",
      deleteSubfolder
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      "An error occurred while deleting the subfolder.",
      error.message
    );
  }
};
