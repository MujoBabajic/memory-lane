const db = require("../models/dbConnection");

async function updateTimeline(title, isPrivate, textFont, bgColor, timelineId) {
  try {
    await db.execute(
      `UPDATE timelines SET title = ?, is_private = ?, text_font = ?, bg_color = ? where timeline_id = ?`,
      [title, isPrivate, textFont, bgColor, timelineId]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { updateTimeline };
