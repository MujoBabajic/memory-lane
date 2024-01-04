const getMemoriesModel = require("../models/getMemoriesModel");

async function getMemories(req, res) {
  const { timelineId } = req.params;

  try {
    const memories = await getMemoriesModel.getMemoriesForTimeline(timelineId);
    res.render("timeline", { timelineId, memories });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getMemories };
