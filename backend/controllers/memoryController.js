const memoryModel = require("../models/memoryModel");

async function getMemoryById(req, res) {
  const { memoryId } = req.params;

  try {
    const memory = await memoryModel.getMemoryById(memoryId);

    res.render("memory", { memory });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getMemoryById };
