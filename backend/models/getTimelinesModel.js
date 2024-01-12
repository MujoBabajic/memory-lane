const db = require("./dbConnection");

async function getTimelinesForUser(userId) {
  try {
    const timelinesData = await db.execute(
      `SELECT * FROM timelines where user_id = ?`,
      [userId]
    );
    return timelinesData;
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(userId) {
  try {
    const [data] = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [
      userId,
    ]);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getTimelineVisitsCount(timelineId) {
  try {
    const visitsCount = await db.execute(
      `SELECT COUNT(*) AS visitCount FROM timeline_visits
    WHERE timeline_id = ?`,
      [timelineId]
    );

    return visitsCount;
  } catch (err) {
    console.log(err);
  }
}

async function registerTimelineVisit(timelineId, visitorId) {
  try {
    await db.execute(
      `INSERT INTO timeline_visits (timeline_id, visitor_id)
    VALUES (?, ?)`,
      [timelineId, visitorId]
    );
  } catch (err) {
    console.log(er);
  }
}

module.exports = {
  getTimelinesForUser,
  getUserById,
  registerTimelineVisit,
  getTimelineVisitsCount,
};
