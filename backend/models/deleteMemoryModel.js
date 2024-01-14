const db = require("../models/dbConnection");

async function deleteMemoryFromDb(memoryId) {
  try {
    await db.execute(
      `DELETE FROM memories 
    WHERE memory_id = ?`,
      [memoryId]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { deleteMemoryFromDb };
