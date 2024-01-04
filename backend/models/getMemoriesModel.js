const db = require("./dbConnection");

async function getMemoriesForTimeline(timelineId) {
  try {
    const timelineData = await db.execute(
      `SELECT * FROM memories where timeline_id = ?`,
      [timelineId]
    );

    return timelineData;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoriesForTimeline };
