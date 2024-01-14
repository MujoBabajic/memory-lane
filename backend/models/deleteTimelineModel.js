const db = require("../models/dbConnection");

async function deleteTimelineFromDb(timelineId) {
  try {
    await db.execute(
      `DELETE FROM timelines 
    WHERE timeline_id = ?`,
      [timelineId]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { deleteTimelineFromDb };
