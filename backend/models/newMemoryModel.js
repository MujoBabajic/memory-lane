const db = require("../models/dbConnection");

async function createMemory(timelineId, picture, description) {
  try {
    await db.execute(
      `INSERT INTO memories (timeline_id, picture, memory_description) 
      VALUES (?, ?, ?)`,
      [timelineId, picture, description]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createMemory };
