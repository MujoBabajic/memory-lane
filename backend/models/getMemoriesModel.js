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

async function getTimelineStyleData(timelineId) {
  try {
    const timelineStyleData = await db.execute(
      `SELECT * FROM timelines where timeline_id = ?`,
      [timelineId]
    );
    return timelineStyleData;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoriesForTimeline, getTimelineStyleData };
