const db = require("./dbConnection");
const loginModel = require("./loginModel");

async function createTimeline(userData) {
  try {
    const { title, isPrivate, email } = userData;
    const userDataFromDb = await loginModel.getUserByEmail(email);
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

module.exports = { createTimeline };
