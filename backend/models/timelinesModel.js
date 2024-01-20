const db = require("./dbConnection");
const authModel = require("./authModel");

async function createTimeline(userData) {
  try {
    const { title, isPrivate, email } = userData;
    const userDataFromDb = await authModel.getUserByEmail(email);
    const userID = userDataFromDb[0].user_id;
    const isPrivateBoolean =
      isPrivate.toLowerCase() === "false" ? false : Boolean(isPrivate);

    await db.execute(
      `INSERT INTO timelines (user_id, title, is_private) 
      VALUES (?, ?, ?)`,
      [userID, title, isPrivateBoolean]
    );
  } catch (err) {
    console.log(err);
  }
}

async function editTimeline(title, isPrivate, textFont, bgColor, timelineId) {
  try {
    const updateFields = [];
    const updateValues = [];

    if (title !== "") {
      updateFields.push("title = ?");
      updateValues.push(title);
    }

    if (isPrivate !== "") {
      updateFields.push("is_private = ?");
      updateValues.push(isPrivate);
    }

    if (textFont !== "") {
      updateFields.push("text_font = ?");
      updateValues.push(textFont);
    }

    if (bgColor !== "") {
      updateFields.push("bg_color = ?");
      updateValues.push(bgColor);
    }

    const query = `UPDATE timelines SET ${updateFields.join(
      ", "
    )} WHERE timeline_id = ?`;

    updateValues.push(timelineId);

    await db.execute(query, updateValues);
  } catch (err) {
    console.log(err);
  }
}

async function deleteTimeline(timelineId) {
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

async function getTimelinesForUser(userId) {
  try {
    const timelinesData = await db.execute(
      `SELECT * FROM timelines 
      WHERE user_id = ?`,
      [userId]
    );
    return timelinesData;
  } catch (err) {
    console.log(err);
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

async function getMemoriesForTimeline(timelineId) {
  try {
    const timelineData = await db.execute(
      `SELECT * FROM memories 
      WHERE timeline_id = ?
      ORDER BY memory_created_at DESC`,
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

module.exports = {
  createTimeline,
  editTimeline,
  deleteTimeline,
  getTimelinesForUser,
  getTimelineVisitsCount,
  registerTimelineVisit,
  getMemoriesForTimeline,
  getTimelineStyleData,
};
