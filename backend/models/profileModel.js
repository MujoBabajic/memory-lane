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

async function editProfile(firstName, lastName, dob, gender, password, userId) {
  try {
    const updateFields = [];
    const updateValues = [];

    if (firstName !== "") {
      updateFields.push("first_name = ?");
      updateValues.push(firstName);
    }

    if (lastName !== "") {
      updateFields.push("last_name = ?");
      updateValues.push(lastName);
    }

    if (dob !== "") {
      updateFields.push("date_of_birth = ?");
      updateValues.push(dob);
    }

    if (gender !== "") {
      updateFields.push("gender = ?");
      updateValues.push(gender);
    }

    if (password !== "") {
      updateFields.push("password_hash = ?");
      updateValues.push(password);
    }

    updateValues.push(userId);

    const query = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE user_id = ?`;

    await db.execute(query, updateValues);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { changeAvatar, getUsersForSearch, editProfile };
