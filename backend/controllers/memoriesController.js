const multer = require("multer");
const memoriesModel = require("../models/memoriesModel");
const timelinesModel = require("../models/timelinesModel");
const authModel = require("../models/authModel");
const profileController = require("./profileController");

// Set storage for uploaded files
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage }).single("picture"); // 'picture' should match the name attribute in your HTML form

async function createMemory(req, res) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading");
      }

      const { buffer: pictureBuffer, originalname } = req.file;

      const picture = {
        data: pictureBuffer.toString("base64"),
        contentType: originalname.split(".").pop(),
      };

      const { description } = req.body;
      const timelineId = req.body.timelineId;

      await memoriesModel.createMemory(timelineId, picture.data, description);

      res.status(200).redirect(`/timeline/${timelineId}`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function editMemory(req, res) {
  try {
    const { description, memoryId } = req.body;

    await memoriesModel.editMemory(description, memoryId);
    res.status(200).redirect(`/memory/${memoryId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteMemory(req, res) {
  try {
    const { memoryId, timelineId } = req.body;

    await memoriesModel.deleteMemory(memoryId);
    res.status(200).redirect(`/timeline/${timelineId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getMemoryById(req, res) {
  const { memoryId } = req.params;

  try {
    const memory = await memoriesModel.getMemoryById(memoryId);
    const timelineId = memory[0][0].timeline_id;
    const timelineStyles = await timelinesModel.getTimelineStyleData(
      timelineId
    );

    const userData = await authModel.getUserById(timelineStyles[0][0].user_id);

    const isOwnProfile = await profileController.checkIsOwnProfile(
      req.cookies.jwt,
      timelineStyles[0][0].user_id
    );

    res.render("memory", { memory, timelineStyles, userData, isOwnProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createMemory,
  editMemory,
  deleteMemory,
  getMemoryById,
};
