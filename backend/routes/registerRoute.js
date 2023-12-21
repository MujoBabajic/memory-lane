const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models/dbConnection");

router.post("/", async (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailCheck = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (emailCheck[0].length) {
      res.send("Email already in use");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.execute(
        `INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dob, gender, email, hashedPassword]
      );
      res.status(200).send("New user registered");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
