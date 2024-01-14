const db = require("./dbConnection");

async function getUserByEmail(email) {
  try {
    const [data] = await db.execute(
      `SELECT * FROM users 
    WHERE email = ?`,
      [email]
    );
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUserByEmail,
};
