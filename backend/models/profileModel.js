const db = require("../models/dbConnection");

async function changeAvatar(picture, userId) {
  try {
    await db.execute(
      `UPDATE users
      SET profile_picture = ? 
      WHERE user_id = ?
      `,
      [picture, userId]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { changeAvatar };
