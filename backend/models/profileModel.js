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

async function getUsersForSearch(name) {
  try {
    const data = await db.execute(
      `SELECT * FROM users
      WHERE CONCAT(first_name, ' ', last_name) 
      LIKE '${name}%'
      OR CONCAT(first_name, ' ', last_name) LIKE '%${name}%';`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { changeAvatar, getUsersForSearch };
