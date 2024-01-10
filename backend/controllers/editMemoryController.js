const editMemoryModel = require("../models/editMemoryModel");

async function editMemory(req, res) {
  try {
    const { description, memoryId } = req.body;

    await editMemoryModel.updateMemory(description, memoryId);
    res.status(200).redirect(`/memory/${memoryId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { editMemory };
