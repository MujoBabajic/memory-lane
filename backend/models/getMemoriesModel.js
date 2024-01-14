const db = require("./dbConnection");

async function getMemoriesForTimeline(timelineId) {
  try {
    const timelineData = await db.execute(
      `SELECT * FROM memories 
      WHERE timeline_id = ?
      ORDER BY created_at DESC`,
      [timelineId]
    );

    return timelineData;
  } catch (err) {
    console.log(err);
  }
}

async function getTimelineStyleData(timelineId) {
  try {
    const timelineStyleData = await db.execute(
      `SELECT * FROM timelines 
      WHERE timeline_id = ?`,
      [timelineId]
    );
    return timelineStyleData;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoriesForTimeline, getTimelineStyleData };
