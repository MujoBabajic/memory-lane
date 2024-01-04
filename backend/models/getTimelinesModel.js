const db = require("./dbConnection");
const loginModel = require("./loginModel");

async function getTimelinesForUser(email) {
  try {
    const userDataFromDb = await loginModel.getUserByEmail(email);
    const timelinesData = await db.execute(
      `SELECT * FROM timelines where user_id = ?`,
      [userDataFromDb[0].user_id]
    );
    return timelinesData;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getTimelinesForUser };
