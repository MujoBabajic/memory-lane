const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models/dbConnection");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (!data[0].length) {
      res.status(400).send("User not found");
    } else {
      if (await bcrypt.compare(password, data[0][0].password_hash)) {
        res.status(200).send("Login successful");
      } else {
        res.status(400).send(`Incorrect password`);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
