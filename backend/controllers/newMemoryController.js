const newMemoryModel = require("../models/newMemoryModel");
const multer = require("multer");

// Set storage for uploaded files
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage }).single("picture"); // 'picture' should match the name attribute in your HTML form

async function createNewMemory(req, res) {
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

      await newMemoryModel.createMemory(timelineId, picture.data, description);
      res.status(200).redirect(`/timeline/${timelineId}`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createNewMemory,
};
