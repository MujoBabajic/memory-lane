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

module.exports = { getTimelinesForUser, getUserById };
