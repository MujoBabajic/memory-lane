const db = require("./dbConnection");

async function getMemoryById(memoryId) {
  try {
    const memory = await db.query(
      "SELECT * FROM memories WHERE memory_id = ?",
      [memoryId]
    );
    return memory;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoryById };
