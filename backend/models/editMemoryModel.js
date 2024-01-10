const db = require("../models/dbConnection");

async function updateMemory(description, memoryId) {
  try {
    await db.execute(
      `UPDATE memories SET memory_description = ? where memory_id = ?`,
      [description, memoryId]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { updateMemory };
