const db = require("./dbConnection");

async function checkIfEmailExists(email) {
  try {
    const [data] = await db.execute(
      `SELECT * FROM users 
    WHERE email = ?`,
      [email]
    );
    return data.length > 0;
  } catch (err) {
    throw err;
  }
}

async function createUser(userData) {
  try {
    const { firstName, lastName, dob, gender, email, hashedPassword } =
      userData;

    await db.execute(
      `INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password_hash) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, dob, gender, email, hashedPassword]
    );
  } catch (err) {
    throw err;
  }
}

module.exports = {
  checkIfEmailExists,
  createUser,
};
