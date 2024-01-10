const memoryModel = require("../models/memoryModel");
const getMemoriesModel = require("../models/getMemoriesModel");
const timelineModel = require("../models/getTimelinesModel");

const profileController = require("../controllers/profileController");

async function getMemoryById(req, res) {
  const { memoryId } = req.params;

  try {
    const memory = await memoryModel.getMemoryById(memoryId);
    const timelineId = memory[0][0].timeline_id;
    const timelineStyles = await getMemoriesModel.getTimelineStyleData(
      timelineId
    );

    const userData = await timelineModel.getUserById(
      timelineStyles[0][0].user_id
    );

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

module.exports = { getMemoryById };
