const db = require("../models/dbConnection");

async function updateTimeline(title, isPrivate, textFont, bgColor, timelineId) {
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

module.exports = { updateTimeline };
