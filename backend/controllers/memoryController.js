const memoryModel = require("../models/memoryModel");
const getMemoriesModel = require("../models/getMemoriesModel");

async function getMemoryById(req, res) {
  const { memoryId } = req.params;

  try {
    const memory = await memoryModel.getMemoryById(memoryId);
    const timelineId = memory[0][0].timeline_id;
    const timelineStyles = await getMemoriesModel.getTimelineStyleData(
      timelineId
    );
    res.render("memory", { memory, timelineStyles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getMemoryById };
