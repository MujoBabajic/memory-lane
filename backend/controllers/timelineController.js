const getMemoriesModel = require("../models/getMemoriesModel");

async function getMemories(req, res) {
  const { timelineId } = req.params;

  try {
    const memories = await getMemoriesModel.getMemoriesForTimeline(timelineId);
    const timelineStyles = await getMemoriesModel.getTimelineStyleData(
      timelineId
    );
    res.render("timeline", { timelineId, memories, timelineStyles });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getMemories };
