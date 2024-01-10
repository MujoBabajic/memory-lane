const getMemoriesModel = require("../models/getMemoriesModel");
const timelineModel = require("../models/getTimelinesModel");

const profileController = require("../controllers/profileController");

async function getMemories(req, res) {
  const { timelineId } = req.params;

  try {
    const memories = await getMemoriesModel.getMemoriesForTimeline(timelineId);
    const timelineStyles = await getMemoriesModel.getTimelineStyleData(
      timelineId
    );
    const userData = await timelineModel.getUserById(
      timelineStyles[0][0].user_id
    );
    const isOwnProfile = profileController.checkIsOwnProfile(
      req.cookies.jwt,
      userData[0].user_id
    );

    res.render("timeline", {
      timelineId,
      memories,
      timelineStyles,
      userData,
      isOwnProfile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getMemories };
