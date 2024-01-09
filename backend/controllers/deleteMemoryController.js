const deleteMemoryModel = require("../models/deleteMemoryModel");

async function deleteMemory(req, res) {
  try {
    const { memoryId, timelineId } = req.body;

    await deleteMemoryModel.deleteMemoryFromDb(memoryId);
    res.status(200).redirect(`/timeline/${timelineId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { deleteMemory };
